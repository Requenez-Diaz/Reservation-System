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
          className="object-cover brightness-75"
          fill
          priority
          src="https://josecamachofotografia.com/wp-content/uploads/2023/08/fotografo-hoteles-piscina-vista-frontal.jpg"
        />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-light text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            Simplicidad y Elegancia en la Reserva de Alojamiento
          </motion.h1>
          <motion.p
            animate={{ opacity: 1 }}
            className="text-xl text-white/90 max-w-xl mx-auto"
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
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div ref={ref1} className="text-center mb-16">
          <motion.h2
            animate={isInView1 ? { opacity: 1 } : { opacity: 0 }}
            className="text-3xl font-light mb-8"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nuestra Misión
          </motion.h2>
          <motion.p
            animate={isInView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20"
        >
          {[
            {
              icon: Calendar,
              title: 'Proceso de Reserva Sencillo',
              description:
                'Reserva tu alojamiento en solo unos clics con nuestro proceso de reserva sencillo y seguro.',
              delay: 0.1
            },
            {
              icon: Clock,
              title: 'Actualizaciones en Tiempo Real',
              description:
                'Siempre ve el estado de la habitación más actualizado con actualizaciones en vivo.',
              delay: 0.2
            },
            {
              icon: Users,
              title: 'Experiencias Personalizadas',
              description:
                'Encuentra el alojamiento perfecto para tus necesidades con nuestra amplia selección de habitaciones y apartamentos.',
              delay: 0.3
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              animate={isInView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: feature.delay, duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-neutral-700" />
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <div ref={ref3} className="text-center mb-16">
          <motion.h2
            animate={isInView3 ? { opacity: 1 } : { opacity: 0 }}
            className="text-3xl font-light mb-12"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nuestro Equipo
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Avimilex Requenez', role: 'Desarrollador' },
              { name: 'Elliam Sanchez', role: 'Desarrollador' },
              { name: 'Sophie Chen', role: 'CTO' }
            ].map((member, idx) => (
              <motion.div
                key={idx}
                animate={
                  isInView3
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.1 + idx * 0.1, duration: 0.5 }}
              >
                <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
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
      <section className="py-16 px-4 bg-neutral-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-12">Visítanos</h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {[
              {
                icon: Building2,
                title: 'Dirección de la Oficina',
                lines: ['Zona #8', 'Nueva Guinea'],
                delay: 0
              },
              {
                icon: MapPin,
                title: 'Contacto',
                lines: ['alfredorequenez57libra@gmail.com', '+505 8646-9676'],
                delay: 0.2
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                transition={{ delay: item.delay, duration: 0.6 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1 }}
              >
                <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-neutral-700" />
                </div>
                <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                {item.lines.map((line, lineIdx) => (
                  <p key={lineIdx} className="text-muted-foreground">
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
