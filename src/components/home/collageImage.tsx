import React from 'react';
import Images from './imagesRooms';

const CollageImage: React.FC = () => {
  const imagesArray = [
    {
      src: 'https://cdn.pixabay.com/photo/2013/03/02/01/25/room-89022_1280.jpg',
      alt: 'Hotel',
      tipo: 'SUITE',
      precio: 100,
      descripcion:
        'Consta de tres habitaciones, tres baños, centro de entretenimiento, televisión por cable y una amplia sala de estar.'
    },
    {
      src: 'https://cdn.pixabay.com/photo/2021/11/08/00/30/bedroom-6778193_1280.jpg',
      alt: 'Hotel',
      tipo: 'TRIPLES',
      precio: 60,
      descripcion:
        'Las habitaciones triples constan de tres camas, television por cable, dos baños y una sala de estar.'
    },
    {
      src: 'https://cdn.pixabay.com/photo/2016/10/18/09/02/hotel-1749602_1280.jpg',
      alt: 'Hotel',
      tipo: 'DOBLE',
      precio: 40,
      descripcion:
        'Las habitaciones dobles disponen de dos camas, baño privado y televisión por cable.'
    },
    {
      src: 'https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg',
      alt: 'Hotel',
      tipo: 'INDIVIDUAL',
      precio: 20,
      descripcion:
        'Perfecta para viajeros solitarios y cuenta con una cama individual, escritorio y baño privado.'
    }
  ];

  return (
    <div>
      <div className="flex flex-col items-center content-center">
        <h1 className="text-2xl font-bold mb-4">Información de Habitaciones</h1>
      </div>
      <Images images={imagesArray} />
    </div>
  );
};

export default CollageImage;
