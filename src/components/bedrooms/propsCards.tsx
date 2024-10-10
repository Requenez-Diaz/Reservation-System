import Image from 'next/image';
import React from 'react';
import { RoomAvailability } from './roomAvailability';
import { AddReservation } from './addReservation';
import BedroomDetail from './bedroomDetail';

interface PropsCardsProps {
  typeBedroom: string;
  description: string;
  lowSeasonPrice: number;
  status: boolean;
  numberBedroom: number;
}

export default function PropsCards({
  typeBedroom,
  description,
  lowSeasonPrice,
  status,
  numberBedroom
}: PropsCardsProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 p-6 transition-transform duration-300 hover:shadow-xl hover:scale-105">
      <Image
        alt="Imagen de la habitación"
        className="w-full h-48 object-cover rounded-t-lg mb-4"
        height={500}
        src={
          'https://media.istockphoto.com/id/1390233984/es/foto/habitaci%C3%B3n-de-lujo-moderna.webp?b=1&s=170667a&w=0&k=20&c=sLPzMweWiHutEfXwpxoo4Ew8Wu_kZxzT5dRUohKbP40='
        }
        width={500}
      />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{typeBedroom}</h1>
      <BedroomDetail label="Descripción" value={description} />
      <BedroomDetail label="Precio" value={lowSeasonPrice} isPrice />
      <BedroomDetail label="Número de habitación" value={numberBedroom} />
      <BedroomDetail label="Estado" value={status} isStatus />

      <hr className="my-4 border-gray-300" />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <AddReservation />
        <RoomAvailability isAvailable={true} />
      </div>
    </div>
  );
}
