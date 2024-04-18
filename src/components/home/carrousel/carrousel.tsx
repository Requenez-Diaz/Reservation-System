import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem
} from '@/components/ui/carousel';
import Image from 'next/image';

interface ImagesCarrouselInterface {
  image: string[];
}

export function CarouselComponents({ image }: ImagesCarrouselInterface) {
  return (
    <Carousel
      className="w-full max-w-5xl mx-auto"
      opts={{
        align: 'center'
      }}
    >
      <CarouselContent className="h-120">
        {image.map((image, index) => (
          <CarouselItem
            className="md:basis-1/2 lg:basis-1/3 h-full"
            key={index}
          >
            <div className="p-1 h-full">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image
                    alt={`Image ${index + 1}`}
                    height={400}
                    src={image}
                    width={400}
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
