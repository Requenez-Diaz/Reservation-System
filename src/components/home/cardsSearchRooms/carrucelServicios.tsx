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
    <div className="flex flex-col lg:flex-row gap-8 justify-center items-center min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 p-6 md:p-12">
      <div className="bg-card rounded-2xl shadow-2xl p-8 w-full max-w-md lg:max-w-lg transform transition-all duration-300 hover:shadow-3xl border border-border">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-balance">
          HOTEL Mono
        </h2>
        <p className="text-muted-foreground mb-6 text-pretty leading-relaxed">
          Te esperamos para atenderte como te lo mereces. En Hotel Mono
          encontrarás todo lo que necesitas para una estadía cómoda y
          placentera. Nuestro compromiso es brindarte la mejor experiencia con
          servicios de calidad y atención personalizada las 24 horas del día.
        </p>
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-foreground">
            <Phone className="w-5 h-5 text-accent" />
            <div>
              <p className="font-semibold">RESERVACIONES</p>
              <p className="text-lg">08438 3204</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-foreground">
            <Phone className="w-5 h-5 text-accent" />
            <div>
              <p className="font-semibold">RESERVACIONES</p>
              <p className="text-lg">08647 7819</p>
            </div>
          </div>
        </div>
        <Button className="bg-accent text-accent-foreground px-6 py-3 rounded-lg transition-all duration-300 hover:bg-accent/90 hover:scale-105 shadow-lg w-full">
          Hacer Reservación
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
            {services.map((service, index) => (
              <CarouselItem key={index}>
                <div className="p-2">
                  <Card className="border-2 border-border shadow-xl overflow-hidden bg-gradient-to-br from-card to-card/80">
                    <CardContent className="flex flex-col items-center justify-center p-8 min-h-[400px]">
                      <div className="bg-accent/10 p-6 rounded-full mb-6">
                        <service.icon className="w-16 h-16 text-accent" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                        {service.title}
                      </h3>
                      <ul className="space-y-3 w-full">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                            <span className="text-lg leading-relaxed">
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
          <CarouselPrevious className="left-4 bg-card/90 hover:bg-card shadow-lg border-border" />
          <CarouselNext className="right-4 bg-card/90 hover:bg-card shadow-lg border-border" />
        </Carousel>

        <div className="flex gap-2 mt-6">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index
                  ? 'w-8 bg-accent'
                  : 'w-2 bg-muted-foreground/40 hover:bg-accent/60'
              }`}
              aria-label={`Ir a información ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
