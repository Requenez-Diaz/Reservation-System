import Image from 'next/image';
import React from 'react';

const ContainerAbout = () => {
  const items = [
    {
      title: 'Desarrollo de Software Personalizado',
      description:
        'Creamos soluciones de software adaptadas a tus necesidades específicas, garantizando funcionalidad y eficiencia.',
      image: '/javascript-flatline.svg'
    },
    {
      title: 'Diseño de Páginas Web Impactantes',
      description:
        'Diseñamos sitios web atractivos, centrados en la experiencia del usuario y optimizados para el rendimiento.',
      image: '/javascript-flatline.svg'
    },
    {
      title: 'Desarrollo de Aplicaciones Móviles Innovadoras',
      description:
        'Creamos aplicaciones móviles para Android e iOS que ofrecen una experiencia fluida y características avanzadas.',
      image: '/javascript-flatline.svg'
    }
  ];

  return (
    <div className="grid grid-rows-3 justify-center content-center shadow-lg rounded-lg p-8 gap-8">
      {items.map((item, index) => (
        <div className="grid grid-cols-2 items-center" key={index}>
          <div className="flex justify-center">
            <Image
              src={`${item.image}`}
              alt={item.title}
              height={500}
              width={500}
            />
          </div>
          <div className="">
            <h1 className="text-3xl font-bold text-black mb-4">{item.title}</h1>
            <p className="text-black">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContainerAbout;
