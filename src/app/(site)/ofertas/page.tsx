import { getBedrooms } from '@/app/actions/getPromotions/getBedroooms';
import { ClientRoomsWithPromotions } from '@/components/offers/client-rooms-with-promotions';

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

  // Transformar los datos de las habitaciones al formato esperado por el componente
  const roomsData = bedroomsResult.data.map((bedroom) => ({
    type: bedroom.type,
    description:
      bedroom.description || 'Habitación confortable con todas las comodidades',
    price:
      (bedroom as any).highSeasonPrice || (bedroom as any).lowSeasonPrice || 0,
    image: (bedroom as any).imageUrl || undefined
  }));

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Nuestras Habitaciones</h1>
      <p className="text-gray-600 mb-8">
        Descubre nuestras cómodas habitaciones diseñadas para ofrecerte una
        experiencia inolvidable. Aprovecha nuestras promociones especiales.
      </p>

      {/* Pasamos los datos de habitaciones y las promociones se cargarán dentro del componente */}
      <ClientRoomsWithPromotions rooms={roomsData} />
    </div>
  );
}
