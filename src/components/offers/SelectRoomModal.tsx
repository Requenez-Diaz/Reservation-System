'use client';

import { saveBookings } from '@/app/actions/bookings/booking';
import { bedroomsTypes } from '@/components/bedroomstype/bedroomsType';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export function SelectRoomModal() {
  const [formData, setFormData] = useState({
    guests: '',
    rooms: '',
    arrivalDate: '',
    departureDate: '',
    roomType: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    if (['guests', 'rooms'].includes(id) && parseInt(value) < 0) return;

    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { arrivalDate, departureDate } = formData;
    if (new Date(arrivalDate) >= new Date(departureDate)) {
      alert('La fecha de salida debe ser posterior a la fecha de llegada.');
      return;
    }

    await saveBookings(new FormData(e.currentTarget));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Reservar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader>
          <DialogTitle>Selecciona tu habitación</DialogTitle>
          <DialogDescription>
            Completa la información a continuación para reservar tu habitación.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="guests">
              Personas
            </Label>
            <Input
              className="col-span-3"
              id="guests"
              type="number"
              value={formData.guests}
              onChange={handleInputChange}
              min="1"
              placeholder="Número de personas"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="rooms">
              Habitaciones
            </Label>
            <Input
              className="col-span-3"
              id="rooms"
              type="number"
              value={formData.rooms}
              onChange={handleInputChange}
              min="1"
              placeholder="Cantidad de habitaciones"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="roomType">
              Tipo de habitación
            </Label>
            <select
              className="col-span-3 border border-gray-300 rounded-lg p-2"
              id="roomType"
              value={formData.roomType}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Selecciona el tipo de habitación
              </option>
              {bedroomsTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="arrivalDate">
              Llegada
            </Label>
            <Input
              className="col-span-3"
              id="arrivalDate"
              type="date"
              value={formData.arrivalDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="departureDate">
              Salida
            </Label>
            <Input
              className="col-span-3"
              id="departureDate"
              type="date"
              value={formData.departureDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <DialogFooter className="flex justify-between pt-4">
            <Button className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" type="submit">
              Confirmar
            </Button>
            <Button variant="destructive" type="button">
              Cancelar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
