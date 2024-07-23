'use client';
import { saveBookings } from '@/app/actions/bookings/booking';
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
    departureDate: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveBookings(new FormData(e.currentTarget));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded"
          variant="outline"
        >
          Reservar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Selecciona tu habitación</DialogTitle>
          <DialogDescription>
            Por favor, selecciona la habitación que deseas reservar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
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
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="rooms">
                Cantidad de habitaciones
              </Label>
              <Input
                className="col-span-3"
                id="rooms"
                type="number"
                value={formData.rooms}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="arrivalDate">
                Fecha de llegada
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
                Fecha de salida
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
          </div>
          <DialogFooter>
            <Button className="bg-blue-600" type="submit">
              Confirmar
            </Button>
            <Button variant="destructive">Cancelar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
