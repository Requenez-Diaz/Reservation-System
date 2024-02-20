import React from 'react';
import BannerProps from './bannerProps';
import CollageImage from './collageImage';

const Collage = () => {
  const imagenes = [
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
      <div className="p-8">
        <BannerProps
          title="Explora tu futuro"
          description="Creamos un mundo donde podes reservar a un solo click"
          images={imagenes}
        />
        {/* <CollageImage /> */}
      </div>
    </div>
  );
};

export default Collage;
