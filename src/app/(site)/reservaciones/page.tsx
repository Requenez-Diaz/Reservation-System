// app/reservations/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // ajusta la ruta
import { getUserReservations } from '@/app/actions/reservations/get-reservations-user';
import { ReservationCard } from '@/components/bookings/components/getReservations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function ReservationsPage() {
  const session = await getServerSession(authOptions);

  // Si no hay sesión o id, muestra un mensaje o redirige
  if (!session?.user?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Inicia sesión</h1>
          <p className="text-gray-600">
            Necesitas iniciar sesión para ver tus reservaciones.
          </p>
          <Link href="/sign-in">
            <Button className="bg-teal-600 hover:bg-teal-700">
              Iniciar sesión
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const userId = Number(session.user.id);
  const { success, reservations } = await getUserReservations(userId);

  if (!success || reservations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
        {/* ... tu header ... */}
        <div className="flex min-h-[80vh] items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              No tienes reservaciones
            </h1>
            <p className="text-gray-600 mb-6">
              Aún no has realizado ninguna reservación en nuestro hotel
            </p>
            <Link href="/">
              <Button className="bg-teal-600 hover:bg-teal-700">
                Buscar habitaciones
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* ... tu header ... */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-balance text-3xl font-bold text-gray-900 mb-2">
            Mis Reservaciones
          </h1>
          <p className="text-pretty text-gray-600">
            Aquí puedes ver todas tus reservaciones en Hotel Madroño
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
        </div>
      </div>
    </div>
  );
}
