'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { SelectRoomModal } from '../offers/SelectRoomModal';
import { RoomAvailability } from './roomAvailability';

interface PropsCardsProps {
  typeBedroom: string;
  description: string;
  lowSeasonPrice: number;
  // highSeasonPrice: number;
  status: boolean;
  numberBedroom: number;
}

export default function PropsCards({
  typeBedroom,
  description,
  lowSeasonPrice,
  // highSeasonPrice,
  status,
  numberBedroom,
}: PropsCardsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 p-4 transition-transform duration-300 hover:scale-105">
      <Image
        alt="Imagen de la habitación"
        className="w-full h-48 object-cover mb-4"
        height={500}
        src={'https://media.istockphoto.com/id/1390233984/es/foto/habitaci%C3%B3n-de-lujo-moderna.webp?b=1&s=170667a&w=0&k=20&c=sLPzMweWiHutEfXwpxoo4Ew8Wu_kZxzT5dRUohKbP40='}
        width={500}
      />
      <h1 className="text-xl font-bold text-gray-800 mb-2">{typeBedroom}</h1>
      <p className="text-gray-600 mb-2"><strong>Descripción:</strong> {description}</p>
      <p className="text-gray-600 mb-2"><strong>Precio temporada baja:</strong> <span className="text-green-600 font-semibold">${lowSeasonPrice}</span></p>
      {/* <p className="text-gray-600 mb-2"><strong>Precio temporada alta:</strong> <span className="text-red-600 font-semibold">${highSeasonPrice}</span></p> */}
      <p className="text-gray-600 mb-2"><strong>Número de habitación:</strong> {numberBedroom}</p>
      <p className={`text-gray-600 mb-4 ${status ? 'text-green-600' : 'text-red-600'}`}><strong>Estado:</strong> {status ? 'Activa' : 'Inactiva'}</p>
      <div className="flex flex-col sm:flex-row justify-between">
        <SelectRoomModal />
        <Button
          className="bg-blue-500 text-white rounded-lg px-4 py-2 transition-transform duration-300 transform hover:scale-105"
          onClick={handleOpenModal}
        >
          Ver Disponibilidad
        </Button>
      </div>
      {isModalOpen && (
        <RoomAvailability isAvailable={true} onClose={handleCloseModal} open={isModalOpen} />
      )}
    </div>
  );
}
