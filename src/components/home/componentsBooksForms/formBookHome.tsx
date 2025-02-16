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
import { Input } from '@/components/ui/input';
import { getAllBedrooms } from '@/app/actions/get-bedrooms';

const roomTypes = [
  'Habitación Individual',
  'Habitación Doble',
  'Suite',
  'Apartamento',
  'Villa'
];

export default function BedroomSearch() {
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
  const [searchTerm, setSearchTerm] = React.useState('');
  const [bedrooms, setBedrooms] = React.useState([]);

  const filteredRoomTypes = React.useMemo(() => {
    return roomTypes.filter((type) =>
      type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  React.useEffect(() => {
    getAllBedrooms().then((bedrooms) => setBedrooms(bedrooms));
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-primary/10 to-background p-8">
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
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar tipo de habitación"
                  className="pl-9"
                />
              </div>

              <PopoverContent className="p-0">
                <Command>
                  <CommandInput
                    placeholder="Buscar tipo de habitación..."
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                  />
                  <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                  <CommandGroup>
                    {filteredRoomTypes.map((type) => (
                      <CommandItem
                        key={type}
                        value={type}
                        onSelect={(currentValue) => {
                          setRoomType(currentValue);
                          setSearchTerm('');
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

            <Button className="" variant={'success'} >
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      {bedrooms.length > 0 && (
        <Card className="mx-auto max-w-4xl mt-8">
          <CardHeader>
            <CardTitle>Resultados de la búsqueda</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {bedrooms.map((bedroom: any) => (
                <li key={bedroom.id} className="border-b pb-4">
                  <h3 className="text-lg font-semibold">{bedroom.type}</h3>
                  <p>Capacidad: {bedroom.capacity} personas</p>
                  <p>Precio: ${bedroom.price} por noche</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
