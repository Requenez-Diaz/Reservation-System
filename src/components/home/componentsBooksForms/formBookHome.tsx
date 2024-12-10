'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, MapPin, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

const roomTypes = [
  'Habitación Individual',
  'Habitación Doble',
  'Suite',
  'Apartamento',
  'Villa'
];

export default function SearchForm() {
  const [date, setDate] = React.useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined
  });
  const [open, setOpen] = React.useState(false);
  const [roomType, setRoomType] = React.useState('');
  const [guests, setGuests] = React.useState(1);

  return (
    <div className="min-h-[200px] w-full bg-gradient-to-b from-primary/10 to-background p-8">
      <Card className="mx-auto max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold tracking-tight">
            ¿Qué quieres buscar?
          </CardTitle>
          <CardDescription className="text-lg">
            Descubre el mejor lugar para ti!!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-[1fr,1fr,auto,auto] md:items-center">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="justify-between text-muted-foreground"
                >
                  <MapPin className="mr-2 h-4 w-4 shrink-0" />
                  {roomType || 'Selecciona tipo de habitación'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Buscar tipo de habitación..." />
                  <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                  <CommandGroup>
                    {roomTypes.map((type) => (
                      <CommandItem
                        key={type}
                        value={type}
                        onSelect={(currentValue) => {
                          setRoomType(currentValue);
                          setOpen(false);
                        }}
                      >
                        {type}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'justify-between text-left text-muted-foreground',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'dd/MM/y', { locale: es })} -{' '}
                        {format(date.to, 'dd/MM/y', { locale: es })}
                      </>
                    ) : (
                      format(date.from, 'dd/MM/y', { locale: es })
                    )
                  ) : (
                    'Selecciona fechas'
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(range) =>
                    setDate({ from: range?.from, to: range?.to })
                  }
                  numberOfMonths={2}
                  locale={es}
                />
              </PopoverContent>
            </Popover>

            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
              >
                -
              </Button>
              <div className="flex items-center gap-2 px-4">
                <Users className="h-4 w-4" />
                <span>{guests}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => setGuests((prev) => prev + 1)}
              >
                +
              </Button>
            </div>

            <Button className="" variant={'success'}>
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
