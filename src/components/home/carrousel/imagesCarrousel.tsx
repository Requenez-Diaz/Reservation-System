import React from 'react';
import { CarouselComponents } from './carrousel';

interface ImagesCarrouselInterface {
  _name: string;
  _images: string;
}

const ImagesCarrousel = ({ _name, _images }: ImagesCarrouselInterface) => {
  const imagesItems = [
    {
      name: 'Habitación 1',
      images: '/pexels-helena-lopes-2017802.jpg'
    },
    {
      name: 'Habitación 2',
      images: '/pexels-helena-lopes-2017802.jpg'
    },
    {
      name: 'Habitación 3',
      images: '/pexels-helena-lopes-2017802.jpg'
    },
    {
      name: 'Habitación 4',
      images: '/pexels-helena-lopes-2017802.jpg'
    }
  ];

  return (
    <div>
      <div>
        <CarouselComponents images={imagesItems} />
      </div>
    </div>
  );
};

export default ImagesCarrousel;
