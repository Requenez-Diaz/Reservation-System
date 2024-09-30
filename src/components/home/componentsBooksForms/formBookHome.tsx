import React from 'react';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CalendarPopover } from './calendarsPopover';
import { SelectsRooms } from './selectsRooms';
export default function BookingsFormsHome() {
  return (
    <div className="flex justify-center items-center p-4 min-h-[40vh]">
      <div className="bg-white w-full max-w-8xl p-6 rounded-xl border shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="font-bold text-2xl md:text-3xl text-primary">
            ¿Qué quieres buscar?
          </h1>
          <p className="text-muted-foreground mt-2">
            Descubre el mejor lugar para ti!!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Ingresa tu destino"
                className="pl-10 w-full"
                defaultValue="Madroño"
              />
            </div>
          </div>
          <div className="lg:col-span-2">
            <CalendarPopover />
          </div>
          <div className="lg:col-span-1">
            <SelectsRooms />
          </div>
          <div className="lg:col-span-1">
            <Button asChild className="w-full">
              <Link href="/habitaciones">Buscar</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
