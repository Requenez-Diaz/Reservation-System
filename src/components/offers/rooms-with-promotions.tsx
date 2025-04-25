import { Suspense } from 'react';

import type { Promotion } from '@/types';
import { getPromotions } from '@/app/actions/getPromotions/getPromotions';
import { RoomCardProps } from './ types';
import RoomCardWithPromotions from './room-card-with-promotions';

// Componente de carga
function RoomsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-[400px] rounded-lg bg-muted animate-pulse"
        ></div>
      ))}
    </div>
  );
}

// Componente que obtiene las promociones y muestra las habitaciones
// Usamos una función asíncrona para obtener los datos una sola vez
async function RoomsWithPromotionsContent({
  rooms
}: {
  rooms: (RoomCardProps & { id: number })[];
}) {
  // Obtener promociones - esto se ejecuta una sola vez durante la renderización del servidor
  const promotionsResult = await getPromotions();
  const promotions = promotionsResult.success ? promotionsResult.data : [];

  return <RoomsGrid rooms={rooms} promotions={promotions} />;
}

// Separamos la renderización de la grid para evitar re-renders innecesarios
function RoomsGrid({
  rooms,
  promotions
}: {
  rooms: (RoomCardProps & { id: number })[];
  promotions: Promotion[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <RoomCardWithPromotions
          key={room.id}
          type={room.type}
          description={room.description}
          image={room.image}
          price={room.price}
          promotions={promotions}
          roomId={room.id}
        />
      ))}
    </div>
  );
}

// Componente principal con Suspense
export function RoomsWithPromotions({
  rooms
}: {
  rooms: (RoomCardProps & { id: number })[];
}) {
  return (
    <Suspense fallback={<RoomsLoading />}>
      <RoomsWithPromotionsContent rooms={rooms} />
    </Suspense>
  );
}
