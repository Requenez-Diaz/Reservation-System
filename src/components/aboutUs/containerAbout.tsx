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
    <div className="grid grid-rows-3 justify-center content-center shadow-lg rounded-lg p-2 mx-8 gap-4 mb-8">
      {items.map((item, index) => (
        <div className="grid grid-cols-2 items-center mx-4" key={index}>
          <div className="flex justify-center">
            <Image
              alt={item.title}
              className="rounded-lg shadow-lg"
              height={500}
              src={item.image}
              style={{ filter: 'drop-shadow(0 0 0.2rem #000)' }}
              width={500}
            />
          </div>
          <div className="shadow-lg shadow-slate-400">
            <h1 className="mx-4 my-4 text-3xl font-bold text-black">
              {item.title}
            </h1>
            <p className="mx-4 my-4 text-black">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContainerAbout;
