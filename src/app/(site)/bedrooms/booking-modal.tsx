'use client';

import * as React from 'react';
import { X, Calendar, Users, Bed, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
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

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [guests, setGuests] = React.useState(1);
  const [clientName, setClientName] = React.useState('');
  const [clientEmail, setClientEmail] = React.useState('');
  const [clientPhone, _setClientPhone] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  // Determine active season and price
  const activeSeasonName = bedroom.Seasons?.nameSeason;
  const isHighSeason = activeSeasonName?.toLowerCase().includes('alta');

  const { toast } = useToast();
  const router = useRouter();

  // ⚡ PRE-CARGA AUTOMÁTICA DE DATOS DE LA SESIÓN
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
        description: 'Por favor selecciona las fechas de entrada y salida.',
        variant: 'destructive'
      });
      return;
    }

    if (!clientName || !clientEmail) {
      toast({
        title: 'Datos incompletos',
        description: 'Por favor completa todos tus datos de contacto.',
        variant: 'destructive'
      });
      return;
    }

    if (guests > bedroom.capacity) {
      toast({
        title: 'Capacidad excedida',
        description: `Esta habitación tiene capacidad para ${bedroom.capacity} huésped(es).`,
        variant: 'destructive'
      });
      return;
    }

    if (bedroom.bookingsDetails && bedroom.bookingsDetails.length > 0) {
      const searchStart = dateRange.from;
      const searchEnd = dateRange.to;

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

      if (hasConflict) {
        toast({
          title: 'Fechas no disponibles',
          description:
            'Las fechas seleccionadas no están disponibles para esta habitación.',
          variant: 'destructive'
        });
        return;
      }
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
          description: 'Tu reserva ha sido creada exitosamente.'
        });

        router.push(`/reservaciones/${result.reservation.id}`);
      } else {
        toast({
          title: 'Error',
          description: result.error || 'No se pudo crear la reserva.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error al procesar tu reserva.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    if (!e.currentTarget.src.includes(DEFAULT_PLACEHOLDER)) {
      e.currentTarget.src = DEFAULT_PLACEHOLDER;
    }
  };

  if (!isOpen) {
    return null;
  }

  const imageUrl = bedroom.BedroomImages?.[0]?.image || DEFAULT_PLACEHOLDER;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-gray-600 hover:bg-white hover:text-gray-900 transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* IMAGEN */}
        <div className="relative h-64 overflow-hidden rounded-t-lg">
          <img
            src={imageUrl}
            alt={bedroom.name}
            className="h-full w-full object-cover"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl font-bold">{bedroom.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-white/90">{bedroom.description}</p>
              {activeSeasonName && (
                <span className="bg-orange-600 px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider">
                  {activeSeasonName}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-teal-600" />
              <span>Habitación {bedroom.numberBedroom}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-teal-600" />
              <span>Hasta {bedroom.capacity} huéspedes</span>
            </div>
          </div>

          {/* DATOS CONTACTO */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-semibold text-lg">Datos de contacto</h3>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Nombre completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tu nombre"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* FECHAS Y HUESPEDES */}
          <div className="grid gap-4 md:grid-cols-2 border-t pt-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Fechas de estadía</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-transparent"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
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
                      <span>Selecciona fechas</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    locale={es}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* HUESPEDES */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Número de huéspedes</Label>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                  className="rounded-r-none"
                >
                  -
                </Button>
                <div className="flex-1 text-center font-medium">{guests}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setGuests((prev) => Math.min(bedroom.capacity, prev + 1))
                  }
                  className="rounded-l-none"
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          {/* PRECIOS */}
          <div className="border-t pt-4">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Temporada baja</p>
                <p
                  className={`text-2xl font-bold ${!isHighSeason ? 'text-teal-600' : 'text-gray-400'
                    }`}
                >
                  ${bedroom.lowSeasonPrice}/noche
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Temporada alta</p>
                <p
                  className={`text-xl font-semibold ${isHighSeason ? 'text-teal-600' : 'text-gray-400'
                    }`}
                >
                  ${bedroom.highSeasonPrice}/noche
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent"
                disabled={isLoading}
              >
                Cancelar
              </Button>

              <Button
                onClick={handleReserve}
                className="flex-1 bg-teal-600 hover:bg-teal-700"
                disabled={isLoading}
              >
                {isLoading ? 'Procesando...' : 'Confirmar reserva'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
