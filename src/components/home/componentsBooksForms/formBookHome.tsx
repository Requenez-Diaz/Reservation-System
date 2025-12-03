'use client';

import * as React from 'react';
import { Users, Calendar, CheckCircle2, Bed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useToast } from '@/components/ui/use-toast';
import type { DateRange } from 'react-day-picker';
import { useRouter } from 'next/navigation';
import { getAllBedrooms } from '@/app/actions/get-bedrooms';

interface Booking {
  dateStart: string;
  dateEnd?: string;
}

interface Bedroom {
  id: string;
  name: string;
  capacity: number;
  status: boolean;
  bookingsDetails?: Booking[];
}

const ROOM_STATUS = [
  { value: 'all', label: 'Todas' },
  { value: 'available', label: 'Disponible' }
] as const;

export function BedroomSearchForm() {
  const [status, setStatus] = React.useState('all');
  const [guests, setGuests] = React.useState(1);
  const [roomCount, setRoomCount] = React.useState(1);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [bedrooms, setBedrooms] = React.useState<Bedroom[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [_showPromoModal, _setShowPromoModal] = React.useState(false);
  const [_promoCode, _setPromoCode] = React.useState('');
  const [_destination, _setDestination] = React.useState('hotel madroño');
  const { toast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    const fetchBedroomsAndLoadState = async () => {
      try {
        const savedDates = localStorage.getItem('selectedDates');
        const savedGuests = localStorage.getItem('selectedGuests');
        const savedRoomCount = localStorage.getItem('selectedRoomCount');

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

        if (savedRoomCount) {
          const numRooms = Number.parseInt(savedRoomCount, 10);
          if (!Number.isNaN(numRooms) && numRooms >= 1) {
            setRoomCount(numRooms);
          }
        }
      } catch (error) {
        console.error('Error al cargar datos de localStorage:', error);
      }

      try {
        const response = await getAllBedrooms();
        setBedrooms(response as unknown as Bedroom[]);
      } catch (error) {
        console.error('Error fetching bedrooms:', error);
        toast({
          title: 'Error',
          description: 'No se pudieron cargar las habitaciones.',
          variant: 'destructive'
        });
      }
    };

    fetchBedroomsAndLoadState();
  }, []);

  React.useEffect(() => {
    if (dateRange?.from) {
      const dateData = {
        from: dateRange.from.toISOString(),
        to: dateRange.to?.toISOString() || dateRange.from.toISOString()
      };
      sessionStorage.setItem('selectedDates', JSON.stringify(dateData));
      sessionStorage.setItem('selectedGuests', guests.toString());
      sessionStorage.setItem('selectedRoomCount', roomCount.toString());
      sessionStorage.setItem('fromSearch', 'true');
    }
  }, [dateRange, guests, roomCount]);

  const handleSearch = async () => {
    if (dateRange?.from && dateRange.from < new Date()) {
      toast({
        description: 'No puedes buscar habitaciones en fechas anteriores.',
        title: 'Fecha inválida',
        variant: 'destructive'
      });
      return;
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

    const limitedResults = results.slice(0, roomCount);

    if (results.length < roomCount && results.length > 0) {
      toast({
        description: `Solo se encontraron ${results.length} habitación(es) disponible(s) de las ${roomCount} solicitadas.`,
        title: 'Habitaciones limitadas',
        variant: 'default'
      });
    }

    setIsLoading(false);

    if (limitedResults.length > 0) {
      sessionStorage.setItem('filteredRooms', JSON.stringify(limitedResults));

      toast({
        title: 'Búsqueda completada',
        description: `Se encontraron ${limitedResults.length} habitación(es) disponible(s).`
      });

      router.push('/rooms');
    } else {
      toast({
        title: 'Sin resultados',
        description:
          'No se encontraron habitaciones disponibles con los criterios seleccionados.',
        variant: 'destructive'
      });
    }
  };

  return (
    <>
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-20">
        <div className="rounded-lg bg-white p-6 shadow-2xl">
          <div className="grid gap-4 md:grid-cols-[2fr,1fr,auto,auto,1fr,auto] md:items-end">
            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Estado</Label>
              <div className="relative group">
                <CheckCircle2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary z-10 pointer-events-none" />
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
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Habitaciones</Label>
              <div className="flex items-center">
                <Button
                  className="h-10 w-10 transition-all duration-200 hover:scale-110 active:scale-95"
                  onClick={() => setRoomCount((prev) => Math.max(1, prev - 1))}
                  size="icon"
                  variant="outline"
                >
                  -
                </Button>
                <div className="flex items-center gap-2 px-4 transition-all duration-300">
                  <Bed className="h-4 w-4 transition-transform duration-200" />
                  <span className="font-medium tabular-nums transition-all duration-200">
                    {roomCount}
                  </span>
                </div>
                <Button
                  className="h-10 w-10 transition-all duration-200 hover:scale-110 active:scale-95"
                  onClick={() => setRoomCount((prev) => prev + 1)}
                  size="icon"
                  variant="outline"
                >
                  +
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Huéspedes</Label>
              <div className="flex items-center">
                <Button
                  className="h-10 w-10 transition-all duration-200 hover:scale-110 active:scale-95"
                  onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                  size="icon"
                  variant="outline"
                >
                  -
                </Button>
                <div className="flex items-center gap-2 px-4 transition-all duration-300">
                  <Users className="h-4 w-4 transition-transform duration-200" />
                  <span className="font-medium tabular-nums transition-all duration-200">
                    {guests}
                  </span>
                </div>
                <Button
                  className="h-10 w-10 transition-all duration-200 hover:scale-110 active:scale-95"
                  onClick={() => setGuests((prev) => prev + 1)}
                  size="icon"
                  variant="outline"
                >
                  +
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Fechas</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="w-full pl-9 justify-start text-left font-normal transition-all duration-200 hover:scale-[1.02] hover:shadow-md relative bg-transparent"
                    variant="outline"
                  >
                    <Calendar className="absolute left-3 h-4 w-4 text-muted-foreground" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, 'dd/MM/yy', { locale: es })} -{' '}
                          {format(dateRange.to, 'dd/MM/yy', { locale: es })}
                        </>
                      ) : (
                        format(dateRange.from, 'dd/MM/yyyy', { locale: es })
                      )
                    ) : (
                      <span className="text-muted-foreground">
                        Selecciona fechas
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-auto p-0 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <CalendarComponent
                    initialFocus
                    locale={es}
                    mode="range"
                    numberOfMonths={2}
                    onSelect={setDateRange}
                    selected={dateRange}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-teal-600 hover:bg-teal-700 md:mt-8 relative overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95 disabled:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Buscando...
                </div>
              ) : (
                'Ver disponibilidad'
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
