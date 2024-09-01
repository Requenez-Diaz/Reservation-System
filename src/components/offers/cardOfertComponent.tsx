import React from 'react';
import { RoomCardProps } from './types';
import RoomCard from './RoomCards';

export default function Component() {
  const rooms: RoomCardProps[] = [
    {
      type: 'Habitación Estándar',
      description: 'Incluye desayuno gratuito. Cómoda y acogedora.',
      price: 100,
      image:
        'https://media.istockphoto.com/id/1467126728/es/foto/dise%C3%B1o-interior-de-dormitorio-moderno-escandinavo-y-japon%C3%A9sdi-con-cama-color-blanco-mesa-y.jpg?s=2048x2048&w=is&k=20&c=iFU05E8kHNDlRYQeF4lyXZmAW53WUpfM8fJRANmRWvI='
    },
    {
      type: 'Suite de Lujo',
      description: 'Vista panorámica y servicios exclusivos.',
      price: 200,
      image:
        'https://media.istockphoto.com/id/1467126728/es/foto/dise%C3%B1o-interior-de-dormitorio-moderno-escandinavo-y-japon%C3%A9sdi-con-cama-color-blanco-mesa-y.jpg?s=2048x2048&w=is&k=20&c=iFU05E8kHNDlRYQeF4lyXZmAW53WUpfM8fJRANmRWvI='
    },
    {
      type: 'Suite de Lujo',
      description: 'Amplia suite con jacuzzi privado.',
      price: 250,
      image:
        'https://media.istockphoto.com/id/1467126728/es/foto/dise%C3%B1o-interior-de-dormitorio-moderno-escandinavo-y-japon%C3%A9sdi-con-cama-color-blanco-mesa-y.jpg?s=2048x2048&w=is&k=20&c=iFU05E8kHNDlRYQeF4lyXZmAW53WUpfM8fJRANmRWvI='
    },
    {
      type: 'Habitación Estándar',
      description: 'Perfecta para viajeros de negocios.',
      price: 120,
      image:
        'https://media.istockphoto.com/id/1467126728/es/foto/dise%C3%B1o-interior-de-dormitorio-moderno-escandinavo-y-japon%C3%A9sdi-con-cama-color-blanco-mesa-y.jpg?s=2048x2048&w=is&k=20&c=iFU05E8kHNDlRYQeF4lyXZmAW53WUpfM8fJRANmRWvI='
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gray-100">
      {rooms.map((room, index) => (
        <RoomCard key={index} {...room} />
      ))}
    </div>
  );
}
