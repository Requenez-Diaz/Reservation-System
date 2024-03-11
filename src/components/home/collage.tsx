import React from 'react';
import BannerProps from './bannerProps';

const Collage = () => {
  const imagenes = [
    {
      src: 'https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Hotel'
    },
    {
      src: 'https://images.pexels.com/photos/707581/pexels-photo-707581.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Hotel'
    },
    {
      src: 'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Hotel'
    },
    {
      src: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600',
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
      </div>
    </div>
  );
};

export default Collage;
