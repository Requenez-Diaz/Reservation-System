'use client';
import React from 'react';
import { User } from 'lucide-react';

import { CalendarForm } from './cards/calendar';
import { PopoverForms } from './cards/popover';

const PropsHome: React.FC = () => {

  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-white w-2/3 p-4 flex flex-col items-center rounded-xl border border-t-1 shadow-2xl">
        <div className="text-black text-center">
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
             
      </div>
    </div>
  );
};

export default PropsHome;
