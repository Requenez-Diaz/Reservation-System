import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function CarouselDescriptions() {
  const imageUrls = [
    'https://www.ceupe.com/images/easyblog_articles/2539/b2ap3_amp_Caractersticas-de-las-instalaciones-hoteleras.jpg',
    'https://www.ceupe.com/images/easyblog_articles/2539/b2ap3_amp_Caractersticas-de-las-instalaciones-hoteleras.jpg',
    'https://www.ceupe.com/images/easyblog_articles/2539/b2ap3_amp_Caractersticas-de-las-instalaciones-hoteleras.jpg',
    'https://www.ceupe.com/images/easyblog_articles/2539/b2ap3_amp_Caractersticas-de-las-instalaciones-hoteleras.jpg'
  ];

  return (
    <div className="flex flex-row col-auto justify-evenly items-center min-screen bg-gray-300 md:w[500px]">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full md:w-1/2 xl:w-1/3">
        <h2 className="text-lg font-bold mb-2">Servicios Disponibles</h2>
        <p className="text-black mb-4 text-justify">
          Descubre los servicios que tenemos disponibles para hacer de tu
          estadía una experiencia inolvidable. Ofrecemos una amplia gama de
          servicios diseñados para satisfacer tus necesidades y mejorar tu
          estancia. Desde deliciosas opciones gastronómicas hasta emocionantes
          actividades recreativas, ¡tenemos todo lo que necesitas para una
          experiencia inolvidable!
        </p>
        <Button className="bg-black text-white px-2 py-1 rounded transition-all duration-300 hover:bg-gray-600 hover:text-white">
          <Link href="/servicios">Explorar Servicios</Link>
        </Button>
      </div>

      <div className="flex flex-row justify-center md:w-2/2 xl:w-1/3">
        <Carousel className="max-w-md h-full">
          <CarouselContent>
            {imageUrls.map((url, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-2">
                      <Image
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover"
                        height={200}
                        src={url}
                        width={200}
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
      </div>
    </div>
  );
}
