'use client';

import Image from 'next/image';
import { MapPin, Star, Clock, Shield, Coffee, Wifi } from 'lucide-react';

const features = [
  { icon: MapPin, text: 'Ubicación céntrica y accesible' },
  { icon: Coffee, text: 'Desayuno incluidas' },
  { icon: Shield, text: 'Seguridad 24/7' },
  { icon: Wifi, text: 'Wi-Fi de alta velocidad' },
  { icon: Star, text: 'Limpieza diaria' },
  { icon: Clock, text: 'Atención 24 horas' }
];

export default function Info() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-4 md:mx-8 my-10 p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
      {/* Info Section */}
      <div className="mx-2 md:mx-6">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4">
          ¿Quiénes somos?
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-4 text-justify">
          Somos un equipo de profesionales con más de 3 años de experiencia en
          Nicaragua, especializados en el desarrollo de aplicaciones web y
          móviles. Nuestro objetivo es brinebrar soluciones tecnológicas a la
          medida de nuestros clientes, con el fin de mejorar sus procesos y
          aumentar su productividad.
        </p>
        <p className="text-slate-600 dark:text-slate-300 mb-6 text-justify">
          Nuestro equipo está conformado por profesionales altamente calificados
          en desarrollo de software, diseño gráfico, marketing digital y
          administración de proyectos.
        </p>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <h3 className="font-bold text-orange-600 dark:text-orange-500 mb-2">
              Misión
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Brindar una experiencia de reservación de alojamiento en línea
              excepcional, ofreciendo comodidad y calidad en cada etapa del
              proceso.
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <h3 className="font-bold text-orange-600 dark:text-orange-500 mb-2">
              Visión
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Convertirnos en el principal destino en línea para la reserva de
              alojamiento, superando las expectativas de nuestros clientes.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800"
              >
                <Icon className="w-4 h-4 text-orange-600 dark:text-orange-500 flex-shrink-0" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {feature.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Image Section */}
      <div className="flex items-center justify-center order-first lg:order-last">
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <Image
            src="/javascript-flatline.svg"
            alt="Hotel Madroño"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
