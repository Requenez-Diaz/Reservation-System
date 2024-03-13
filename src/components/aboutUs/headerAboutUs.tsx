import Image from 'next/image';
import React from 'react';

const HeaderAboutUs = () => {
  return (
    <div className="relative h-96">
      <Image
        src={'/pexels-helena-lopes-2017802.jpg'}
        alt=""
        layout="fill"
        objectFit="cover"
        className=" bg-opacity-70"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-5xl font-bold text-center text-white mt-10 mb-10 animate-in">
          Sobre nosotros
        </h1>
      </div>
    </div>
  );
};

export default HeaderAboutUs;
