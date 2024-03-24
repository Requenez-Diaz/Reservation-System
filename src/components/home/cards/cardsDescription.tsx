import React from 'react';
import Cards from './cardsServices';

const CardDescriptions = () => {
  return (
    <div className="bg-white  p-3 m-4 rounded-3xl shadow-2xl shadow-slate-300 ">
      <div className="flex flex-col justify-center content-center items-center">
        <h1 className="text-4xl font-bold text-black mb-4">
          Aprovecha de los increíbles Servicios
        </h1>
        <p className="text-gray-700 text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          voluptatibus.
        </p>
      </div>
      <Cards />
    </div>
  );
};

export default CardDescriptions;
