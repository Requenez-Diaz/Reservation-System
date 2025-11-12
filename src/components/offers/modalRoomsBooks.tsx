'use client';

import type React from 'react';

import { useState } from 'react';
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
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export function ModalBookRooms() {
  const [open, setOpen] = useState(false);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState('1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ checkIn, checkOut, guests });
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="default">Reservar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reservar habitación</DialogTitle>
          <DialogDescription>
            Complete los detalles para reservar su estancia. Haga clic en
            reservar cuando esté listo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="checkin">Fecha de llegada</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className={cn(
                      // CORREGIDO (Línea 48)
                      'w-full justify-start text-left font-normal',
                      !checkIn && 'text-muted-foreground'
                    )}
                    id="checkin"
                    variant={'outline'}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn
                      ? format(checkIn, 'PPP', { locale: es })
                      : 'Seleccionar fecha'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    initialFocus
                    mode="single"
                    onSelect={setCheckIn}
                    selected={checkIn}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="checkout">Fecha de salida</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className={cn(
                      // CORREGIDO (Línea 84)
                      'w-full justify-start text-left font-normal',
                      !checkOut && 'text-muted-foreground'
                    )}
                    id="checkout" // CORREGIDO (Línea 85)
                    variant={'outline'}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut
                      ? format(checkOut, 'PPP', { locale: es })
                      : 'Seleccionar fecha'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    initialFocus
                    mode="single"
                    onSelect={setCheckOut}
                    selected={checkOut}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="guests">Número de huéspedes</Label>
              <Select onValueChange={setGuests} value={guests}>
                {' '}
                {/* CORREGIDO (Línea 97) */}
                <SelectTrigger id="guests">
                  <SelectValue placeholder="Seleccionar huéspedes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 persona</SelectItem>
                  <SelectItem value="2">2 personas</SelectItem>
                  <SelectItem value="3">3 personas</SelectItem>
                  <SelectItem value="4">4 personas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" variant={'success'}>
              {' '}
              {/* CORREGIDO (Línea 120) */}
              Confirmar reserva
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
