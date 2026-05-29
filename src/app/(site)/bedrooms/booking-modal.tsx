'use client';

import * as React from 'react';
import { X, Bed, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, differenceInDays, startOfDay } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import type { DateRange } from 'react-day-picker';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { createQuickReservation } from '@/app/actions/reservations/create-quick-reservations';
import { useSession } from 'next-auth/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import {
  BookingPriceSummary,
  BookingForm
} from './booking-components';

interface Bedroom {
  id: string | number;
  name: string;
  description: string;
  capacity: number;
  numberBedroom: number;
  status: boolean;
  lowSeasonPrice: number;
  highSeasonPrice: number;
  BedroomImages?: Array<{ id: string; image: string }>;
  bookingsDetails?: Array<{
    dateStart: string | Date;
    dateEnd?: string | Date;
    status: string;
  }>;
  Season?: {
    id: number;
    nameSeason: string;
    dateStart: Date | string;
    dateEnd: Date | string;
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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    () => {
      const from = searchParams.get('from');
      const to = searchParams.get('to');
      return {
        from: from ? new Date(`${from}T12:00:00`) : undefined,
        to: to ? new Date(`${to}T12:00:00`) : undefined
      };
    }
  );

  const [guests, setGuests] = React.useState(() => {
    const guestsParam = searchParams.get('guests');
    return guestsParam
      ? Math.min(bedroom.capacity, parseInt(guestsParam, 10))
      : 1;
  });

  const [clientName, setClientName] = React.useState('');
  const [clientEmail, setClientEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const updateUrl = (newRange?: DateRange, newGuests?: number) => {
    const params = new URLSearchParams(searchParams.toString());

    const range = newRange !== undefined ? newRange : dateRange;
    if (range?.from) {
      params.set('from', format(range.from, 'yyyy-MM-dd'));
    } else {
      params.delete('from');
    }
    if (range?.to) {
      params.set('to', format(range.to, 'yyyy-MM-dd'));
    } else {
      params.delete('to');
    }

    const gCount = newGuests !== undefined ? newGuests : guests;
    if (gCount > 1) {
      params.set('guests', gCount.toString());
    } else {
      params.delete('guests');
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    updateUrl(range, guests);
  };

  const activePrice = React.useMemo(() => {
    const season = bedroom.Season;
    if (!season || !season.dateStart || !season.dateEnd) {
      return bedroom.lowSeasonPrice;
    }

    const today = startOfDay(new Date());
    const seasonStart = startOfDay(new Date(season.dateStart));
    const seasonEnd = startOfDay(new Date(season.dateEnd));

    return today >= seasonStart &&
      today <= seasonEnd &&
      season.nameSeason.toUpperCase() === 'ALTA'
      ? bedroom.highSeasonPrice
      : bedroom.lowSeasonPrice;
  }, [bedroom]);

  const nightsCount = React.useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) {
      return 0;
    }
    return Math.max(
      1,
      differenceInDays(startOfDay(dateRange.to), startOfDay(dateRange.from))
    );
  }, [dateRange]);

  const totalAmount = nightsCount * activePrice;

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

    setIsLoading(true);
    try {
      const result = await createQuickReservation({
        clientEmail,
        clientName,
        bedroomId: bedroom.id,
        dateStart: dateRange.from,
        dateEnd: dateRange.to,
        guests,
        clientPhone: ''
      });

      if (result.success && result.reservation?.id) {
        toast({
          title: '¡Reserva confirmada!',
          description: 'Se ha registrado tu estancia.'
        });
        onClose();
        router.push(`/reservaciones/${result.reservation.id}`);
      } else {
        toast({
          title: 'No se pudo completar',
          description: result.error || 'Ocurrió un detalle técnico.',
          variant: 'destructive'
        });
      }
    } catch {
      toast({
        title: 'Error de red',
        description: 'No se pudo conectar con el servidor.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }
  const galleryImages =
    bedroom.BedroomImages?.length
      ? bedroom.BedroomImages
      : [{ id: 'default', image: DEFAULT_PLACEHOLDER }];

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
          {galleryImages.length > 1 ? (
            <Carousel className="h-full w-full">
              <CarouselContent className="h-full">
                {galleryImages.map((img) => (
                  <CarouselItem key={img.id} className="h-full">
                    <img
                      src={img.image}
                      alt={bedroom.name}
                      className="h-full w-full object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/80 hover:bg-white text-slate-800 border-none shadow-md" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/80 hover:bg-white text-slate-800 border-none shadow-md" />
            </Carousel>
          ) : (
            <img
              src={galleryImages[0].image}
              alt={bedroom.name}
              className="h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase">
              {bedroom.name}
            </h2>
            <div className="flex items-center gap-4 mt-2 text-slate-200">
              <span className="flex items-center gap-1.5 text-sm font-medium">
                <Bed /> Hab. #{bedroom.numberBedroom}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-medium">
                <Users /> Cap. {bedroom.capacity}
              </span>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <BookingPriceSummary
            pricePerNight={activePrice}
            highSeasonPrice={bedroom.highSeasonPrice}
            nightsCount={nightsCount}
            totalAmount={totalAmount}
          />

          <BookingForm
            clientName={clientName}
            clientEmail={clientEmail}
            guests={guests}
            dateRange={dateRange}
            capacity={bedroom.capacity}
            bookingsDetails={bedroom.bookingsDetails}
            onNameChange={setClientName}
            onEmailChange={setClientEmail}
            onGuestsChange={(count) => {
              setGuests(count);
              updateUrl(dateRange, count);
            }}
            onDateSelect={handleDateSelect}
          />

          <div className="flex gap-4 pt-2">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 font-bold text-slate-500"
              disabled={isLoading}
            >
              Cerrar
            </Button>
            <Button
              onClick={handleReserve}
              className="flex-[2] bg-blue-600 hover:bg-blue-700 h-12 text-md font-black shadow-lg text-white"
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
