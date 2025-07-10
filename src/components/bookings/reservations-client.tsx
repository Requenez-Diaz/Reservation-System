'use client';

import { EditReservation } from './components/editReservation';
import { DeleteReservation } from './components/deleteReservation';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import { Status } from '@prisma/client';

interface Reservation {
  id: number;
  arrivalDate: Date;
  departureDate: Date;
  rooms: number;
  bedroomsType: string;
  guests: number;
  status: Status;
}

interface User {
  username: string;
  email: string;
}

interface ReservationsClientProps {
  reservations: Reservation[];
  user: User;
}

function calculateDuration(arrivalDate: string, departureDate: string): number {
  try {
    const arrival = new Date(arrivalDate);
    const departure = new Date(departureDate);
    const diffTime = Math.abs(departure.getTime() - arrival.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch (error) {
    console.error('Error calculando duración:', error);
    return 0;
  }
}

export function ReservationsClient({
  reservations,
  user
}: ReservationsClientProps) {
  console.log('🎨 ReservationsClient renderizando:', {
    reservationsCount: reservations.length,
    username: user.username
  });

  const statusVariants: Record<string, BadgeProps['variant']> = {
    [Status.PENDING]: 'default',
    [Status.CONFIRMED]: 'default',
    [Status.CANCELLED]: 'destructive'
  };

  const statusLabels: Record<string, string> = {
    [Status.PENDING]: 'Pendiente',
    [Status.CONFIRMED]: 'Confirmado',
    [Status.CANCELLED]: 'Cancelado'
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Mis Reservaciones
        </h1>

        <div className="space-y-6">
          {reservations.map((reservation) => {
            const duration = calculateDuration(
              reservation.arrivalDate.toString(),
              reservation.departureDate.toString()
            );

            return (
              <div
                key={reservation.id}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                {/* Header con información básica */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <h3 className="font-semibold text-gray-700">Usuario</h3>
                    <p className="text-gray-600">{user.username}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <h3 className="font-semibold text-gray-700">Entrada</h3>
                    <p className="text-gray-600">
                      {new Date(reservation.arrivalDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <h3 className="font-semibold text-gray-700">Salida</h3>
                    <p className="text-gray-600">
                      {new Date(reservation.departureDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Información de duración */}
                <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    Duración de la estancia
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
                    <p>Usuario: {user.username}</p>
                    <p>Email: {user.email}</p>
                  </div>
                  <p className="text-blue-800 text-lg font-bold mt-2">
                    {duration} noche{duration !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Detalles de la reservación */}
                <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-3">
                    Detalles de la reservación
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-green-700">
                        Habitaciones:
                      </span>
                      <span className="text-green-600">
                        {reservation.rooms}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-green-700">Tipo:</span>
                      <span className="text-green-600">
                        {reservation.bedroomsType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-green-700">
                        Huéspedes:
                      </span>
                      <span className="text-green-600">
                        {reservation.guests}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-green-700">
                        Estado:
                      </span>
                      <Badge variant={statusVariants[reservation.status]}>
                        {statusLabels[reservation.status]}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="border-t pt-4">
                  {reservation.status === Status.PENDING ? (
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <DeleteReservation reservationId={reservation.id} />
                      <EditReservation reservationId={reservation.id} />
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 italic">
                      No se pueden modificar reservaciones{' '}
                      {statusLabels[reservation.status].toLowerCase()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
