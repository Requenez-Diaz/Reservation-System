'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

import { useState } from 'react';
import { CalendarForm } from '../cardsSearchRooms/calendarArrival';
import { CalendarFormDeparture } from '../cardsSearchRooms/calendarDeparture';

export function CalendarPopover() {
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);

  const handleArrivalDateChange = (date: Date | null) => {
    setArrivalDate(date);
  };

  const handleDepartureDateChange = (date: Date | null) => {
    setDepartureDate(date);
  };

  const formatDateRange = (arrival: Date | null, departure: Date | null) => {
    if (arrival && departure) {
      return `${arrival.toLocaleDateString()} - ${departure.toLocaleDateString()}`;
    }
    if (arrival) {
      return `${arrival.toLocaleDateString()} - Fecha de salida`;
    }
    if (departure) {
      return `Fecha de llegada - ${departure.toLocaleDateString()}`;
    }
    return 'Fecha de llegada - Fecha de salida';
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {formatDateRange(arrivalDate, departureDate)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              Las fechas son obligatorias
            </h4>
            <p className="text-sm text-muted-foreground">
              Selecciona la fecha de llegada y salida
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-2">
              <div>
                <CalendarForm />
              </div>
              <div>
                <CalendarFormDeparture />
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
