import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem
} from '@/components/ui/carousel';

interface ImagesCarrouselInterface {
  image: string[];
}

export function CarouselComponents({ image }: ImagesCarrouselInterface) {
  return (
    <Carousel
      opts={{
        align: 'center'
      }}
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent className="h-120">
        {image.map((image, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 lg:basis-1/3 h-full"
          >
            <div className="p-1 h-full">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img src={image} alt={`Image ${index + 1}`} />
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
