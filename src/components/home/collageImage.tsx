import React from 'react';
import Images from './images';

const CollageImage: React.FC = () => {
  const images = [
    {
      src: 'https://www.ceupe.com/images/easyblog_articles/2539/b2ap3_amp_Caractersticas-de-las-instalaciones-hoteleras.jpg',
      alt: 'Hotel',
      tipo: 'SUITE',
      precio: 100,
      descripcion: 'Consta de tres habitaciones, tres baños, centro de entretenimiento, televisión por cable y una amplia sala de estar.'
    },
    {
      src: 'https://53b20a41c2.cbaul-cdnwnd.com/bc429e9705d589d7e52e3dc4234143aa/200000007-6b2af6c247/hab%20tirple.jpg',
      alt: 'Hotel',
      tipo: 'TRIPLES',
      precio: 60,
      descripcion: 'Las habitaciones triples constan de tres camas, television por cable, dos baños y una sala de estar.'
    },
    {
      src: 'https://www.ceupe.com/images/easyblog_articles/2539/b2ap3_amp_Caractersticas-de-las-instalaciones-hoteleras.jpg',
      alt: 'Hotel',
      tipo: 'INDIVIDUAL',
      precio: 60,
      descripcion: 'Perfecta para viajeros solitarios y cuenta con una cama individual, escritorio y baño privado.'
    },
    {
      src: 'https://www.ceupe.com/images/easyblog_articles/2539/b2ap3_amp_Caractersticas-de-las-instalaciones-hoteleras.jpg',
      alt: 'Hotel',
      tipo: 'DOBLE',
      precio: 60,
      descripcion: 'Las habitaciones dobles disponen de dos camas, baño privado y televisión por cable.'
    },
  ];

  return (
    <div>
      <div className="flex flex-col items-center content-center">
        <h1 className="text-2xl font-bold mb-4">Información de Habitaciones</h1>
      </div>
      <Images images={images} />
    </div>
  );
};

export default CollageImage;