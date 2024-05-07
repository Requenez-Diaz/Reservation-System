import React from 'react';
import CardService from './cardsServices';

const CardDescriptions = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-white w-3/3 p-4 flex flex-col items-center rounded-xl border border-t-1 shadow-2xl">
        <div className="text-black text-center">
          <h1 className="font-bold text-2xl">Descubre nuestros servicios</h1>
          <p>Descubre el mejor lugar para ti!!</p>
        </div>
        <div className="mt-4 w-full flex flex-col md:flex-row md:justify-between">
          <CardService />
        </div>
      </div>
    </div>
  );
};

export default CardDescriptions;
