import Image from 'next/image';
import { Building2, Calendar, Clock, MapPin } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative flex h-[70vh] items-center justify-center overflow-hidden">
        <Image
          alt="Minimalist hotel interior"
          className="object-cover brightness-75"
          fill
          priority
          src="https://josecamachofotografia.com/wp-content/uploads/2023/08/fotografo-hoteles-piscina-vista-frontal.jpg"
        />
        <div className="relative z-10 px-4 text-center">
          <h1 className="mb-4 text-4xl font-light text-white md:text-6xl">
            Simplicidad y Elegancia en la Reserva de Alojamiento
          </h1>
          <p className="mx-auto max-w-xl text-xl text-white/90">
            Encuentra la habitación perfecta para tu estancia en Nueva Guinea
            con ReserveSimple. Con una amplia selección de alojamientos y una
            experiencia de reserva sencilla, estamos aquí para hacer que tu
            viaje sea inolvidable.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-8 text-3xl font-light">Nuestra Misión</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            En SIRM, nuestra misión es proporcionar a nuestros clientes una
            experiencia de reservación de alojamiento en línea excepcional,
            ofreciendo una amplia selección de habitaciones y apartamentos en la
            ciudad de Nueva Guinea. Nos comprometemos a brindar comodidad,
            conveniencia y calidad en cada etapa del proceso de reserva,
            asegurando que nuestros clientes encuentren el alojamiento perfecto
            para sus necesidades y disfruten de una estancia inolvidable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {[
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
                'Encuentra el alojamiento perfecto para tus necesidades con nuestra amplia selección de habitaciones y apartamentos.',
              icon: MapPin,
              title: 'Experiencias Personalizadas'
            }
          ].map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                <feature.icon className="h-7 w-7 text-neutral-700" />
              </div>
              <h3 className="mb-2 text-xl font-medium">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mb-16 text-center">
          <h2 className="mb-12 text-3xl font-light">Nuestro Equipo</h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: 'Avimilex Requenez', role: 'Desarrollador' },
              { name: 'Elliam Sanchez', role: 'Desarrollador' },
              { name: 'Sophie Chen', role: 'CTO' }
            ].map((member, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="mb-4 h-40 w-40 overflow-hidden rounded-full">
                  <Image
                    alt={`${member.name} - ${member.role}`}
                    className="object-cover"
                    height={160}
                    src="https://josecamachofotografia.com/wp-content/uploads/2023/08/fotografo-hoteles-piscina-vista-frontal.jpg"
                    width={160}
                  />
                </div>
                <h3 className="text-xl font-medium">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-neutral-50 px-4 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-12 text-3xl font-light">Visítanos</h2>

          <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
            {[
              {
                icon: Building2,
                lines: ['Zona #8', 'Nueva Guinea'],
                title: 'Dirección de la Oficina'
              },
              {
                icon: MapPin,
                lines: ['alfredorequenez57libra@gmail.com', '+505 8646-9676'],
                title: 'Contacto'
              }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                  <item.icon className="h-7 w-7 text-neutral-700" />
                </div>
                <h3 className="mb-2 text-xl font-medium">{item.title}</h3>
                {item.lines.map((line, lineIdx) => (
                  <p key={lineIdx} className="text-muted-foreground">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
