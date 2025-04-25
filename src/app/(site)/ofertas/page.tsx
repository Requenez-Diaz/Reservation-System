import { getBedrooms } from '@/app/actions/getPromotions/getBedroooms';
import { ClientRoomsWithPromotions } from '@/components/offers/client-rooms-with-promotions';
// import { getBedrooms } from '@/app/actions/getBedrooms/getBedrooms';

export default async function RoomsPage() {
  // Obtener habitaciones desde la base de datos
  const bedroomsResult = await getBedrooms();

  // Si hay un error, mostrar un mensaje
  if (!bedroomsResult.success) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">Nuestras Habitaciones</h1>
        <div className="text-red-500">
          Error al cargar las habitaciones: {bedroomsResult.error}
        </div>
      </div>
    );
  }

  // Si no hay habitaciones, mostrar un mensaje
  if (bedroomsResult.data.length === 0) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">Nuestras Habitaciones</h1>
        <div>No hay habitaciones disponibles en este momento.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Nuestras Habitaciones</h1>
      <p className="text-muted-foreground mb-8">
        Descubre nuestras cómodas habitaciones diseñadas para ofrecerte una
        experiencia inolvidable. Aprovecha nuestras promociones especiales.
      </p>

      <ClientRoomsWithPromotions rooms={bedroomsResult.data} />
    </div>
  );
}
