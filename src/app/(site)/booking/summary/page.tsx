'use client';

import {
  createReservation,
  getOrCreateGuestUser
} from '@/app/actions/reservations/reservations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { startOfDay } from 'date-fns';
import { ArrowLeft, Calendar, CheckCircle, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

interface BedroomFromDB {
  id: string;
  name: string;
  description: string;
  capacity: number;
  numberBedroom: number;
  status: boolean;
  lowSeasonPrice: number;
  highSeasonPrice: number;
  image: string;
  slug: string;
  Season?: {
    nameSeason: string;
    dateStart: string;
    dateEnd: string;
  } | null;
}

interface CustomerData {
  username: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  comments: string;
}

export default function BookingSummaryPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedRooms, setSelectedRooms] = React.useState<BedroomFromDB[]>([]);
  const [customerData, setCustomerData] = React.useState<CustomerData | null>(
    null
  );
  const [searchData, setSearchData] = React.useState<{
    dateRange?: { from: Date; to: Date };
    guests: number;
    roomCount: number;
  }>({ guests: 1, roomCount: 1 });
  const [isLoading, setIsLoading] = React.useState(true);
  const [isConfirming, setIsConfirming] = React.useState(false);

  const isHighSeasonActive = (room: BedroomFromDB) => {
    if (!room.Season) {
      return false;
    }

    const today = startOfDay(new Date());
    const seasonStart = startOfDay(new Date(room.Season.dateStart));
    const seasonEnd = startOfDay(new Date(room.Season.dateEnd));

    const isTodayInSeason = today >= seasonStart && today <= seasonEnd;

    if (isTodayInSeason && room.Season.nameSeason.toUpperCase() === 'ALTA') {
      return true;
    }

    return false;
  };

  React.useEffect(() => {
    try {
      const savedRooms = localStorage.getItem('selectedRoomsForBooking');
      const savedCustomer = localStorage.getItem('bookingCustomerData');
      const savedDates = localStorage.getItem('selectedDates');
      const savedGuests = localStorage.getItem('selectedGuests');

      if (!savedRooms || !savedCustomer) {
        router.push('/rooms');
        return;
      }

      setSelectedRooms(JSON.parse(savedRooms));
      setCustomerData(JSON.parse(savedCustomer));

      if (savedDates) {
        const { from, to } = JSON.parse(savedDates);
        setSearchData((prev) => ({
          ...prev,
          dateRange: { from: new Date(from), to: new Date(to) }
        }));
      }

      if (savedGuests) {
        setSearchData((prev) => ({
          ...prev,
          guests: Number.parseInt(savedGuests, 10)
        }));
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error cargando datos:', error);
      router.push('/rooms');
    }
  }, [router]);

  const calculateNights = () => {
    if (!searchData.dateRange?.from || !searchData.dateRange?.to) {
      return 1;
    }
    const diffTime = Math.abs(
      searchData.dateRange.to.getTime() - searchData.dateRange.from.getTime()
    );
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const getRoomPrice = (room: BedroomFromDB) => {
    const isHigh = isHighSeasonActive(room);
    return isHigh ? room.highSeasonPrice : room.lowSeasonPrice;
  };

  const getTotalPrice = () => {
    const nights = calculateNights();
    return selectedRooms.reduce(
      (sum, room) => sum + getRoomPrice(room) * nights,
      0
    );
  };

  const handleConfirmBooking = async () => {
    if (!customerData || !searchData.dateRange) {
      toast({
        title: 'Datos incompletos',
        description: 'Por favor, completa toda la información requerida.',
        variant: 'destructive'
      });
      return;
    }
    setIsConfirming(true);

    try {
      const userResult = await getOrCreateGuestUser(
        customerData.email,
        `${customerData.username} ${customerData.lastName}`
      );
      if (!userResult.success || !userResult.user) {
        throw new Error('Error al procesar el usuario');
      }

      const totalGuestsToDistribute = searchData.guests;
      const numRooms = selectedRooms.length;
      const nights = calculateNights();

      const guestsPerRoomBase = Math.floor(totalGuestsToDistribute / numRooms);
      let extraGuests = totalGuestsToDistribute % numRooms;

      const roomsPayload = selectedRooms.map((room) => {
        const currentRoomGuests = guestsPerRoomBase + (extraGuests > 0 ? 1 : 0);
        if (extraGuests > 0) {
          extraGuests--;
        }

        return {
          bedroomId: Number.parseInt(room.id, 10),
          dateStart: searchData.dateRange!.from,
          dateEnd: searchData.dateRange!.to,
          price: getRoomPrice(room) * nights,
          guestQuantity: currentRoomGuests
        };
      });

      const result = await createReservation({
        userId: userResult.user.id,
        rooms: roomsPayload
      });

      if (!result.success) {
        throw new Error(result.error || 'Error al crear la reserva');
      }

      toast({
        title: 'Reserva exitosa',
        description: 'Tu estancia ha sido confirmada.'
      });
      localStorage.clear();
      router.push(`/reservaciones/${result.reservation?.id}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado al procesar tu reserva';

      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsConfirming(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      {/* HEADER ORIGINAL */}
      <header className="border-b bg-white dark:bg-slate-950 dark:border-slate-800 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
            Hotel{' '}
            <span className="ml-1 text-sm font-normal text-gray-600 dark:text-slate-400">
              MADROÑO
            </span>
          </div>
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="gap-2 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <ArrowLeft className="h-4 w-4" /> Volver
          </Button>
        </div>
      </header>

      {/* PROGRESS BAR */}
      <div className="border-b bg-white dark:bg-slate-900 dark:border-slate-800">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-sm font-semibold text-white">
                ✓
              </div>
              <span className="text-sm text-gray-600 dark:text-slate-400">
                Datos personales
              </span>
            </div>
            <div className="h-px w-16 bg-gray-300 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-sm font-semibold text-white">
                2
              </div>
              <span className="text-sm font-medium text-orange-600">
                Resumen
              </span>
            </div>
            <div className="h-px w-16 bg-gray-300 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 dark:bg-slate-800 text-sm font-semibold text-gray-600 dark:text-slate-500">
                3
              </div>
              <span className="text-sm text-gray-600 dark:text-slate-500">
                Confirmación
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">
            Resumen de tu reserva
          </h1>
          <p className="text-gray-600 dark:text-slate-400 font-medium">
            Huéspedes seleccionados: {searchData.guests}
          </p>
        </div>

        <div className="grid gap-6">
          {/* Info Estadía */}
          <Card className="border-none shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-slate-100">
                <Calendar className="h-5 w-5 text-orange-600" /> Información de
                estadía
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-slate-400">
                  Check-in:
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-200">
                  {/* {format(searchData.dateRange!.from, "dd 'de' MMMM yyyy", {
                    locale: es
                  })} */}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-slate-400">
                  Check-out:
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-200">
                  {/* {format(searchData.dateRange!.to!, "dd 'de' MMMM yyyy", {
                    locale: es
                  })} */}
                </span>
              </div>
              <div className="flex justify-between items-center border-t dark:border-slate-800 pt-3">
                <span className="text-gray-600 dark:text-slate-400 font-medium">
                  Estancia:
                </span>
                <Badge
                  variant="secondary"
                  className="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400 font-bold border-none"
                >
                  {calculateNights()} noche(s)
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Habitaciones */}
          <Card className="border-none shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Habitaciones seleccionadas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedRooms.map((room) => {
                const nights = calculateNights();
                const price = getRoomPrice(room);
                const isHigh = isHighSeasonActive(room);

                return (
                  <div
                    key={room.id}
                    className="flex flex-col sm:flex-row gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0"
                  >
                    <img
                      src={room.image || '/placeholder.svg'}
                      alt=""
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 dark:text-slate-100">
                          {room.name}
                        </h3>
                        {isHigh && (
                          <Badge className="bg-orange-600 text-white border-none text-xs">
                            Temporada Alta
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-bold mb-2 uppercase">
                        Unidad #{room.numberBedroom}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                        <Users className="h-3.5 w-3.5 text-orange-600" />
                        <span>Capacidad: {room.capacity} pers.</span>
                      </div>
                    </div>
                    <div className="text-right flex flex-col justify-center">
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                        C$ {price.toLocaleString()} × {nights} nts
                      </p>
                      <p className="text-xl font-black text-slate-900 dark:text-slate-100">
                        C$ {(price * nights).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Gran Total */}
          <Card className="border-none bg-orange-400 text-white shadow-2xl overflow-hidden">
            <div className="h-1.5 bg-orange-600 w-full" />
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/70 font-black uppercase tracking-widest">
                    Total de la reserva
                  </p>
                  <p className="text-[10px] text-white/60 font-bold mt-1 uppercase tracking-tighter">
                    Impuestos y tasas incluidos
                  </p>
                </div>
                <p className="text-4xl font-black text-white tracking-tighter">
                  C$ {getTotalPrice().toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Acciones */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              disabled={isConfirming}
              className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold dark:bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Editar datos
            </Button>
            <Button
              disabled={isConfirming}
              onClick={handleConfirmBooking}
              size="lg"
              variant="save"
            >
              {isConfirming ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Procesando
                </div>
              ) : (
                <div className="flex items-center gap-2 text-lg">
                  Confirmar Reserva <CheckCircle className="h-5 w-5 ml-1" />
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
