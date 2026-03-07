'use client';

import * as React from 'react';
import { X, Calendar, Users, Bed, User, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format, differenceInDays, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { useToast } from '@/components/ui/use-toast';
import type { DateRange } from 'react-day-picker';
import { useRouter } from 'next/navigation';
import { createQuickReservation } from '@/app/actions/reservations/create-quick-reservations';
import { useSession } from 'next-auth/react';

interface Bedroom {
  id: string;
  name: string;
  description: string;
  capacity: number;
  numberBedroom: number;
  status: boolean;
  lowSeasonPrice: number;
  highSeasonPrice: number;
  BedroomImages?: Array<{ id: string; image: string }>;
  bookingsDetails?: Array<{
    dateStart: string;
    dateEnd?: string;
    status: string;
    Reservation?: {
      status: string;
    };
  }>;
  Seasons?: {
    id: number;
    nameSeason: string;
    dateStart: Date;
    dateEnd: Date;
  } | null;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bedroom: Bedroom;
}

const DEFAULT_PLACEHOLDER = '/luxury-hotel-room.png';

export function BookingModal({ isOpen, onClose, bedroom }: BookingModalProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [guests, setGuests] = React.useState(1);
  const [clientName, setClientName] = React.useState('');
  const [clientEmail, setClientEmail] = React.useState('');
  const [clientPhone, _setClientPhone] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  // Helper para zona horaria (Evita que el 6 pase a 5 en navegadores locales)
  const parseSafeDate = React.useCallback((d: string | Date) => {
    const iso = typeof d === 'string' ? d : new Date(d).toISOString();
    const [y, m, day] = iso.split('T')[0].split('-').map(Number);
    return new Date(y, m - 1, day, 0, 0, 0, 0);
  }, []);

  // 1. DETERMINAR PRECIO ACTUAL SEGÚN LA FECHA DE HOY
  const currentPrice = React.useMemo(() => {
    const today = startOfDay(new Date());
    const season = bedroom.Seasons;

    if (season && season.dateStart && season.dateEnd) {
      const start = startOfDay(new Date(season.dateStart));
      const end = startOfDay(new Date(season.dateEnd));

      if (today >= start && today <= end) {
        return season.nameSeason.toLowerCase().includes('alta')
          ? bedroom.highSeasonPrice
          : bedroom.lowSeasonPrice;
      }
    }
    return bedroom.lowSeasonPrice;
  }, [bedroom]);

  const isCurrentlyHighSeason = currentPrice === bedroom.highSeasonPrice;

  // 2. CÁLCULO DE NOCHES Y TOTAL
  const nightsCount = React.useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) {
      return 0;
    }
    return Math.max(
      1,
      differenceInDays(startOfDay(dateRange.to), startOfDay(dateRange.from))
    );
  }, [dateRange]);

  const totalAmount = nightsCount * currentPrice;

  // Pre-carga de sesión
  React.useEffect(() => {
    if (isOpen && session?.user) {
      setClientName(session.user.username || '');
      setClientEmail(session.user.email || '');
    }
  }, [isOpen, session]);

  const handleReserve = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast({
        title: 'Fechas requeridas',
        description: 'Selecciona entrada y salida.',
        variant: 'destructive'
      });
      return;
    }

    // Verificar si el rango seleccionado incluye fechas ya reservadas
    const isRangeReserved = bedroom.bookingsDetails?.some((booking) => {
      if (booking.status === 'CANCELLED' || booking.Reservation?.status === 'CANCELLED') {
        return false;
      }

      const bStart = parseSafeDate(booking.dateStart);
      const bEnd = booking.dateEnd ? parseSafeDate(booking.dateEnd) : parseSafeDate(booking.dateStart);

      const rStart = new Date(dateRange.from!);
      rStart.setHours(0, 0, 0, 0);
      const rEnd = new Date(dateRange.to!);
      rEnd.setHours(0, 0, 0, 0);

      // Solapamiento total o parcial (lógica exclusiva [start, end)) -> choca si searchStart < bookingEnd AND searchEnd > bookingStart
      return rStart < bEnd && rEnd > bStart;
    });

    if (isRangeReserved) {
      toast({
        title: 'Fechas no disponibles',
        description: 'El rango seleccionado incluye fechas ya reservadas.',
        variant: 'destructive'
      });
      return;
    }

    if (!clientName || !clientEmail) {
      toast({
        title: 'Datos incompletos',
        description: 'Completa tu nombre y email.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await createQuickReservation({
        clientEmail,
        clientName,
        clientPhone,
        bedroomId: bedroom.id,
        dateStart: dateRange.from,
        dateEnd: dateRange.to,
        guests
      });

      if (result.success && result.reservation) {
        toast({
          title: '¡Reserva confirmada!',
          description: 'Tu estancia ha sido programada.'
        });
        router.push(`/reservaciones/${result.reservation.id}`);
      } else {
        toast({
          title: 'Error',
          description: result.error || 'No se pudo crear.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al procesar reserva.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  const imageUrl = bedroom.BedroomImages?.[0]?.image || DEFAULT_PLACEHOLDER;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 shadow-2xl max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 dark:bg-slate-800/90 p-2 shadow-md hover:bg-white dark:hover:bg-slate-700 transition-all"
        >
          <X className="h-5 w-5 text-slate-900 dark:text-slate-100" />
        </button>

        <div className="relative h-56">
          <img
            src={imageUrl}
            alt={bedroom.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase">
              {bedroom.name}
            </h2>
            <div className="flex items-center gap-3 mt-1 text-slate-200">
              <span className="flex items-center gap-1 text-sm">
                <Bed className="h-4 w-4" /> Hab. {bedroom.numberBedroom}
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Users className="h-4 w-4" /> Cap. {bedroom.capacity}
              </span>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* SECCIÓN PRECIO ACTUAL */}
          <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest mb-1">
                Tarifa vigente hoy
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-orange-600">
                  C${currentPrice.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-bold">
                  / noche
                </span>
              </div>
            </div>
            <Badge
              className={
                isCurrentlyHighSeason
                  ? 'bg-orange-600 animate-pulse'
                  : 'bg-emerald-600'
              }
            >
              Temporada {isCurrentlyHighSeason ? 'Alta' : 'Baja'}
            </Badge>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 underline decoration-teal-500 underline-offset-4">
                <User className="h-4 w-4" /> Tus Datos
              </h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                    Nombre Completo
                  </Label>
                  <Input
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="bg-slate-50/50 dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                    Correo Electrónico
                  </Label>
                  <Input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="bg-slate-50/50 dark:bg-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 underline decoration-teal-500 underline-offset-4">
                <Calendar className="h-4 w-4" /> Estancia
              </h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                    Rango de Fechas
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-xs font-bold border-dashed border-slate-300"
                      >
                        {dateRange?.from
                          ? dateRange.to
                            ? `${format(dateRange.from, 'dd MMM')} - ${format(dateRange.to, 'dd MMM')}`
                            : format(dateRange.from, 'dd MMM')
                          : 'Seleccionar fechas'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                        locale={es}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          const isPast = date < today;

                          const isReserved = bedroom.bookingsDetails?.some(
                            (booking) => {
                              if (booking.status === 'CANCELLED' || booking.Reservation?.status === 'CANCELLED') {
                                return false; // Ignorar canceladas
                              }

                              const bStart = parseSafeDate(booking.dateStart);
                              const bEnd = booking.dateEnd ? parseSafeDate(booking.dateEnd) : parseSafeDate(booking.dateStart);

                              // El calendario deshabilita los días que están puramente DENTRO [bStart, bEnd)
                              // No deshabilita bEnd porque el bEnd es el día de check-out, por lo cual la tarde está libre
                              return date >= bStart && date < bEnd;
                            }
                          );
                          return isPast || !!isReserved;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-1">
                  <Label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                    Huéspedes
                  </Label>
                  <div className="flex items-center border dark:border-slate-700 rounded-lg h-10 overflow-hidden">
                    <Button
                      variant="ghost"
                      className="h-full rounded-none px-3 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                    >
                      -
                    </Button>
                    <span className="flex-1 text-center text-sm font-bold">
                      {guests}
                    </span>
                    <Button
                      variant="ghost"
                      className="h-full rounded-none px-3 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() =>
                        setGuests((prev) =>
                          Math.min(bedroom.capacity, prev + 1)
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DESGLOSE FINAL */}
          {nightsCount > 0 && (
            <div className="bg-orange-50/50 dark:bg-orange-950/30 p-4 rounded-xl border border-orange-100 dark:border-orange-900/50 space-y-2">
              <div className="flex justify-between text-xs text-orange-700 font-bold uppercase">
                <span>Resumen de cargos ({nightsCount} noches)</span>
              </div>
              <div className="flex justify-between items-end pt-2">
                <div>
                  <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
                    Total: C${totalAmount.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                    IMPUESTOS INCLUIDOS
                  </p>
                </div>
                <div className="flex items-center gap-1 text-orange-600 text-xs font-bold bg-white dark:bg-slate-800 px-2 py-1 rounded-full shadow-sm">
                  <CheckCircle2 className="h-3 w-3" /> Precio Garantizado
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-2">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              disabled={isLoading}
            >
              Cerrar
            </Button>
            <Button
              onClick={handleReserve}
              className="flex-[2] bg-blue-600 hover:bg-blue-700 h-12 text-md font-black shadow-lg shadow-orange-600/20"
              disabled={isLoading}
            >
              {isLoading ? 'Procesando...' : 'CONFIRMAR RESERVA'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
