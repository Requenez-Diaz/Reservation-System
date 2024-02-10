import React from 'react';

const ExploreInterface = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-8">Explora tu futuro</h1>
      <p className="text-xl mb-8">
        Creamos tu mundo donde podes reservar con un solo click
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Reservar ahora
      </button>
    </div>
  );
};

export default ExploreInterface;
