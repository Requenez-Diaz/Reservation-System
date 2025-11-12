import Image from 'next/image';
import React from 'react';

const HeaderAboutUs = () => {
  return (
    <div className="relative h-96">
      <Image
        alt=""
        className="bg-opacity-70"
        layout="fill"
        objectFit="cover"
        src="/pexels-helena-lopes-2017802.jpg"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="animate-in mt-10 mb-10 text-5xl font-bold text-center text-white">
          Sobre nosotros
        </h1>
      </div>
    </div>
  );
};

export default HeaderAboutUs;
