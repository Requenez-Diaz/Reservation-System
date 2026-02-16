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
    Bedrooms: {
      id: number;
      description: string;
      typeBedroom: string;
      numberBedroom: number;
      image: string;
    };
  }>;
}

export default async function OffertsPage() {
  const result = await getPromotions();

  // 1. Manejo de estados vacíos o errores
  if (!result.success || !result.data || result.data.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold text-zinc-800">
          Ofertas por Habitación
        </h1>
        <p className="text-muted-foreground mt-4">
          No hay promociones disponibles en este momento. Revisa más tarde.
        </p>
      </div>
    );
  }

  const promotionsData = result.data as PromotionFromDB[];

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Encabezado de la página */}
      <div className="flex flex-col border-b pb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Ofertas Especiales
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Gestiona y visualiza los descuentos activos aplicados a habitaciones
          específicas.
        </p>
      </div>

      {/* Grid de Promociones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotionsData.map((promotion) => (
          <PromotionRoomCard
            key={promotion.id}
            promotion={{
              ...promotion,
              BedroomsPromotions: (promotion.BedroomsPromotions || []).map(
                (bp) => ({
                  bedroom: {
                    id: bp.Bedrooms?.id,
                    name: bp.Bedrooms?.description || 'Sin descripción',
                    type: bp.Bedrooms?.typeBedroom || 'N/A',
                    number: String(bp.Bedrooms?.numberBedroom || '0'),
                    typeBedroom: bp.Bedrooms?.typeBedroom || 'N/A',
                    image: bp.Bedrooms?.image || ''
                  }
                })
              )
            }}
          />
        ))}
      </div>
    </div>
  );
}
