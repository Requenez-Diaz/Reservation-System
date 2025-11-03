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
    if (!isAutoPlaying) return;

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
              src={slide.bgImage || '/placeholder.svg'}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <div className="max-w-3xl">
                {/* Title */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-4 text-balance leading-tight">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/90 mb-6 text-pretty">
                  {slide.subtitle}
                </p>

                {/* Description */}
                <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
                  {slide.description}
                </p>

                {/* Features */}
                {slide.features && (
                  <div className="space-y-3 mb-8">
                    {slide.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-primary-foreground/90"
                      >
                        {feature.icon && (
                          <feature.icon className="w-5 h-5 flex-shrink-0" />
                        )}
                        {!feature.icon && (
                          <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                        )}
                        <span className="text-base md:text-lg">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Section */}
                {slide.cta && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-primary-foreground">
                      <Clock className="w-6 h-6" />
                      <span className="text-xl font-semibold">
                        Abiertos 24/7
                      </span>
                    </div>

                    <div className="space-y-4">
                      <p className="text-2xl font-bold text-accent uppercase tracking-wide">
                        Reservaciones
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <a
                          href="tel:084383204"
                          className="flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-4 rounded-lg transition-colors"
                        >
                          <Phone className="w-5 h-5" />
                          <span className="text-lg font-semibold">
                            505 8438 3204
                          </span>
                        </a>

                        <a
                          href="tel:086477819"
                          className="flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-4 rounded-lg transition-colors"
                        >
                          <Phone className="w-5 h-5" />
                          <span className="text-lg font-semibold">
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
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary-foreground/10 hover:bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground p-3 rounded-full transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary-foreground/10 hover:bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground p-3 rounded-full transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-12 h-3 bg-accent'
                : 'w-3 h-3 bg-primary-foreground/40 hover:bg-primary-foreground/60'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Hotel Logo/Name */}
      <div className="absolute top-8 left-4 md:left-8 z-10">
        <Image
          src="/hotel madroño.png"
          alt="Hotel Madroño"
          width={150}
          height={50}
          className="object-contain"
        />
      </div>
    </div>
  );
}
