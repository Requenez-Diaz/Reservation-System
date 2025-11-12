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
import { Button } from '@/components/ui/button';
import { Bed, MapPin, Phone, Clock } from 'lucide-react';

export function CarouselDescriptions() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const services = [
    {
      title: 'Comodidad y Confort',
      icon: Bed,
      features: [
        'Habitaciones cómodas y climatizadas',
        'Televisión en todas las habitaciones',
        'Atención personalizada y amable',
        'Servicio de limpieza diario'
      ]
    },
    {
      title: 'Conectividad y Ubicación',
      icon: MapPin,
      features: [
        'Wi-Fi gratis en todo el hotel',
        'Ubicación céntrica y accesible',
        'Parque privado y seguro',
        'Fácil acceso a transporte público'
      ]
    },
    {
      title: 'Disponibilidad Total',
      icon: Clock,
      features: [
        'Abiertos 24/7 para atenderte',
        'Recepción disponible todo el día',
        'Check-in y check-out flexible',
        'Atención inmediata a tus necesidades'
      ]
    }
  ];

  React.useEffect(() => {
    if (api) {
      const interval = setInterval(() => {
        if (!isHovered) {
          api.scrollNext();
        }
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [api, isHovered]);

  React.useEffect(() => {
    if (api) {
      setCurrent(api.selectedScrollSnap());

      api.on('select', () => {
        setCurrent(api.selectedScrollSnap());
      });
    }
  }, [api]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 justify-center items-center min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 p-6 md:p-12">
      {/* Info Panel */}
      <div className="border border-border bg-card rounded-2xl shadow-2xl p-8 w-full max-w-md lg:max-w-lg transform transition-all duration-300 hover:shadow-3xl">
        <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground text-balance">
          HOTEL Mono
        </h2>
        <p className="mb-6 text-lg text-muted-foreground text-pretty leading-relaxed">
          Te esperamos para atenderte como te lo mereces. En Hotel Mono
          encontrarás todo lo que necesitas para una estadía cómoda y
          placentera. Nuestro compromiso es brindarte la mejor experiencia con
          servicios de calidad y atención personalizada las 24 horas del día.
        </p>
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-3 text-foreground">
            <Phone className="h-5 w-5 text-accent" />
            <div>
              <p className="font-semibold">RESERVACIONES</p>
              <p className="text-lg">08438 3204</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-foreground">
            <Phone className="h-5 w-5 text-accent" />
            <div>
              <p className="font-semibold">RESERVACIONES</p>
              <p className="text-lg">08647 7819</p>
            </div>
          </div>
        </div>
        <Button className="w-full px-6 py-3 text-accent-foreground bg-accent rounded-lg shadow-lg transition-all duration-300 hover:bg-accent/90 hover:scale-105">
          Hacer Reservación
        </Button>
      </div>

      {/* Carousel Panel */}
      <div
        className="flex flex-col items-center w-full max-w-md lg:max-w-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Carousel
          className="w-full"
          opts={{ align: 'start', loop: true }}
          setApi={setApi}
        >
          <CarouselContent>
            {services.map((service, index) => (
              <CarouselItem key={index}>
                <div className="p-2">
                  <Card className="bg-gradient-to-br from-card to-card/80 border-2 border-border shadow-xl overflow-hidden">
                    <CardContent className="flex flex-col items-center justify-center min-h-[400px] p-8">
                      <div className="mb-6 rounded-full p-6 bg-accent/10">
                        <service.icon className="h-16 w-16 text-accent" />
                      </div>
                      <h3 className="mb-6 text-2xl font-bold text-center text-foreground">
                        {service.title}
                      </h3>
                      <ul className="w-full space-y-3">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <div className="flex-shrink-0 mt-2 h-2 w-2 rounded-full bg-accent" />
                            <span className="leading-relaxed text-lg">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-card/90 border-border shadow-lg hover:bg-card" />
          <CarouselNext className="right-4 bg-card/90 border-border shadow-lg hover:bg-card" />
        </Carousel>

        <div className="flex gap-2 mt-6">
          {services.map((_, index) => (
            <button
              key={index}
              aria-label={`Ir a información ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index
                  ? 'w-8 bg-accent'
                  : 'w-2 bg-muted-foreground/40 hover:bg-accent/60'
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
