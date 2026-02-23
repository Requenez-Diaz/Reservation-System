'use client';

import * as React from 'react';
import {
  MessageCircleMore,
  Users,
  CheckCircle2,
  XCircle,
  ArrowRight,
  CalendarDays
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllBedrooms } from '@/app/actions/get-bedrooms';
import { useToast } from '@/components/ui/use-toast';
import { BookingModal } from './booking-modal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { generateWhatsappUrl } from '@/components/bedrooms/messages/message-encode';

interface BedroomImage {
  id: string;
  image: string;
}

interface RawBedroom {
  id: string | number;
  description: string | null;
  capacity: number;
  numberBedroom: number;
  status: boolean;
  lowSeasonPrice: number;
  highSeasonPrice: number;
  slug: string | null;
  image?: string;
  TypeBedrooms?: { nameType: string } | null;
  galleryImages?: Array<{ fileName: string; imageContent: string }> | null;
  ReservationDetails?: Array<{
    dateStart: Date | string;
    dateEnd: Date | string;
  }> | null;
  Seasons?: {
    id: number;
    nameSeason: string;
    dateStart: Date;
    dateEnd: Date;
  } | null;
}

interface Bedroom {
  id: string;
  name: string;
  description: string;
  capacity: number;
  numberBedroom: number;
  status: boolean;
  lowSeasonPrice: number;
  highSeasonPrice: number;
  slug: string;
  BedroomImages?: BedroomImage[];
  bookingsDetails?: Array<{
    dateStart: string;
    dateEnd?: string;
  }>;
  image?: string;
  Seasons?: {
    id: number;
    nameSeason: string;
    dateStart: Date;
    dateEnd: Date;
  } | null;
}

export default function HabitacionesPage() {
  const [bedrooms, setBedrooms] = React.useState<Bedroom[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedBedroom, setSelectedBedroom] = React.useState<Bedroom | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { toast } = useToast();
  const { data: session } = useSession();
  const router = useRouter();

  const DEFAULT_IMAGE = '/luxury-hotel-room.png';

  const getActivePrice = (bedroom: Bedroom) => {
    if (!bedroom.Seasons) {
      return bedroom.lowSeasonPrice;
    }

    const today = new Date();
    const start = new Date(bedroom.Seasons.dateStart);
    const end = new Date(bedroom.Seasons.dateEnd);

    if (today >= start && today <= end) {
      return bedroom.highSeasonPrice;
    }

    return bedroom.lowSeasonPrice;
  };

  React.useEffect(() => {
    async function fetchBedrooms() {
      try {
        const data = (await getAllBedrooms()) as RawBedroom[];
        const mappedBedrooms: Bedroom[] = (data || []).map((b) => ({
          id: String(b.id),
          name: b.TypeBedrooms?.nameType || 'Habitación Confort',
          description: b.description || 'Sin descripción disponible',
          capacity: b.capacity,
          numberBedroom: b.numberBedroom,
          status: b.status,
          lowSeasonPrice: b.lowSeasonPrice,
          highSeasonPrice: b.highSeasonPrice,
          slug: b.slug || '',
          image: b.image,
          BedroomImages:
            b.galleryImages?.map((img) => ({
              id: String(img.fileName || Math.random()),
              image: img.imageContent || ''
            })) || [],
          bookingsDetails:
            b.ReservationDetails?.map((r) => ({
              dateStart: new Date(r.dateStart).toISOString(),
              dateEnd: new Date(r.dateEnd).toISOString()
            })) || [],
          Seasons: b.Seasons
        }));
        setBedrooms(mappedBedrooms);
      } catch (error) {
        console.error('Error cargando habitaciones:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBedrooms();
  }, []);

  const handleReserveClick = (bedroom: Bedroom) => {
    if (!session?.user) {
      localStorage.setItem('pending_booking', JSON.stringify(bedroom));
      toast({
        title: 'Acceso restringido',
        description: 'Debes iniciar sesión para realizar una reserva.'
      });
      router.push('/login');
      return;
    }
    setSelectedBedroom(bedroom);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-100 border-t-orange-600" />
          <p className="text-slate-400 font-medium italic">
            Sincronizando disponibilidad...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/40 pb-20 font-sans">
      {/* HEADER CLARO REDISEÑADO */}
      <div className="relative bg-white border-b border-slate-200 py-20 mb-12 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-10">
          <div className="aspect-square h-64 rounded-full bg-orange-600" />
        </div>
        <div className="mx-auto max-w-7xl px-4 relative text-center">
          <Badge className="mb-4 bg-orange-100 text-orange-700 border-none px-4 py-1 font-bold">
            Reserva Tu Experiencia
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
            Nuestras <span className="text-orange-600">Habitaciones</span>
          </h1>
          <div className="h-1.5 w-24 bg-orange-500 rounded-full mx-auto mb-6" />
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Explora nuestra selección de habitaciones diseñadas para brindarte
            el máximo confort y una experiencia inolvidable.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {bedrooms.map((bedroom) => {
            const currentPrice = getActivePrice(bedroom);
            const isHighSeason =
              bedroom.Seasons && currentPrice === bedroom.highSeasonPrice;
            const imageUrl =
              bedroom.BedroomImages?.[0]?.image ||
              bedroom.image ||
              DEFAULT_IMAGE;

            return (
              <Card
                key={bedroom.id}
                className="group overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 bg-white flex flex-col"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={bedroom.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="bg-white/95 backdrop-blur-sm text-slate-900 border-none font-bold shadow-sm">
                      Unidad #{bedroom.numberBedroom}
                    </Badge>
                    <Badge
                      className={`${bedroom.status ? 'bg-emerald-500' : 'bg-red-500'} text-white border-none shadow-sm`}
                    >
                      {bedroom.status ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Disponible
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <XCircle className="h-3 w-3" /> Ocupada
                        </span>
                      )}
                    </Badge>
                  </div>

                  {isHighSeason && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-orange-600 text-white border-none flex items-center gap-1 shadow-lg animate-pulse">
                        <CalendarDays className="h-3 w-3" /> Temporada Alta
                      </Badge>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6">
                    <p className="text-white font-black text-3xl">
                      C$ {currentPrice.toLocaleString()}
                      <span className="text-sm font-normal text-slate-300">
                        {' '}
                        / noche
                      </span>
                    </p>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-2xl font-bold text-slate-800 tracking-tight">
                      {bedroom.name}
                    </CardTitle>
                    <div className="flex items-center gap-1.5 text-slate-500 font-bold bg-slate-100 px-2 py-1 rounded text-sm">
                      <Users className="h-4 w-4" /> {bedroom.capacity}
                    </div>
                  </div>
                  <p className="text-slate-500 line-clamp-2 h-10 mt-1 italic text-sm">
                    {bedroom.description}
                  </p>
                </CardHeader>

                <CardFooter className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50">
                  <Button
                    onClick={() => handleReserveClick(bedroom)}
                    variant={'save'}
                  >
                    Reservar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <a
                    href={generateWhatsappUrl(
                      bedroom.name,
                      bedroom.numberBedroom,
                      currentPrice
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-bold"
                    >
                      <MessageCircleMore className="mr-2 h-5 w-5" /> WhatsApp
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {selectedBedroom && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          bedroom={selectedBedroom}
        />
      )}
    </div>
  );
}
