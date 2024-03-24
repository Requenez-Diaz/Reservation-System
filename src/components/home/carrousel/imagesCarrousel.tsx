import { Car } from 'lucide-react';
import React from 'react';
import { CarouselComponents } from './carrousel';

interface ImagesCarrouselInterface {
  name: string;
  images: string;
}

const ImagesCarrousel = ({ name, images }: ImagesCarrouselInterface) => {
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
        <CarouselComponents image={images} />
      </div>
    </div>
  );
};

export default ImagesCarrousel;
