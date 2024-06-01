import React from 'react';

import { CalendarForm } from '../cardsSearchRooms/calendar';

import { Input } from '@/components/ui/input';
import { SelectsRooms } from './selectsRooms';
import Link from 'next/link';

const BookingsForms: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-white w-full p-4 flex flex-col items-center rounded-xl border border-t-1 shadow-2xl">
        <div className="text-black text-center">
          <h1 className="font-bold text-2xl">Selecciona una habitación</h1>
          <p>Descubre el mejor lugar para ti!!</p>
        </div>

        <div className="mt-4 w-full flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-full mb-4 md:mb-0 flex flex-col md:flex-row justify-center md:justify-between items-center p-2 rounded-lg">
            <div className="w-full md:w-1/3 mb-4 md:mb-0 mr-4">
              <Input
                type="text"
                placeholder="Ingresa tu destino"
                className="w-full"
              />
            </div>

            <div className="w-full md:w-1/3 mb-4 md:mb-0 mr-4">
              <div className="flex items-center justify-center">
                <CalendarForm />
              </div>
            </div>

            <div className="w-full md:w-1/3 mb-4 md:mb-0 mr-4">
              <div className="flex items-center justify-center">
                <CalendarForm />
              </div>
            </div>
            <div className="w-full md:w-1/3 mb-4 md:mb-0 mr-4">
              <div className="flex items-center justify-center">
                <SelectsRooms />
              </div>
            </div>

            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <button className="bg-primary-foreground hover:bg-gray-400 border text-black rounded-lg p-2 w-full">
                <Link href="/habitaciones">Buscar</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsForms;
