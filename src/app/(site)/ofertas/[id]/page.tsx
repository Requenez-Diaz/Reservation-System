import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Tag, Clock } from 'lucide-react';
import Link from 'next/link';
import { getPromotion } from '@/app/actions/getOfferts/get-offerts';
import { ReserveRoomDialog } from '@/components/offers/components/reserv-form-dialog';

interface PromotionPageProps {
  params: Promise<{ id: string }>;
}

export default async function PromotionPage(props: PromotionPageProps) {
  const params = await props.params;
  const promotionId = Number.parseInt(params.id);
  const result = await getPromotion(promotionId);

  if (!result.success || !result.data) {
    notFound();
  }

  const promotion = result.data;

  const bedroom = promotion.BedroomsPromotions[0]?.bedroom;

  if (!bedroom) {
    notFound();
  }

  // Cálculos de precio
  const originalPrice = bedroom.highSeasonPrice || 0;
  const discountAmount = (originalPrice * promotion.porcentageDescuent) / 100;
  const finalPrice = originalPrice - discountAmount;

  const now = new Date();
  const startDate = new Date(promotion.dateStart);
  const endDate = new Date(promotion.dateEnd);
  const isActive = now >= startDate && now <= endDate;

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto py-8 space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <Link href="/ofertas">
          <Button
            variant="ghost"
            className="hover:bg-zinc-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a ofertas
          </Button>
        </Link>
        <Badge
          className={
            isActive ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
          }
        >
          {isActive ? 'Oferta Disponible' : 'No Disponible'}
        </Badge>
      </div>

      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-3xl shadow-2xl">
        <Image
          src={bedroom.image || '/luxury-hotel-room.png'}
          alt={bedroom.typeBedroom || 'Habitación'}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <Badge className="bg-orange-600 text-white border-none">
                {bedroom.typeBedroom || 'Habitación'}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black text-white">
                Unidad #{bedroom.numberBedroom}
              </h1>
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin className="h-4 w-4" />
                <p className="text-lg italic">
                  {bedroom.description || 'Sin descripción'}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl text-zinc-900 min-w-[240px]">
              <p className="text-sm font-bold text-zinc-500 line-through">
                C${originalPrice.toLocaleString()}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-black text-orange-600">
                  C${finalPrice.toLocaleString()}
                </span>
                <Badge
                  variant="outline"
                  className="text-red-600 border-red-200 bg-red-50"
                >
                  -{promotion.porcentageDescuent}%
                </Badge>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Precio final por noche
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none bg-zinc-50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-orange-500" />
                Detalles de la Promoción
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-orange-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-black">
                      Periodo
                    </p>
                    <p className="text-sm font-medium">
                      {formatDate(promotion.dateStart)} -{' '}
                      {formatDate(promotion.dateEnd)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-orange-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-black">
                      Temporada
                    </p>
                    <p className="text-sm font-medium">
                      {promotion.Seasons?.nameSeason || 'Regular'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-orange-500 p-4 rounded-xl text-center">
                <p className="text-[10px] text-white uppercase font-bold mb-2">
                  Código de Canje
                </p>
                <span className="text-2xl font-mono font-bold tracking-widest text-white">
                  {promotion.codePromotions}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-2xl overflow-hidden">
            <div className="bg-orange-600 p-4 text-white text-center">
              <p className="text-sm font-bold">
                ¡Ahorras C${(originalPrice - finalPrice).toLocaleString()}!
              </p>
            </div>
            <CardHeader>
              <CardTitle>Reserva ahora</CardTitle>
              <CardDescription>
                Asegura tu estancia con este precio especial.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="pt-4 border-t flex justify-between items-end">
                <span className="font-bold text-slate-600">Total noche</span>
                <span className="text-3xl font-black text-orange-600">
                  C${finalPrice.toLocaleString()}
                </span>
              </div>

              <ReserveRoomDialog
                bedroom={{
                  id: bedroom.id,
                  name: bedroom.typeBedroom || 'Habitación',
                  type: bedroom.typeBedroom || '',
                  number: bedroom.numberBedroom?.toString() || '',
                  typeBedroom: bedroom.typeBedroom || ''
                }}
                pricePerNight={finalPrice}
                promotionDateEnd={promotion.dateEnd}
                promotionDateStart={promotion.dateStart}
                promotionId={promotion.id}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
