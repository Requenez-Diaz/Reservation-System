import React from 'react';

import { CalendarPopover } from './calendarsPopover';
import { Input } from '@/components/ui/input';
import { SelectsRooms } from './selectsRooms';
import Link from 'next/link';

const BookingsFormsHome: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-white w-full p-4 rounded-xl border shadow-2xl">
        <div className="text-black text-center mb-4">
          <h1 className="font-bold text-2xl">Selecciona una habitación</h1>
          <p>Descubre el mejor lugar para ti!!</p>
        </div>

        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-2">
            <Input
              type="text"
              placeholder="Ingresa tu destino"
              className="w-full"
              value="Madroño"
            />
          </div>

          <div className="col-span-2">
            <CalendarPopover />
          </div>

          <div className="col-span-1">
            <SelectsRooms />
          </div>

          <div className="col-span-1">
            <button className="bg-primary-foreground hover:bg-gray-400 border text-black rounded-lg p-2 w-full">
              <Link href="/habitaciones">Buscar</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsFormsHome;
