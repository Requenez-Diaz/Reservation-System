'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

export function CarouselDescriptions() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const imagesItems = [
    'https://cdn.pixabay.com/photo/2016/11/19/13/06/bed-1839183_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/19/13/06/bed-1839183_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/19/13/06/bed-1839183_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/19/13/06/bed-1839183_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/19/13/06/bed-1839183_1280.jpg'
  ];

  return (
    <Carousel
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      plugins={[plugin.current]}
    >
      <CarouselContent>
        {imagesItems.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img
                    alt={`Slide ${index + 1}`}
                    className="h-full object-cover w-full"
                    src={image}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
