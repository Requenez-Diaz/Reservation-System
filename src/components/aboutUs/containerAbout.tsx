'use client';

import Image from 'next/image';

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
      title: 'Desarrollo de Aplicaciones Móviles',
      description:
        'Creamos aplicaciones móviles para Android e iOS que ofrecen una experiencia fluida y características avanzadas.',
      image: '/javascript-flatline.svg'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mx-4 md:mx-8 mb-8">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div className="relative h-40 md:h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Image
              alt={item.title}
              className="p-4 object-contain"
              src={item.image}
              fill
            />
          </div>
          <div className="p-4 md:p-6">
            <h1 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">
              {item.title}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContainerAbout;
