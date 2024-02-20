import React from 'react';
import Images from './images';

const CollageImage = () => {
  const images = [
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
      <h1 className="text-2xl font-bold mb-4">Collage example</h1>
      <Images images={images} />
    </div>
  );
};

export default CollageImage;
