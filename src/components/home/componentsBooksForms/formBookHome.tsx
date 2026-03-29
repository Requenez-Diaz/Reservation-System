'use client';

import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Bed, Calendar, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import type { DateRange } from 'react-day-picker';

export function BedroomSearchForm() {
  const [guests, setGuests] = React.useState(1);
  const [roomCount, setRoomCount] = React.useState(1);
  const [guestDistribution, setGuestDistribution] = React.useState<number[]>([
    1
  ]);
  const [showDistributionDialog, setShowDistributionDialog] =
    React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [isLoading, setIsLoading] = React.useState(false);

  const { toast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    if (guestDistribution.length !== roomCount) {
      const avgGuests = Math.floor(guests / roomCount);
      const remainder = guests % roomCount;
      const newDistribution = new Array(roomCount)
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
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!dateRange?.from) {
      setIsLoading(false);
      toast({
        description: 'Por favor selecciona un rango de fechas.',
        title: 'Fechas faltantes',
        variant: 'destructive'
      });
      return;
    }

    if (dateRange.from < new Date()) {
      setIsLoading(false);
      toast({
        description: 'No puedes buscar habitaciones en fechas anteriores.',
        title: 'Fecha inválida',
        variant: 'destructive'
      });
      return;
    }

    const fromDate = dateRange.from;
    const toDate = dateRange.to ?? dateRange.from;
    const from = format(fromDate, 'yyyy-MM-dd');
    const to = format(toDate, 'yyyy-MM-dd');
    const params = new URLSearchParams({ from, to });
    params.set('capacityCalled', guests.toString());
    params.set('capacities', JSON.stringify(guestDistribution));

    router.push(`/rooms?${params.toString()}`);
  };

  return (
    <>
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-20">
        <div className="rounded-lg bg-white dark:bg-slate-900 dark:border dark:border-slate-700 p-6 shadow-2xl">
          <div className="grid gap-4 md:grid-cols-[2fr,1fr,auto,auto,1fr,auto] md:items-end">
            {/* Habitaciones */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-700 dark:text-gray-300">
                Habitaciones
              </Label>
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
              <Label className="text-sm text-gray-700 dark:text-gray-300">
                Huéspedes
              </Label>
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
              <Label className="text-sm text-gray-700 dark:text-gray-300">
                Fechas
              </Label>
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
