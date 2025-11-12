'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Building2, Calendar, Clock, MapPin, Users } from 'lucide-react';

export default function AboutUsComponent() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const isInView1 = useInView(ref1, { once: true });
  const isInView2 = useInView(ref2, { once: true });
  const isInView3 = useInView(ref3, { once: true });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          alt="Minimalist hotel interior"
          className="brightness-75 object-cover"
          fill
          priority
          src="https://josecamachofotografia.com/wp-content/uploads/2023/08/fotografo-hoteles-piscina-vista-frontal.jpg"
        />
        <div className="relative z-10 px-4 text-center">
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-light md:text-6xl text-white"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            Simplicidad y Elegancia en la Reserva de Alojamiento
          </motion.h1>
          <motion.p
            animate={{ opacity: 1 }}
            className="max-w-xl mx-auto text-xl text-white/90"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Encuentra la habitación perfecta para tu estancia en Nueva Guinea
            con ReserveSimple. Con una amplia selección de alojamientos y una
            experiencia de reserva sencilla, estamos aquí para hacer que tu
            viaje sea inolvidable.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-5xl mx-auto py-20 px-4">
        <div ref={ref1} className="mb-16 text-center">
          <motion.h2
            animate={isInView1 ? { opacity: 1 } : { opacity: 0 }}
            className="mb-8 text-3xl font-light"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nuestra Misión
          </motion.h2>
          <motion.p
            animate={isInView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            className="mx-auto max-w-3xl leading-relaxed text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            En SIRM, nuestra misión es proporcionar a nuestros clientes una
            experiencia de reservación de alojamiento en línea excepcional,
            ofreciendo una amplia selección de habitaciones y apartamentos en la
            ciudad de Nueva Guinea. Nos comprometemos a brindar comodidad,
            conveniencia y calidad en cada etapa del proceso de reserva,
            asegurando que nuestros clientes encuentren el alojamiento perfecto
            para sus necesidades y disfruten de una estancia inolvidable.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div
          ref={ref2}
          className="mb-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              delay: 0.1,
              description:
                'Reserva tu alojamiento en solo unos clics con nuestro proceso de reserva sencillo y seguro.',
              icon: Calendar,
              title: 'Proceso de Reserva Sencillo'
            },
            {
              delay: 0.2,
              description:
                'Siempre ve el estado de la habitación más actualizado con actualizaciones en vivo.',
              icon: Clock,
              title: 'Actualizaciones en Tiempo Real'
            },
            {
              delay: 0.3,
              description:
                'Encuentra el alojamiento perfecto para tus necesidades con nuestra amplia selección de habitaciones y apartamentos.',
              icon: Users,
              title: 'Experiencias Personalizadas'
            }
          ].map((feature, idx) => (
            <motion.div
              animate={isInView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              key={idx}
              transition={{ delay: feature.delay, duration: 0.5 }}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                <feature.icon className="h-7 w-7 text-neutral-700" />
              </div>
              <h3 className="mb-2 text-xl font-medium">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <div ref={ref3} className="mb-16 text-center">
          <motion.h2
            animate={isInView3 ? { opacity: 1 } : { opacity: 0 }}
            className="mb-12 text-3xl font-light"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nuestro Equipo
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: 'Avimilex Requenez', role: 'Desarrollador' },
              { name: 'Elliam Sanchez', role: 'Desarrollador' },
              { name: 'Sophie Chen', role: 'CTO' }
            ].map((member, idx) => (
              <motion.div
                animate={
                  isInView3
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                key={idx}
                transition={{ delay: 0.1 + idx * 0.1, duration: 0.5 }}
              >
                <div className="mb-4 h-40 w-40 overflow-hidden rounded-full">
                  <Image
                    alt="Team member"
                    className="object-cover"
                    height={160}
                    src="https://josecamachofotografia.com/wp-content/uploads/2023/08/fotografo-hoteles-piscina-vista-frontal.jpg"
                    width={160}
                  />
                </div>
                <h3 className="text-xl font-medium">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-neutral-50 py-16 px-4">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-12 text-3xl font-light">Visítanos</h2>

          <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
            {[
              {
                delay: 0,
                icon: Building2,
                lines: ['Zona #8', 'Nueva Guinea'],
                title: 'Dirección de la Oficina'
              },
              {
                delay: 0.2,
                icon: MapPin,
                lines: ['alfredorequenez57libra@gmail.com', '+505 8646-9676'],
                title: 'Contacto'
              }
            ].map((item, idx) => (
              <motion.div
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                key={idx}
                transition={{ delay: item.delay, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                  <item.icon className="h-7 w-7 text-neutral-700" />
                </div>
                <h3 className="mb-2 text-xl font-medium">{item.title}</h3>
                {item.lines.map((line, lineIdx) => (
                  <p className="text-muted-foreground" key={lineIdx}>
                    {line}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
