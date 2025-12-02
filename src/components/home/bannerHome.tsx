'use client';

import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Wifi,
  Car,
  Tv,
  MapPin,
  Clock
} from 'lucide-react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    title: 'Bienvenido a Hotel Madroño',
    subtitle: 'Tu hogar lejos de casa',
    description: 'Te esperamos para atenderte como te lo mereces',
    features: [
      { icon: Wifi, text: 'Wi-Fi gratis en todo el hotel' },
      { icon: Car, text: 'Parque privado y seguro' },
      { icon: Tv, text: 'Televisión' }
    ],
    bgImage: '/pexels-helena-lopes-2017802.jpg'
  },
  {
    id: 2,
    title: 'Comodidad y Confort',
    subtitle: 'Habitaciones diseñadas para tu descanso',
    description: 'Habitaciones cómodas y climatizadas',
    features: [
      { icon: MapPin, text: 'Ubicación céntrica y accesible' },
      { text: 'Atención personalizada y amable' },
      { text: 'Habitaciones climatizadas' }
    ],
    bgImage: '/banner2.jpg'
  },
  {
    id: 3,
    title: 'Abiertos 24/7',
    subtitle: 'Siempre disponibles para ti',
    description: 'Reserva ahora y disfruta de nuestros servicios',
    cta: true,
    bgImage: '/banner3.jpg'
  }
];

export function BannerHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-primary">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              alt={slide.title}
              className="w-full h-full object-cover"
              src={slide.bgImage || '/placeholder.svg'}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center pt-20 md:pt-0">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <div className="max-w-3xl">
                {/* Title */}
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-primary-foreground mb-4 text-balance leading-tight">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-2xl lg:text-3xl text-primary-foreground/90 mb-4 md:mb-6 text-pretty">
                  {slide.subtitle}
                </p>

                {/* Description */}
                <p className="text-base md:text-xl text-primary-foreground/80 mb-6 md:mb-8">
                  {slide.description}
                </p>

                {/* Features */}
                {slide.features && (
                  <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    {slide.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-primary-foreground/90"
                      >
                        {feature.icon && (
                          <feature.icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-accent" />
                        )}
                        {!feature.icon && (
                          <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                        )}
                        <span className="text-sm md:text-base lg:text-lg">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Section */}
                {slide.cta && (
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-2 text-primary-foreground">
                      <Clock className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                      <span className="text-lg md:text-xl font-semibold">
                        Abiertos 24/7
                      </span>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <p className="text-xl md:text-2xl font-bold text-accent uppercase tracking-wide">
                        Reservaciones
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        <a
                          className="flex items-center justify-center gap-3 bg-blue hover:bg-blue/90 text-blue-foreground px-4 py-3 md:px-6 md:py-4 rounded-lg transition-colors shadow-lg"
                          href="tel:084383204"
                        >
                          <Phone className="w-4 h-4 md:w-5 md:h-5" />
                          <span className="text-base md:text-lg font-semibold">
                            505 8438 3204
                          </span>
                        </a>

                        <a
                          className="flex items-center justify-center gap-3 bg-blue hover:bg-blue/90 text-blue-foreground px-4 py-3 md:px-6 md:py-4 rounded-lg transition-colors shadow-lg"
                          href="tel:086477819"
                        >
                          <Phone className="w-4 h-4 md:w-5 md:h-5" />
                          <span className="text-base md:text-lg font-semibold">
                            505 647 7819
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        aria-label="Previous slide"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-primary-foreground/10 hover:bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground p-2 md:p-3 rounded-full transition-colors z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        aria-label="Next slide"
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-primary-foreground/10 hover:bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground p-2 md:p-3 rounded-full transition-colors z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-10">
        {slides.map((_, index) => (
          <button
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all ${
              index === currentSlide
                ? 'w-8 md:w-12 h-2 md:h-3 bg-accent'
                : 'w-2 md:w-3 h-2 md:h-3 bg-primary-foreground/40 hover:bg-primary-foreground/60'
            } rounded-full`}
            key={index}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      <div className="absolute top-4 left-4 md:top-6 md:left-8 lg:top-8 z-20">
        <Image
          alt="Hotel Madroño"
          className="object-contain w-24 h-auto md:w-32 lg:w-40"
          height={50}
          src="/hotel madroño.png"
          width={150}
          priority
        />
      </div>
    </div>
  );
}
