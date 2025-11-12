import React from 'react';
import { CarouselDescriptions } from './CarrouselDescriptions';

const ImagesCarrousel = () => {
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
      <CarouselDescriptions items={imagesItems} />
    </div>
  );
};

export default ImagesCarrousel;
