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
  MapPin,
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
  firstName: string;
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
    // Cargar datos guardados
    const savedRooms = localStorage.getItem('selectedRoomsForBooking');
    const savedCustomer = localStorage.getItem('bookingCustomerData');
    const savedDates = localStorage.getItem('selectedDates');
    const savedGuests = localStorage.getItem('selectedGuests');
    const savedRoomCount = localStorage.getItem('selectedRoomCount');

    if (!savedRooms || !savedCustomer) {
      router.push('/');
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
  }, [router]);

  const calculateNights = () => {
    if (!searchData.dateRange) {
      return 0;
    }
    return Math.ceil(
      (searchData.dateRange.to.getTime() -
        searchData.dateRange.from.getTime()) /
        (1000 * 60 * 60 * 24)
    );
  };

  const getTotalPrice = () => {
    const nightlyTotal = selectedRooms.reduce(
      (sum, room) => sum + room.lowSeasonPrice,
      0
    );
    return nightlyTotal * (calculateNights() || 1);
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
      // Paso 1: Obtener o crear usuario
      const userResult = await getOrCreateGuestUser(
        customerData.email,
        `${customerData.firstName} ${customerData.lastName}`
      );

      if (!userResult.success || !userResult.user) {
        throw new Error(userResult.error || 'Error al procesar el usuario');
      }

      // Paso 2: Crear la reserva con todos los detalles
      const reservationData = {
        userId: userResult.user.id,
        rooms: selectedRooms.map((room) => ({
          bedroomId: Number.parseInt(room.id, 10),
          dateStart: searchData.dateRange!.from,
          dateEnd: searchData.dateRange!.to,
          price: room.lowSeasonPrice * calculateNights(),
          guestQuantity: searchData.guests
        }))
      };

      const result = await createReservation(reservationData);

      if (!result.success) {
        throw new Error(result.error || 'Error al crear la reserva');
      }

      toast({
        title: '¡Reserva confirmada!',
        description: `Tu reserva #${result.reservation?.id} ha sido procesada exitosamente. Recibirás un email de confirmación.`
      });

      // Limpiar localStorage
      localStorage.removeItem('selectedRoomsForBooking');
      localStorage.removeItem('bookingCustomerData');
      localStorage.removeItem('filteredRooms');
      localStorage.removeItem('selectedDates');
      localStorage.removeItem('selectedGuests');
      localStorage.removeItem('selectedRoomCount');

      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('[v0] Error confirming booking:', error);
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
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-yellow-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="text-2xl font-bold text-gray-900">
            Hotel
            <span className="ml-1 text-sm font-normal text-gray-600">
              Madroño
            </span>
          </div>
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </div>
      </header>

      {/* Progress Steps */}
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

      {/* Summary Content */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-balance text-3xl font-bold text-gray-900 mb-2">
            Resumen de tu reserva
          </h1>
          <p className="text-pretty text-gray-600">
            Verifica que toda la información sea correcta antes de confirmar
          </p>
        </div>

        <div className="grid gap-6">
          {/* Información de estadía */}
          {searchData.dateRange && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-yellow-600" />
                  Información de estadía
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
                  <span className="text-gray-600">Huéspedes:</span>
                  <span className="font-semibold">{searchData.guests}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Habitaciones seleccionadas */}
          <Card>
            <CardHeader>
              <CardTitle>Habitaciones seleccionadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedRooms.map((room) => (
                <div
                  key={room.id}
                  className="flex gap-4 border-b pb-4 last:border-0 last:pb-0"
                >
                  <img
                    src={room.image || '/placeholder.svg'}
                    alt={room.name}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{room.name}</h3>
                    <p className="text-sm text-gray-600">{room.description}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>Hasta {room.capacity} personas</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Por noche</p>
                    <p className="text-xl font-bold text-gray-900">
                      C${room.lowSeasonPrice}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Datos del huésped */}
          {customerData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-teal-600" />
                  Datos del huésped
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Nombre completo</p>
                    <p className="font-semibold">
                      {customerData.firstName} {customerData.lastName}
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
                {(customerData.country ||
                  customerData.city ||
                  customerData.address) && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Ubicación</p>
                      <p className="font-semibold">
                        {[
                          customerData.address,
                          customerData.city,
                          customerData.country
                        ]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                    </div>
                  </div>
                )}
                {customerData.comments && (
                  <div className="border-t pt-3">
                    <p className="text-sm text-gray-600">Comentarios</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {customerData.comments}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Total */}
          <Card className="border-orange-600 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total a pagar</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedRooms.length} habitación(es) × {calculateNights()}{' '}
                    noche(s)
                  </p>
                </div>
                <p className="text-4xl font-bold text-teal-900">
                  C${getTotalPrice().toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Botones de acción */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="gap-2"
              disabled={isConfirming}
            >
              <ArrowLeft className="h-4 w-4" />
              Editar datos
            </Button>
            <Button
              disabled={isConfirming}
              onClick={handleConfirmBooking}
              size="lg"
              variant={'save'}
            >
              {isConfirming ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Procesando...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Confirmar reserva
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
