'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  ArrowLeft,
  Calendar,
  Users,
  Mail,
  Phone,
  CheckCircle
} from 'lucide-react';
import {
  createReservation,
  getOrCreateGuestUser
} from '@/app/actions/reservations/reservations';

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
  }>({ guests: 2, roomCount: 1 });
  const [isLoading, setIsLoading] = React.useState(true);
  const [isConfirming, setIsConfirming] = React.useState(false);

  React.useEffect(() => {
    const savedRooms = localStorage.getItem('selectedRoomsForBooking');
    const savedCustomer = localStorage.getItem('bookingCustomerData');
    const savedDates = localStorage.getItem('selectedDates');
    const savedGuests = localStorage.getItem('selectedGuests');
    const savedRoomCount = localStorage.getItem('selectedRoomCount');

    if (!savedRooms) {
      toast({
        title: 'No hay habitaciones seleccionadas',
        description: 'Por favor selecciona una habitación primero.',
        variant: 'destructive'
      });
      router.push('/habitaciones');
      return;
    }

    if (!savedCustomer) {
      toast({
        title: 'Faltan datos personales',
        description: 'Por favor completa tus datos primero.',
        variant: 'destructive'
      });
      router.push('/booking/form');
      return;
    }

    setSelectedRooms(JSON.parse(savedRooms));
    setCustomerData(JSON.parse(savedCustomer));

    if (savedDates) {
      const { from, to } = JSON.parse(savedDates);
      setSearchData((prev) => ({
        ...prev,
        dateRange: {
          from: new Date(from),
          to: new Date(to)
        }
      }));
    }

    if (savedGuests) {
      setSearchData((prev) => ({
        ...prev,
        guests: Number.parseInt(savedGuests, 10)
      }));
    }

    if (savedRoomCount) {
      setSearchData((prev) => ({
        ...prev,
        roomCount: Number.parseInt(savedRoomCount, 10)
      }));
    }

    setIsLoading(false);
  }, [router, toast]);

  const calculateNights = () => {
    if (!searchData.dateRange) {
      return 0;
    }
    const diffTime = Math.abs(
      searchData.dateRange.to.getTime() - searchData.dateRange.from.getTime()
    );
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getTotalPrice = () => {
    const nights = calculateNights() || 1;
    const nightlyTotal = selectedRooms.reduce(
      (sum, room) => sum + room.lowSeasonPrice,
      0
    );
    return nightlyTotal * nights;
  };

  const handleConfirmBooking = async () => {
    if (!customerData || !searchData.dateRange) {
      toast({
        title: 'Error',
        description: 'Faltan datos para completar la reserva.',
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
        throw new Error(userResult.error || 'Error al procesar el usuario');
      }

      const totalGuests = searchData.guests;
      const roomCount = selectedRooms.length;
      const nights = calculateNights();

      const guestsPerRoomBase = Math.floor(totalGuests / roomCount);
      let remainingGuests = totalGuests % roomCount;

      const reservationData = {
        userId: userResult.user.id,
        rooms: selectedRooms.map((room) => {
          const assignedGuests =
            guestsPerRoomBase + (remainingGuests > 0 ? 1 : 0);
          if (remainingGuests > 0) {
            remainingGuests--;
          }

          return {
            bedroomId: Number.parseInt(room.id, 10),
            dateStart: searchData.dateRange!.from,
            dateEnd: searchData.dateRange!.to,
            price: room.lowSeasonPrice * nights,
            guestQuantity: assignedGuests
          };
        })
      };

      const result = await createReservation(reservationData);

      if (!result.success) {
        throw new Error(result.error || 'Error al crear la reserva');
      }

      toast({
        title: '¡Reserva en proceso!',
        description: `Tu reserva #${result.reservation?.id} ha sido procesada exitosamente.`
      });

      localStorage.removeItem('selectedRoomsForBooking');
      localStorage.removeItem('bookingCustomerData');
      localStorage.removeItem('filteredRooms');
      localStorage.removeItem('selectedDates');
      localStorage.removeItem('selectedGuests');
      localStorage.removeItem('selectedRoomCount');

      router.push(`/reservaciones/${result.reservation?.id}`);
    } catch (error) {
      toast({
        title: 'Error al confirmar reserva',
        description:
          error instanceof Error
            ? error.message
            : 'Por favor intenta de nuevo.',
        variant: 'destructive'
      });
    } finally {
      setIsConfirming(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-teal-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="text-2xl font-bold text-gray-900">
            Hotel{' '}
            <span className="ml-1 text-sm font-normal text-gray-600">
              MADROÑO
            </span>
          </div>
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Volver
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-sm font-semibold text-white">
                ✓
              </div>
              <span className="text-sm text-gray-600">Datos personales</span>
            </div>
            <div className="h-px w-16 bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-sm font-semibold text-white">
                2
              </div>
              <span className="text-sm font-medium text-orange-600">
                Resumen
              </span>
            </div>
            <div className="h-px w-16 bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-sm font-semibold text-gray-600">
                3
              </div>
              <span className="text-sm text-gray-600">Confirmación</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Resumen de tu reserva
          </h1>
          <p className="text-gray-600">
            Verifica que toda la información sea correcta antes de confirmar
          </p>
        </div>

        <div className="grid gap-6">
          {/* Info Estadía */}
          {searchData.dateRange && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-teal-600" /> Información de
                  estadía
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in:</span>
                  <span className="font-semibold">
                    {format(searchData.dateRange.from, "dd 'de' MMMM yyyy", {
                      locale: es
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-out:</span>
                  <span className="font-semibold">
                    {format(searchData.dateRange.to, "dd 'de' MMMM yyyy", {
                      locale: es
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Noches:</span>
                  <Badge variant="secondary">
                    {calculateNights()} noche(s)
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Huéspedes totales:</span>
                  <span className="font-semibold">{searchData.guests}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Habitaciones Seleccionadas con Subtotales */}
          <Card>
            <CardHeader>
              <CardTitle>Habitaciones seleccionadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedRooms.map((room) => {
                const nights = calculateNights() || 1;
                const subtotal = room.lowSeasonPrice * nights;

                return (
                  <div
                    key={room.id}
                    className="flex flex-col sm:flex-row gap-4 border-b pb-4 last:border-0 last:pb-0"
                  >
                    <img
                      src={room.image || '/placeholder.svg'}
                      alt={room.name}
                      className="h-24 w-24 rounded-lg object-cover mx-auto sm:mx-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {room.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {room.description}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                        <Users className="h-3 w-3" />
                        <span>Capacidad: {room.capacity} pers.</span>
                      </div>
                    </div>
                    <div className="text-right flex flex-col justify-center">
                      <p className="text-xs text-gray-500">
                        C${room.lowSeasonPrice} × {nights}{' '}
                        {nights > 1 ? 'noches' : 'noche'}
                      </p>
                      <p className="text-lg font-bold text-teal-700">
                        Subtotal: C${subtotal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Datos Cliente */}
          {customerData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-teal-600" /> Datos del huésped
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Nombre completo</p>
                    <p className="font-semibold">
                      {customerData.username} {customerData.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{customerData.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <p className="font-semibold">{customerData.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Gran Total */}
          <Card className="border-orange-600 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Total Final
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Impuestos y tasas incluidos
                  </p>
                </div>
                <p className="text-4xl font-bold text-teal-900">
                  C${getTotalPrice().toLocaleString()}
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
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />{' '}
                  Procesando...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" /> Confirmar reserva
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
