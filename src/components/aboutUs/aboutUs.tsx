'use client';

import Image from 'next/image';
import { Bed, Coffee, Wifi, Lock, Phone } from 'lucide-react';

const AboutUsComponent = () => {
  const features = [
    {
      icon: Bed,
      text: 'Habitaciones climatizadas',
      desc: 'Con aire acondicionado y ventilador'
    },
    {
      icon: Coffee,
      text: 'Desayuno incluido',
      desc: 'Delicioso desayuno bufé'
    },
    { icon: Wifi, text: 'Wi-Fi premium', desc: 'Conexión de alta velocidad' },
    {
      icon: Lock,
      text: 'Seguridad 24/7',
      desc: 'Cámaras y personal de vigilancia'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mx-4 md:mx-8 pt-4 md:pt-8">
      {/* Text Section */}
      <div className="p-4 md:p-6">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
          UNA DE LAS MEJORES{' '}
          <span className="text-orange-600 dark:text-orange-500">OPCIONES</span>{' '}
          EN NUEVA GUINEA
        </h1>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          ¿Qué ofrecemos?
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6 text-justify leading-relaxed">
          Ofrecemos habitaciones y apartamentos en diferentes zonas de la ciudad
          de Nueva Guinea. Nuestros alojamientos están completamente amueblados
          y equipados con todo lo necesario para que nuestros clientes se
          sientan como en casa. Además, ofrecemos servicios adicionales como
          limpieza, lavandería, internet, televisión por cable, entre otros.
          Nuestro objetivo es brindar a nuestros clientes una experiencia única
          y confortable durante su estancia.
        </p>

        {/* Features Cards */}
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl"
              >
                <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-lg">
                  <Icon className="w-5 h-5 text-orange-600 dark:text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {feature.text}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Info */}
        <div className="mt-6 p-4 bg-slate-900 dark:bg-slate-800 rounded-xl">
          <div className="flex items-center gap-2 text-white mb-2">
            <Phone className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold">Contacto directo:</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:50584383204"
              className="text-white hover:text-orange-500 font-semibold text-sm"
            >
              505 8438 3204
            </a>
            <span className="text-slate-500">|</span>
            <a
              href="tel:50586477819"
              className="text-white hover:text-orange-500 font-semibold text-sm"
            >
              505 8647 7819
            </a>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative flex items-center justify-center p-4">
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <Image
            src="/focused-working-flatline.svg"
            alt="Hotel Madroño"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUsComponent;
