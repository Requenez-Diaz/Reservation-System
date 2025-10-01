'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi
} from '@/components/ui/carousel';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function CarouselDescriptions() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const imageUrls = [
    'https://www.ceupe.com/images/easyblog_articles/2539/b2ap3_amp_Caractersticas-de-las-instalaciones-hoteleras.jpg',
    'https://www.ceupe.com/images/easyblog_articles/2539/b2ap3_amp_Caractersticas-de-las-instalaciones-hoteleras.jpg',
    'https://www.ceupe.com/images/easyblog_articles/2539/b2ap3_amp_Caractersticas-de-las-instalaciones-hoteleras.jpg',
    'https://www.ceupe.com/images/easyblog_articles/2539/b2ap3_amp_Caractersticas-de-las-instalaciones-hoteleras.jpg'
  ];

  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (!isHovered) {
        api.scrollNext();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [api, isHovered]);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-amber-100 p-6 md:p-12">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md lg:max-w-lg transform transition-all duration-300 hover:shadow-3xl">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-balance">
          Servicios Disponibles
        </h2>
        <p className="text-gray-700 mb-6 text-justify leading-relaxed">
          Descubre los servicios que tenemos disponibles para hacer de tu
          estadía una experiencia inolvidable. Ofrecemos una amplia gama de
          servicios diseñados para satisfacer tus necesidades y mejorar tu
          estancia. Desde deliciosas opciones gastronómicas hasta emocionantes
          actividades recreativas, ¡tenemos todo lo que necesitas para una
          experiencia inolvidable!
        </p>
        <Button className="bg-blue-500 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-gray-700 hover:scale-105 shadow-lg">
          <Link href="/servicios">Explorar Servicios</Link>
        </Button>
      </div>

      <div
        className="flex flex-col items-center w-full max-w-md lg:max-w-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Carousel
          className="w-full"
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true
          }}
        >
          <CarouselContent>
            {imageUrls.map((url, index) => (
              <CarouselItem key={index}>
                <div className="p-2">
                  <Card className="border-0 shadow-xl overflow-hidden">
                    <CardContent className="flex aspect-square items-center justify-center p-0">
                      <Image
                        alt={`Servicio ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        height={500}
                        src={url || '/placeholder.svg'}
                        width={500}
                        priority={index === 0}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-white/90 hover:bg-white shadow-lg" />
          <CarouselNext className="right-4 bg-white/90 hover:bg-white shadow-lg" />
        </Carousel>

        <div className="flex gap-2 mt-6">
          {imageUrls.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index
                  ? 'w-8 bg-gray-900'
                  : 'w-2 bg-gray-400 hover:bg-gray-600'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
