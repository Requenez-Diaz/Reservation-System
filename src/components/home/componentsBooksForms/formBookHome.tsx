'use client';

import * as React from 'react';
import { Users, Calendar, Bed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

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

export function BedroomSearchForm() {
  const [guests, setGuests] = React.useState(1);
  const [roomCount, setRoomCount] = React.useState(1);
  const [guestDistribution, setGuestDistribution] = React.useState<number[]>([
    1
  ]);
  const [showDistributionDialog, setShowDistributionDialog] =
    React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [bedrooms, setBedrooms] = React.useState<Bedroom[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const { toast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    const fetchBedroomsAndLoadState = async () => {
      try {
        const savedDates = localStorage.getItem('selectedDates');
        const savedGuests = localStorage.getItem('selectedGuests');
        const savedRoomCount = localStorage.getItem('selectedRoomCount');
        const savedDistribution = localStorage.getItem('guestDistribution');

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
          setGuests(Number.parseInt(savedGuests, 10) || 1);
        }
        if (savedRoomCount) {
          setRoomCount(Number.parseInt(savedRoomCount, 10) || 1);
        }
        if (savedDistribution) {
          setGuestDistribution(JSON.parse(savedDistribution));
        }

        const response = await getAllBedrooms();
        setBedrooms(response as unknown as Bedroom[]);
      } catch (error) {
        console.error('Error al inicializar:', error);
      }
    };

    fetchBedroomsAndLoadState();
  }, [toast]);

  React.useEffect(() => {
    if (guestDistribution.length !== roomCount) {
      const avgGuests = Math.floor(guests / roomCount);
      const remainder = guests % roomCount;
      const newDistribution = Array(roomCount)
        .fill(avgGuests)
        .map((val, idx) => (idx < remainder ? val + 1 : val));
      setGuestDistribution(newDistribution);
    }
  }, [roomCount, guests, guestDistribution.length]);

  React.useEffect(() => {
    if (dateRange?.from) {
      const dateData = {
        from: dateRange.from.toISOString(),
        to: dateRange.to?.toISOString() || dateRange.from.toISOString()
      };
      localStorage.setItem('selectedDates', JSON.stringify(dateData));
      localStorage.setItem('selectedGuests', guests.toString());
      localStorage.setItem('selectedRoomCount', roomCount.toString());
      localStorage.setItem(
        'guestDistribution',
        JSON.stringify(guestDistribution)
      );
      localStorage.setItem('fromSearch', 'true');
    }
  }, [dateRange, guests, roomCount, guestDistribution]);

  const updateGuestDistribution = (roomIndex: number, count: number) => {
    const newDistribution = [...guestDistribution];
    newDistribution[roomIndex] = Math.max(1, count);
    setGuestDistribution(newDistribution);
  };

  const getTotalFromDistribution = () => {
    return guestDistribution.reduce((sum, count) => sum + count, 0);
  };

  const applyDistribution = () => {
    const total = getTotalFromDistribution();
    setGuests(total);
    setShowDistributionDialog(false);
    toast({
      title: 'Distribución aplicada',
      description: `Se distribuyeron ${total} huésped(es) en ${roomCount} habitación(es).`
    });
  };

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
    await new Promise((resolve) => setTimeout(resolve, 600));

    const usedRoomIds = new Set<string>();
    const selectedRooms: Bedroom[] = [];

    // --- LÓGICA DE BÚSQUEDA POR EFICIENCIA ---
    for (const guestsNeeded of guestDistribution) {
      const availableMatches = bedrooms.filter((bedroom) => {
        if (usedRoomIds.has(bedroom.id)) {
          return false;
        }

        const statusMatch = bedroom.status === true;
        const capacityMatch = bedroom.capacity >= guestsNeeded;

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

      // ORDENAR: Primero las habitaciones que tengan la capacidad más cercana a la necesaria
      availableMatches.sort((a, b) => a.capacity - b.capacity);

      if (availableMatches.length > 0) {
        const bestFit = availableMatches[0];
        selectedRooms.push(bestFit);
        usedRoomIds.add(bestFit.id);
      }
    }

    setIsLoading(false);

    if (selectedRooms.length > 0) {
      localStorage.setItem('filteredRooms', JSON.stringify(selectedRooms));

      if (selectedRooms.length < roomCount) {
        toast({
          title: 'Resultados parciales',
          description: `Solo encontramos ${selectedRooms.length} de las ${roomCount} habitaciones solicitadas.`
        });
      } else {
        toast({
          title: '¡Éxito!',
          description: 'Encontramos las habitaciones ideales para tu grupo.'
        });
      }
      router.push('/rooms');
    } else {
      toast({
        title: 'Sin disponibilidad',
        description:
          'No hay habitaciones que coincidan con tu distribución en estas fechas.',
        variant: 'destructive'
      });
    }
  };

  return (
    <>
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-20">
        <div className="rounded-lg bg-white p-6 shadow-2xl">
          <div className="grid gap-4 md:grid-cols-[2fr,1fr,auto,auto,1fr,auto] md:items-end">
            {/* Habitaciones */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Habitaciones</Label>
              <div className="flex items-center">
                <Button
                  className="h-10 w-10"
                  onClick={() => setRoomCount((prev) => Math.max(1, prev - 1))}
                  size="icon"
                  variant="outline"
                >
                  -
                </Button>
                <div className="flex items-center gap-2 px-4">
                  <Bed className="h-4 w-4" />
                  <span className="font-medium tabular-nums">{roomCount}</span>
                </div>
                <Button
                  className="h-10 w-10"
                  onClick={() => setRoomCount((prev) => prev + 1)}
                  size="icon"
                  variant="outline"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Huéspedes */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Huéspedes</Label>
              <div className="flex items-center">
                <Button
                  className="h-10 w-10"
                  onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                  size="icon"
                  variant="outline"
                >
                  -
                </Button>
                <div className="flex items-center gap-2 px-4">
                  <Users className="h-4 w-4" />
                  <span className="font-medium tabular-nums">{guests}</span>
                </div>
                <Button
                  className="h-10 w-10"
                  onClick={() => setGuests((prev) => prev + 1)}
                  size="icon"
                  variant="outline"
                >
                  +
                </Button>
              </div>
              {roomCount > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2 text-xs bg-transparent"
                  onClick={() => setShowDistributionDialog(true)}
                >
                  Distribuir huéspedes
                </Button>
              )}
            </div>

            {/* Calendario */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Fechas</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="w-full pl-9 justify-start text-left font-normal relative bg-transparent"
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
                <PopoverContent align="start" className="w-auto p-0">
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

            {/* Botón Buscar */}
            <Button onClick={handleSearch} disabled={isLoading} variant="save">
              {isLoading ? 'Buscando...' : 'Ver disponibilidad'}
            </Button>
          </div>
        </div>
      </div>

      {/* Dialogo de Distribución */}
      <Dialog
        open={showDistributionDialog}
        onOpenChange={setShowDistributionDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Distribuir Huéspedes</DialogTitle>
            <DialogDescription>
              Ajusta cuántas personas dormirán en cada habitación.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {guestDistribution.map((count, index) => (
              <div key={index} className="flex items-center gap-4">
                <Label className="w-32 text-sm">Habitación {index + 1}</Label>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => updateGuestDistribution(index, count - 1)}
                  >
                    -
                  </Button>
                  <div className="flex items-center gap-2 w-16 justify-center">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{count}</span>
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => updateGuestDistribution(index, count + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-sm font-medium">Total:</span>
              <span className="text-lg font-bold">
                {getTotalFromDistribution()} huéspedes
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDistributionDialog(false)}
            >
              Cancelar
            </Button>
            <Button onClick={applyDistribution} variant="save">
              Aplicar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
