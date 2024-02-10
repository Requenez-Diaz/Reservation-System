import React from 'react';

const HabitacionesInterface = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-3xl font-bold mb-8">Nuestras Habitaciones</h2>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-8">
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <img
            src="pexels-helena-lopes-2017802.jpg"
            alt="Matrimonial"
            className="h-40 w-40 rounded-full object-cover mb-4"
          />
          <p className="text-xl font-bold">Matrimonial</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Ver más
          </button>
        </div>
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <img
            src="https://via.placeholder.com/150x150"
            alt="Uni personal"
            className="h-40 w-40 rounded-full object-cover mb-4"
          />
          <p className="text-xl font-bold">Uni personal</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Ver más
          </button>
        </div>
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <img
            src="https://via.placeholder.com/150x150"
            alt="Suite"
            className="h-40 w-40 rounded-full object-cover mb-4"
          />
          <p className="text-xl font-bold">Suite</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Ver más
          </button>
        </div>
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <img
            src="https://via.placeholder.com/150x150"
            alt="Familiar Matrimonial"
            className="h-40 w-40 rounded-full object-cover mb-4"
          />
          <p className="text-xl font-bold">Familiar Matrimonial</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitacionesInterface;
