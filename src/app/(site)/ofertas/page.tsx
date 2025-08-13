import { getPromotions } from '@/app/actions/getPromotions/getPromotions';
import { PromotionRoomCard } from '@/components/offers/components/rooms-card';


export default async function OffertsPage() {
  const result = await getPromotions();

  console.log('Promotions fetched:', { result });
  if (!('success' in result) || !result.success || !result.data) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-red-500">Error al cargar las promociones.</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ofertas por Habitación</h1>
          <p className="text-muted-foreground">
            Gestiona promociones específicas por habitación
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {result.data.map((promotion) => (
          <PromotionRoomCard
            key={promotion.id}
            promotion={{
              ...promotion,
              dateStart:
                promotion.dateStart instanceof Date
                  ? promotion.dateStart.toISOString()
                  : promotion.dateStart,
              dateEnd:
                promotion.dateEnd instanceof Date
                  ? promotion.dateEnd.toISOString()
                  : promotion.dateEnd,
              BedroomsPromotions: promotion.BedroomsPromotions.map(
                (bp: any) => ({
                  bedroom: {
                    id: bp.Bedrooms.id,
                    name: bp.Bedrooms.description, // or another field if 'name' is different
                    type: bp.Bedrooms.typeBedroom, // or another field if 'type' is different
                    number: String(bp.Bedrooms.numberBedroom), // ensure string
                    typeBedroom: bp.Bedrooms.typeBedroom
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
