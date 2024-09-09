import { getReservations } from '@/app/actions/saveReservation/getReservation';
import React from 'react';

async function ReservationsPage() {
  const reservations = await getReservations();

  if (reservations.length === 0) {
    return <div>No hay reservas disponibles.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Los datos de tus reservas</h1>

      {reservations.map((reservation) => (
        <div key={reservation.id} className="bg-white rounded-lg shadow-md p-6 mb-6 w-full max-w-md">
          <div className="flex justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Entrada</h2>
              <p className="text-gray-700">{new Date(reservation.arrivalDate).toLocaleDateString()}</p>
            </div>

            <div className="border-l border-gray-300 h-16 mx-4"></div>

            <div>
              <h2 className="text-xl font-semibold">Salida</h2>
              <p className="text-gray-700">{new Date(reservation.departureDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold">Duración total de la estancia:</h2>
            <p className="text-gray-700">{calculateDuration(reservation.arrivalDate.toString(), reservation.departureDate.toString())} noche{calculateDuration(reservation.arrivalDate.toString(), reservation.departureDate.toString()) > 1 ? 's' : ''}</p>
          </div>

          <hr className="my-4 border-gray-300" />

          <div className="mb-4">
            <h2 className="text-xl font-semibold">Has seleccionado</h2>
            <p className="text-gray-700">{reservation.rooms}: Habitación</p>
            <p className="text-gray-700">Tipo de Habitación: {reservation.bedroomsType}</p>
            <p className="text-gray-700">Número de huéspedes: {reservation.guests}</p>
            <p className='text-gray-700'>Tu habitacion esta: {reservation.status}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              <a href="./habitaciones" className="text-blue-500 hover:underline">
                Cambiar tu elección
              </a>
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}

// Función para calcular la duración de la estancia
const calculateDuration = (arrivalDate: string, departureDate: string): number => {
  const arrival = new Date(arrivalDate);
  const departure = new Date(departureDate);
  const duration = (departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24); // aqui convierto de milisegundos a días
  return duration;
};

export default ReservationsPage;