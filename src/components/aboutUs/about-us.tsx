'use client';

import Image from 'next/image';
import {
  Building2,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  Bed,
  Wifi,
  Coffee
} from 'lucide-react';

const team = [
  {
    name: 'Alfredo Requenez',
    role: 'Desarrollador',
    image: '/AVIMILEX.jpeg'
  },
  {
    name: 'Elliam Sanchez',
    role: 'Desarrollador',
    image: '/sanchez.jpg'
  },
  {
    name: 'Johana Baez',
    role: 'Documentación',
    image: '/baez.jpeg'
  }
];

const features = [
  {
    description:
      'Reserva tu alojamiento en solo unos clics con nuestro proceso de reserva sencillo y seguro.',
    icon: Calendar,
    title: 'Proceso de Reserva Sencillo'
  },
  {
    description:
      'Siempre ve el estado de la habitación más actualizado con actualizaciones en vivo.',
    icon: Clock,
    title: 'Actualizaciones en Tiempo Real'
  },
  {
    description:
      'Encuentra el alojamiento perfecto para tus necesidades con nuestra amplia selección.',
    icon: MapPin,
    title: 'Experiencias Personalizadas'
  }
];

const services = [
  { icon: Bed, text: 'Habitaciones Climatizadas' },
  { icon: Wifi, text: 'Wi-Fi' },
  { icon: Coffee, text: 'Desayuno' },
  { icon: Star, text: 'Limpieza Diaria' }
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative flex h-[60vh] md:h-[70vh] items-center justify-center overflow-hidden">
        <Image
          alt="Hotel Madroño"
          className="object-cover brightness-50 dark:brightness-30"
          fill
          priority
          src="https://josecamachofotografia.com/wp-content/uploads/2023/08/fotografo-hoteles-piscina-vista-frontal.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />

        <div className="relative z-10 px-4 text-center max-w-4xl">
          <h1 className="mb-4 text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Simplicidad y Elegancia en la Reserva de Alojamiento
          </h1>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-white/90 font-medium">
            Encuentra la habitación perfecta para tu estancia en Nueva Guinea.
            Tu comodidad es nuestra prioridad.
          </p>
        </div>
      </section>

      {/* Services Strip */}
      <div className="bg-orange-600 dark:bg-orange-700 py-6 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-2 text-white"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-semibold">{service.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="mx-auto max-w-5xl px-4 py-16 md:py-20">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="mb-4 text-2xl md:text-4xl font-black text-slate-900 dark:text-white">
            Nuestra Misión
          </h2>
          <p className="mx-auto max-w-3xl text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Brindar a nuestros clientes una experiencia de reservación de
            alojamiento en línea excepcional, ofreciendo una amplia selección de
            habitaciones y apartamentos en la ciudad de Nueva Guinea. Nos
            comprometemos a brindar comodidad, conveniencia y calidad en cada
            etapa del proceso de reserva.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/40">
                  <Icon className="h-6 w-6 text-orange-600 dark:text-orange-500" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Team Section */}
        <div className="mb-12 text-center">
          <h2 className="mb-6 text-2xl md:text-4xl font-black text-slate-900 dark:text-white">
            Nuestro Equipo
          </h2>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            Profesionales dedicados a hacer tu estancia inolvidable
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800"
              >
                <div className="mb-4 h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <Image
                    alt={`${member.name} - ${member.role}`}
                    className="h-full w-full object-cover"
                    src={member.image || '/hotel madroño.png'}
                    width={160}
                    height={160}
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-orange-600 dark:text-orange-500 font-semibold">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white dark:bg-slate-900 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-2xl md:text-4xl font-black text-slate-900 dark:text-white">
            Visítanos
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col items-center p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/40">
                <Building2 className="h-6 w-6 text-orange-600 dark:text-orange-500" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                Dirección
              </h3>
              <p className="text-slate-600 dark:text-slate-400">Zona #8</p>
              <p className="text-slate-600 dark:text-slate-400">
                Nueva Guinea, Nicaragua
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/40">
                <MapPin className="h-6 w-6 text-orange-600 dark:text-orange-500" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                Contacto
              </h3>
              <a
                href="mailto:alfredorequenez57libra@gmail.com"
                className="text-slate-600 dark:text-slate-400 hover:text-orange-600 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                alfredorequenez57libra@gmail.com
              </a>
              <a
                href="tel:50586469676"
                className="text-slate-600 dark:text-slate-400 hover:text-orange-600 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                505 8646-9676
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
