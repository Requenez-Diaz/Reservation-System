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
              Nuestra misión es brindar soluciones tecnológicas innovadoras y de
              calidad, que permitan a nuestros clientes mejorar sus procesos y
              aumentar su productividad.
            </p>
          </div>
          <div>
            <h1 className="font-bold mt-4">Vision</h1>
            <p className="text-justify">
              Nuestra visión es ser una empresa líder en el desarrollo de
              software, diseño gráfico y marketing digital en Nicaragua, con el
              fin de brindar soluciones tecnológicas innovadoras y de calidad a
              nuestros clientes.
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
