'use client';

import * as React from 'react';
import { Users, Calendar, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { getAllBedrooms } from '@/app/actions/get-bedrooms';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Bedroom } from '../roomsType';
import { useToast } from '@/components/ui/use-toast';
import type { DateRange } from 'react-day-picker';

interface BedroomSearchFormProps {
  onSearch: (results: Bedroom[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}

const ROOM_STATUS = [
  { value: 'all', label: 'Todas' },
  { value: 'available', label: 'Disponible' }
] as const;

export default function BedroomSearchForm({
  onSearch,
  setIsLoading,
  isLoading
}: BedroomSearchFormProps) {
  const [status, setStatus] = React.useState('all');
  const [guests, setGuests] = React.useState(1);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [bedrooms, setBedrooms] = React.useState<Bedroom[]>([]);
  const { toast } = useToast();

  React.useEffect(() => {
    const fetchBedrooms = async () => {
      try {
        const response: Bedroom[] = await getAllBedrooms();
        if (!Array.isArray(response) || response.length === 0) {
          console.error('API response is not an array or is empty');
          return;
        }
        setBedrooms(response);
      } catch (error) {
        console.error('Error fetching bedrooms:', error);
      }
    };
    fetchBedrooms();
  }, []);

  React.useEffect(() => {
    if (dateRange?.from) {
      const dateData = {
        from: dateRange.from.toISOString(),
        to: dateRange.to?.toISOString() || dateRange.from.toISOString()
      };
      localStorage.setItem('selectedDates', JSON.stringify(dateData));
      localStorage.setItem('selectedGuests', guests.toString());
      localStorage.setItem('fromSearch', 'true');
      console.log('[v0] Fechas guardadas en localStorage:', dateData);
      console.log('[v0] Personas guardadas en localStorage:', guests);
      console.log('[v0] Flag fromSearch guardada en localStorage');
    }
  }, [dateRange, guests]);

  const handleSearch = async () => {
    if (dateRange?.from && dateRange.from < new Date()) {
      toast({
        title: 'Fecha inválida',
        description: 'No puedes buscar habitaciones en fechas anteriores.',
        variant: 'destructive'
      });
      return onSearch([]);
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const results = bedrooms.filter((bedroom) => {
      const statusMatch =
        status === 'all' || (status === 'available' && bedroom.status === true);

      const capacityMatch = bedroom.capacity >= guests;

      let dateMatch = true;
      if (
        dateRange?.from &&
        bedroom.bookingsDetails &&
        bedroom.bookingsDetails.length > 0
      ) {
        const searchStart = dateRange.from;
        const searchEnd = dateRange.to || dateRange.from;

        const hasConflict = bedroom.bookingsDetails.some((booking) => {
          const bookingStart = new Date(booking.dateStart);
          const bookingEnd = booking.dateEnd
            ? new Date(booking.dateEnd)
            : bookingStart;

          // Verificar si hay solapamiento entre el rango buscado y las reservas existentes
          return (
            (searchStart >= bookingStart && searchStart <= bookingEnd) ||
            (searchEnd >= bookingStart && searchEnd <= bookingEnd) ||
            (searchStart <= bookingStart && searchEnd >= bookingEnd)
          );
        });
        dateMatch = !hasConflict;
      }

      return statusMatch && capacityMatch && dateMatch;
    });

    onSearch(results);
    setIsLoading(false);
  };

  return (
    <Card className="mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-bold tracking-tight">
          ¿Qué quieres buscar?
        </CardTitle>
        <CardDescription className="text-lg">
          Descubre el mejor lugar para ti!!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-[1fr,auto,1fr,auto] md:items-center">
          <div className="relative group">
            <CheckCircle2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary z-10 pointer-events-none" />
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="pl-9 transition-all duration-200 focus:scale-[1.02] focus:shadow-md">
                <SelectValue placeholder="Estado de habitación" />
              </SelectTrigger>
              <SelectContent>
                {ROOM_STATUS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Guests selector */}
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 transition-all duration-200 hover:scale-110 active:scale-95 bg-transparent"
              onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
            >
              -
            </Button>
            <div className="flex items-center gap-2 px-4 transition-all duration-300">
              <Users className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              <span className="font-medium tabular-nums transition-all duration-200">
                {guests}
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 transition-all duration-200 hover:scale-110 active:scale-95 bg-transparent"
              onClick={() => setGuests((prev) => prev + 1)}
            >
              +
            </Button>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="pl-9 justify-start text-left font-normal transition-all duration-200 hover:scale-[1.02] hover:shadow-md relative bg-transparent"
              >
                <Calendar className="absolute left-3 h-4 w-4 text-muted-foreground" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'dd/MM/yyyy', { locale: es })} -{' '}
                      {format(dateRange.to, 'dd/MM/yyyy', { locale: es })}
                    </>
                  ) : (
                    format(dateRange.from, 'dd/MM/yyyy', { locale: es })
                  )
                ) : (
                  <span className="text-muted-foreground">
                    Selecciona rango de fechas
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 animate-in fade-in slide-in-from-top-2 duration-200"
              align="start"
            >
              <CalendarComponent
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                initialFocus
                locale={es}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Button
            className="relative overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95 disabled:scale-100"
            variant="save"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Buscando...
              </div>
            ) : (
              'Buscar'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
