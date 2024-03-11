import React from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CalendarForm } from './cards/calendar';
import { PopoverForms } from './cards/popover';

const PropsHome = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-gray-400 w-2/3 p-4 flex flex-col items-center rounded-xl shadow-2xl">
        <div className="text-white text-center">
          <h1 className="font-bold text-2xl">Selecciona una habitación</h1>
          <p>Descubre el mejor lugar para ti!!</p>
        </div>

        <div className="mt-4 w-full flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-2/3 mb-4 md:mb-0 flex flex-col md:flex-row justify-center md:justify-between items-center p-2 rounded-lgml-8">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <div className="flex items-center justify-center">
                <CalendarForm />
              </div>
            </div>
            <div className="flex items-center mb-2 md:mb-0 ml-8">
              <User className="mr-1 " />
              <p className="mb-0 mr-7 md:ml-4">Adultos</p>
              <PopoverForms />
            </div>
            <div className="flex items-center ml-8">
              <User className="mr-1" />
              <p className="mb-0 mr-7 md:ml-4">Niños</p>
              <PopoverForms />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex justify-center mt-4 md:mt-0 mx-auto">
          <Button className="bg-blue-700 hover:bg-black">
            Buscar Habitación
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropsHome;
