'use client';

import * as React from 'react';
import { Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import type { DateRange } from 'react-day-picker';

interface Booking {
  dateStart: string | Date;
  dateEnd?: string | Date;
  status: string;
}

interface BookingFormProps {
  clientName: string;
  clientEmail: string;
  guests: number;
  dateRange: DateRange | undefined;
  capacity: number;
  bookingsDetails?: Booking[];
  onNameChange: (_name: string) => void;
  onEmailChange: (_email: string) => void;
  onGuestsChange: (_count: number) => void;
  onDateSelect: (_range: DateRange | undefined) => void;
}

export function BookingForm({
  clientName,
  clientEmail,
  guests,
  dateRange,
  capacity,
  bookingsDetails,
  onNameChange,
  onEmailChange,
  onGuestsChange,
  onDateSelect
}: BookingFormProps) {
  const parseSafeDate = React.useCallback((d: string | Date) => {
    const date = new Date(d);
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      0,
      0,
      0,
      0
    );
  }, []);

  const updateGuests = (_count: number) => {
    const validCount = Math.max(1, Math.min(capacity, _count));
    onGuestsChange(validCount);
  };

  const formatDateRange = () => {
    if (!dateRange?.from) {
      return 'Seleccionar fechas';
    }
    if (!dateRange.to) {
      return format(dateRange.from, 'dd MMM', { locale: es });
    }
    return `${format(dateRange.from, 'dd MMM', { locale: es })} - ${format(dateRange.to, 'dd MMM', { locale: es })}`;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 underline decoration-teal-500 underline-offset-4">
          <User className="h-4 w-4 text-teal-600 dark:text-teal-400" /> Tus
          Datos
        </h3>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
              Nombre
            </Label>
            <Input
              value={clientName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Tu nombre completo"
              className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
              Email
            </Label>
            <Input
              type="email"
              value={clientEmail}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="tu@email.com"
              className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 underline decoration-teal-500 underline-offset-4">
          <Calendar className="h-4 w-4 text-teal-600 dark:text-teal-400" />{' '}
          Estancia
        </h3>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
              Rango de Fechas
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-xs font-bold border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  {formatDateRange()}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-white dark:bg-slate-800"
                align="start"
              >
                <CalendarComponent
                  mode="range"
                  selected={dateRange}
                  onSelect={onDateSelect}
                  numberOfMonths={2}
                  locale={es}
                  className="dark:text-slate-100"
                  styles={{
                    caption: { color: 'var(--primary)' },
                    head_cell: { color: 'var(--muted-foreground)' },
                    cell: { color: 'inherit' },
                    day: { color: 'inherit' }
                  }}
                  modifiersClassNames={{
                    selected: 'bg-orange-600 text-white hover:bg-orange-600',
                    today: 'font-bold text-orange-600 dark:text-orange-500',
                    disabled:
                      'text-slate-300 dark:text-slate-600 line-through opacity-50'
                  }}
                  disabled={(date) => {
                    const today = startOfDay(new Date());
                    const isPast = date < today;
                    const isReserved = bookingsDetails?.some((booking) => {
                      if (booking.status === 'CANCELLED') {
                        return false;
                      }
                      const bStart = parseSafeDate(booking.dateStart);
                      const bEnd = booking.dateEnd
                        ? parseSafeDate(booking.dateEnd)
                        : bStart;
                      return date >= bStart && date < bEnd;
                    });
                    return isPast || !!isReserved;
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-1.5">
            <Label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
              Huéspedes
            </Label>
            <div className="flex items-center border rounded-lg h-10 overflow-hidden border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <Button
                type="button"
                variant="ghost"
                className="h-full rounded-none px-4 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => updateGuests(guests - 1)}
                disabled={guests <= 1}
              >
                <span className="text-lg font-bold">−</span>
              </Button>
              <span className="flex-1 text-center text-sm font-bold text-slate-900 dark:text-slate-100">
                {guests}
              </span>
              <Button
                type="button"
                variant="ghost"
                className="h-full rounded-none px-4 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => updateGuests(guests + 1)}
                disabled={guests >= capacity}
              >
                <span className="text-lg font-bold">+</span>
              </Button>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">
              Máximo {capacity} huéspedes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
