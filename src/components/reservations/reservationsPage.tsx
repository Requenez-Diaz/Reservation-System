import React from 'react';
import { EditReservation } from '../bedrooms/editReservation';
import { DeleteReservation } from '../bedrooms/deleteReservation';
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Status } from '@prisma/client';
import { calculateDuration } from '@/app/actions/saveReservation/calculateDuration';
import { getReservations } from '@/app/actions/saveReservation';

const ReservationsPage = async () => {
  const { user, reservations } = await getReservations();

  if (!user) {
    return <div>No estás autenticado.</div>;
  }

  if (reservations.length === 0) {
    return <div>No hay reservas disponibles.</div>;
  }

  const statusVariants: Record<string, BadgeProps["variant"]> = {
    [Status.PENDING]: "info",
    [Status.CONFIRMED]: "success",
    [Status.CANCELLED]: "destructive",
  };

  const statusLabels: Record<string, string> = {
    [Status.PENDING]: "Pendiente",
    [Status.CONFIRMED]: "Confirmado",
    [Status.CANCELLED]: "Cancelado",
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Bienvenido, {user.username}
      </h1>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Mis Reservaciones
      </h2>

      {reservations.map((reservation) => (
        <div
          key={reservation.id}
          className="bg-white rounded-lg shadow-md p-6 mb-6 w-full max-w-md"
        >
          <div className="flex justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Nombre</h2>
              <p className="text-gray-700">
                {reservation.name} {reservation.lastName}
              </p>
            </div>

            <div className="border-l border-gray-300 h-16 mx-4"></div>

            <div>
              <h2 className="text-xl font-semibold">Entrada</h2>
              <p className="text-gray-700">
                {new Date(reservation.arrivalDate).toLocaleDateString()}
              </p>
            </div>

            <div className="border-l border-gray-300 h-16 mx-4"></div>

            <div>
              <h2 className="text-xl font-semibold">Salida</h2>
              <p className="text-gray-700">
                {new Date(reservation.departureDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mb-4 p-4 bg-gray-50 rounded-md border border-gray-300">
            <h2 className="text-xl font-semibold mb-2">
              Duración total de la estancia:
            </h2>
            <p>Usuario: {user.username}</p>
            <p>Email: {user.email}</p>
            <p className="text-gray-700 text-lg">
              <span className="font-bold">
                {calculateDuration(
                  reservation.arrivalDate.toString(),
                  reservation.departureDate.toString()
                )}
              </span>{' '}
              noche
              {calculateDuration(
                reservation.arrivalDate.toString(),
                reservation.departureDate.toString()
              ) > 1
                ? 's'
                : ''}
            </p>
          </div>

          <hr className="my-4 border-gray-300" />

          <div className="mb-4 p-4 bg-gray-50 rounded-md border border-gray-300">
            <h2 className="text-xl font-semibold mb-2">Has seleccionado</h2>
            <p className="text-gray-700">
              <span className="font-medium">Habitaciones:</span>{' '}
              {reservation.rooms}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Tipo de Habitación:</span>{' '}
              {reservation.bedroomsType}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Número de huéspedes:</span>{' '}
              {reservation.guests}
            </p>
            <p className="text-gray-700">
              <Badge variant={statusVariants[reservation.status]}>
                {statusLabels[reservation.status]}
              </Badge>
            </p>
          </div>

          {reservation.status === Status.PENDING ? (
            <div className="flex justify-between pt-4 gap-4">
              <DeleteReservation reservationId={reservation.id} />
              <EditReservation reservationId={reservation.id} />
            </div>
          ) : (
            <div className="text-center text-gray-600 italic">
              No se pueden modificar reservaciones confirmadas o canceladas.
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReservationsPage;
