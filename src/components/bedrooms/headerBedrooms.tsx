import Image from 'next/image';
import React from 'react';

function HeaderBedrooms() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <Image
        src={'/pexels-helena-lopes-2017802.jpg'}
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="absolute inset-0 z-0"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-white text-4xl text-center font-bold mb-8 transition-transform transform hover:scale-105">
          Nuestras Habitaciones
        </h1>
      </div>
    </div>
  );  
}

export default HeaderBedrooms;
