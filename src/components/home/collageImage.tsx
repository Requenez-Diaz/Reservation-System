import React from 'react';
import Images from './images';
import { Button } from '../ui/button';

const CollageImage = () => {
  const images = [
    {
      src: 'https://www.ceupe.com/images/easyblog_articles/2539/b2ap3_amp_Caractersticas-de-las-instalaciones-hoteleras.jpg',
      alt: 'Hotel'
    },
    {
      src: 'https://www.ceupe.com/images/easyblog_articles/2539/b2ap3_amp_Caractersticas-de-las-instalaciones-hoteleras.jpg',
      alt: 'Hotel'
    },
    {
      src: 'https://www.ceupe.com/images/easyblog_articles/2539/b2ap3_amp_Caractersticas-de-las-instalaciones-hoteleras.jpg',
      alt: 'Hotel'
    },
    {
      src: 'https://www.ceupe.com/images/easyblog_articles/2539/b2ap3_amp_Caractersticas-de-las-instalaciones-hoteleras.jpg',
      alt: 'Hotel'
    }
  ];
  return (
    <div>
      <div className="flex flex-col items-center content-center">
        <h1 className="text-2xl font-bold mb-4">Lo mas Buscado</h1>
      </div>
      <Images images={images} />
    </div>
  );
};

export default CollageImage;
