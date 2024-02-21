// 'use client';

import { CalendarIcon, User } from 'lucide-react';
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropsHomeProps {
  date: string;
  peoples: string;
}

const PropsHome = () => {
  return (
    <div className="bg-blue-400 w-3/4 p-2 m-4 flex flex-col mx-auto content-center rounded-xl shadow-2xl shadow-black">
      <div className="text-white text-center">
        <h1 className="font-bold">Selecciona una habitacion</h1>
        <p>Descubre el mejor lugar para ti!!</p>
      </div>

      <div className="mt-4">
        <div className="flex flex-row m-2 justify-between items-center">
          <div>
            <h2>Fecha</h2>
            <div className="flex flex-row m-2 justify-between items-center content-center bg-gray-300 p-2 rounded-lg">
              <p className="mb-auto mr-4">Seleccionar Fecha</p>
              <CalendarIcon className="my-auto" />
            </div>
          </div>

          <div>
            <h2 className="text-white">Personas</h2>
            <div className="flex flex-row m-2 justify-between items-center content-center bg-gray-300  p-2 rounded-lg">
              <div className="flex items-center">
                <User className="mr-2" />
                <p className="mb-auto mr-4">Adultos</p>
              </div>
              <ChevronDown />
              <div className="flex items-center">
                <User className="mr-2" />
                <p className="mb-auto">Niños</p>
              </div>
              <ChevronDown />
            </div>
          </div>

          <div>
            <Button className="bg-blue-700  hover:bg-black">
              Buscar Habitacion
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropsHome;
