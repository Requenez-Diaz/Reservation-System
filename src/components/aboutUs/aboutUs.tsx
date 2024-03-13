// AboutUsComponent.tsx
import Image from 'next/image';
import React from 'react';

const AboutUsComponent = () => {
  return (
    <div className="grid grid-cols-4 gap-4 justify-center items-center gap-x-4 border mx-20 pt-4 mt-4 border-black">
      <div className="col-span-2">
        <div className="p-4 ">
          <h1 className="text-5xl font-bold">
            SIRM ES UNO DE LOS SISTEMAS MÁS COMPLETOS DEL PAÍS
          </h1>
        </div>

        <div className="p-4 ">
          <h1 className="text-xl font-bold">¿Qué ofrecemos?</h1>
          <p style={{ textAlign: 'justify' }}>
            Ofrecemos habitaciones y apartamentos en diferentes zonas de la
            ciudad de Nueva Guinea. Nuestros alojamientos están completamente
            amueblados y equipados con todo lo necesario para que nuestros
            clientes se sientan como en casa. Además, ofrecemos servicios
            adicionales como limpieza, lavandería, internet, televisión por
            cable, entre otros. Nuestro objetivo es brindar a nuestros clientes
            una experiencia única y confortable durante su estancia en Nueva
            Guienea.
          </p>
        </div>
      </div>

      <div className="col-span-2 flex justify-center items-center bg-gradient-to-tr from-blue-500 to-purple-500 ">
        <Image
          src={'/focused-working-flatline.svg'}
          alt=""
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default AboutUsComponent;
