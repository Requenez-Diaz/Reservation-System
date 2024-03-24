import React from 'react';
import DescriptionAboutHotels from './descriptionAboutHotels';

export const ContainerAboutHotels = () => {
  return (
    <div className="bg-orange-500 opacity-75  p-4 mb-4 justify-center content-center">
      <div>
        <h1 className="text-3xl text-center font-bold ">
          Ventajas Exclusivas de SIRMH
        </h1>
        <h2 className="text-3xl text-center font-bold ">Hotel Madroño</h2>
      </div>
      <DescriptionAboutHotels />
    </div>
  );
};
