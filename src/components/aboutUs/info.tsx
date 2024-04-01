import Image from 'next/image';
import React from 'react';

const Info = () => {
  return (
    <div className="grid grid-cols-2 gap-x-4 mx-5 my-10 content-center justify-center p-6 bg-white shadow-lg ">
      <div className="mx-10 ">
        <h1 className="text-2xl font-bold text-center mb-4">Quienes somos?</h1>
        <p className="text-black-400 mb-4 text-justify">
          Somos un equipo de profesionales con más de 3 años de experiencia en
          Nicaragua, desarrolladores de software, especializados en el
          desarrollo de aplicaciones web y móviles. Nuestro objetivo es brindar
          soluciones tecnológicas a la medida de nuestros clientes, con el fin
          de mejorar sus procesos y aumentar su productividad.
        </p>
        <p className="text-black-400 mb-4 text-justify">
          Nuestro equipo está conformado por profesionales altamente calificados
          en el desarrollo de software, diseño gráfico, marketing digital y
          administración de proyectos.
        </p>
        <div className="flex flex-row mb-4">
          <div className="mr-4">
            <h1 className="font-bold mt-4">Mision</h1>
            <p className="text-justify">
            En SIRM, nuestra misión es proporcionar a nuestros clientes una experiencia
            de reservación de alojamiento en línea excepcional, ofreciendo una amplia
            selección de habitaciones y apartamentos en la ciudad de Nueva Guinea. Nos
            comprometemos a brindar comodidad, conveniencia y calidad en cada etapa del
            proceso de reserva, asegurando que nuestros clientes encuentren el alojamiento
            perfecto para sus necesidades y disfruten de una estancia inolvidable.
            </p>
          </div>
          <div>
            <h1 className="font-bold mt-4">Vision</h1>
            <p className="text-justify">
            Nuestra visión en SIRM es convertirnos en el principal destino en línea para
            la reserva de alojamiento en la ciudad de Nueva Guinea, reconocidos por nuestra
            dedicación a la excelencia en el servicio al cliente, la innovación tecnológica
            y la oferta de una experiencia de hospedaje incomparable. Nos esforzamos por ser
            líderes en la industria hotelera en línea, superando las expectativas de nuestros
            clientes y estableciendo nuevos estándares de calidad y conveniencia en el sector.
            </p>
          </div>
        </div>
      </div>

      <div
        className="animate-in bg-slate-600 flex items-center justify-center bg-gradient-to-tr from-blue-500 to-purple-500 rounded-r-3xl shadow-lg"
        style={{ margin: '0 auto', clipPath: 'circle(50% at 40% 50%)' }}
      >
        <Image
          src={'/javascript-flatline.svg'}
          alt=""
          width={600}
          height={600}
        />
      </div>
    </div>
  );
};

export default Info;
