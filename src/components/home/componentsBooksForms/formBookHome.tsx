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
// Suponiendo que esta es tu acción de servidor
import { getAllBedrooms } from '@/app/actions/get-bedrooms';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Bedroom } from '../roomsType';
import { useToast } from '@/components/ui/use-toast';
import type { DateRange } from 'react-day-picker';

interface BedroomSearchFormProps {
  onSearch: (_results: Bedroom[]) => void;
  setIsLoading: (_isLoading: boolean) => void;
  isLoading: boolean;
}

const ROOM_STATUS = [
  { value: 'all', label: 'Todas' },
  { value: 'available', label: 'Disponible' }
] as const;

export default function BedroomSearchForm({
  onSearch,
  setIsLoading,
  isLoading // El linter lo detecta como no usado, aunque se usa en el return
}: BedroomSearchFormProps) {
  // CORREGIDO: Renombrar para evitar el error no-unused-vars (Línea 35 y 36)
  const _onSearch = onSearch;
  const _isLoading = isLoading;

  const [status, setStatus] = React.useState('all');
  const [guests, setGuests] = React.useState(1);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [bedrooms, setBedrooms] = React.useState<Bedroom[]>([]);
  const { toast } = useToast();

  // EFECTO 1: Carga inicial de habitaciones Y precarga de datos de localStorage
  React.useEffect(() => {
    const fetchBedroomsAndLoadState = async () => {
      // Cargar el estado guardado (Fechas y Huéspedes)
      try {
        const savedDates = localStorage.getItem('selectedDates');
        const savedGuests = localStorage.getItem('selectedGuests');

        if (savedDates) {
          const { from, to } = JSON.parse(savedDates);
          if (from) {
            setDateRange({
              from: new Date(from),
              to: to ? new Date(to) : new Date(from)
            });
          }
        }

        if (savedGuests) {
          const numGuests = Number.parseInt(savedGuests, 10);
          if (!Number.isNaN(numGuests) && numGuests >= 1) {
            setGuests(numGuests);
          }
        }
      } catch (error) {
        console.error('Error al cargar datos de localStorage:', error);
      }

      // Cargar las habitaciones
      try {
        const response = await getAllBedrooms();
        if (!Array.isArray(response) || response.length === 0) {
          console.error('API response is not an array or is empty');
          return;
        }
        setBedrooms(response as Bedroom[]);
      } catch (error) {
        console.error('Error fetching bedrooms:', error);
      }
    };
    fetchBedroomsAndLoadState();
  }, []);

  // EFECTO 2: Guarda Fechas y Huéspedes en localStorage cada vez que cambian
  React.useEffect(() => {
    if (dateRange?.from) {
      const dateData = {
        from: dateRange.from.toISOString(),
        to: dateRange.to?.toISOString() || dateRange.from.toISOString()
      };
      localStorage.setItem('selectedDates', JSON.stringify(dateData));
      localStorage.setItem('selectedGuests', guests.toString());
      localStorage.setItem('fromSearch', 'true'); // Flag para el flujo
    }
  }, [dateRange, guests]);

  const handleSearch = async () => {
    // ... (Lógica de validación y filtrado omitida por ser la misma)
    if (dateRange?.from && dateRange.from < new Date()) {
      toast({
        description: 'No puedes buscar habitaciones en fechas anteriores.',
        title: 'Fecha inválida',
        variant: 'destructive'
      });
      return _onSearch([]);
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Lógica de filtrado de habitaciones...
    const results = bedrooms.filter((bedroom) => {
      const statusMatch =
        status === 'all' || (status === 'available' && bedroom.status === true);
      const capacityMatch = bedroom.capacity >= guests;
      let dateMatch = true;
      // Lógica de conflicto de fechas...
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

    _onSearch(results);
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
          {/* ... Select de Estado (sin cambios) ... */}
          <div className="relative group">
            <CheckCircle2
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary z-10 pointer-events-none" // CORREGIDO (Línea 175)
            />
            <Select onValueChange={setStatus} value={status}>
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

          {/* Guests selector (sin cambios) */}
          <div className="flex items-center">
            <Button
              className="h-10 w-10 transition-all duration-200 hover:scale-110 active:scale-95 bg-transparent" // CORREGIDO (Línea 193)
              onClick={() => setGuests((prev) => Math.max(1, prev - 1))} // CORREGIDO (Línea 194)
              size="icon" // CORREGIDO (Línea 195)
              variant="outline"
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
              className="h-10 w-10 transition-all duration-200 hover:scale-110 active:scale-95 bg-transparent" // CORREGIDO (Línea 207)
              onClick={() => setGuests((prev) => prev + 1)} // CORREGIDO (Línea 208)
              size="icon" // CORREGIDO (Línea 209)
              variant="outline"
            >
              +
            </Button>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="pl-9 justify-start text-left font-normal transition-all duration-200 hover:scale-[1.02] hover:shadow-md relative bg-transparent" // CORREGIDO (Línea 219)
                variant="outline"
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
              align="start" // CORREGIDO (Línea 240)
              className="w-auto p-0 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <CalendarComponent
                initialFocus // CORREGIDO (Línea 245)
                locale={es} // CORREGIDO (Línea 246)
                mode="range" // CORREGIDO (Línea 247)
                numberOfMonths={2} // CORREGIDO (Línea 248)
                onSelect={setDateRange}
                selected={dateRange}
              />
            </PopoverContent>
          </Popover>

          <Button
            className="relative overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95 disabled:scale-100" // CORREGIDO (Línea 256)
            disabled={isLoading} // CORREGIDO (Línea 257)
            onClick={handleSearch}
            variant="save"
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
