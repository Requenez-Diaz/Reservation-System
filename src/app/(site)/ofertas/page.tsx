import { getPromotions } from '@/app/actions/getPromotions/getPromotions';
import { PromotionRoomCard } from '@/components/offers/components/rooms-card';

interface PromotionFromDB {
  id: number;
  codePromotions: string;
  porcentageDescuent: number;
  dateStart: string;
  dateEnd: string;
  description?: string;
  BedroomsPromotions: Array<{
    bedroom: {
      id: number;
      description: string;
      numberBedroom: number;
      image: string;
      TypeBedrooms?: { nameType: string } | null;
      galleryImages?: Array<{ imageContent: string }> | null;
    };
  }>;
}

export default async function OffertsPage() {
  const result = await getPromotions();

  if (!result.success || !result.data || result.data.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold text-zinc-800 dark:text-slate-100">
          Ofertas por Habitación
        </h1>
        <p className="text-muted-foreground mt-4">
          No hay promociones disponibles.
        </p>
      </div>
    );
  }

  const promotionsData = result.data as PromotionFromDB[];

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col border-b dark:border-slate-800 pb-6 text-center md:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-slate-100">
          Ofertas Especiales
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Descuentos activos en nuestras mejores unidades.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotionsData.map((promotion) => (
          <PromotionRoomCard
            key={promotion.id}
            promotion={{
              ...promotion,
              BedroomsPromotions: (promotion.BedroomsPromotions || []).map(
                (bp) => {
                  const b = bp.bedroom;
                  const finalImage =
                    b.galleryImages?.[0]?.imageContent || b.image || '';

                  return {
                    bedroom: {
                      id: b.id,
                      name: b.description || 'Sin descripción',
                      type: b.TypeBedrooms?.nameType || 'Habitación',
                      number: String(b.numberBedroom || '0'),
                      typeBedroom: b.TypeBedrooms?.nameType || 'Estándar',
                      image: finalImage
                    }
                  };
                }
              )
            }}
          />
        ))}
      </div>
    </div>
  );
}
