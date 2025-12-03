'use client';

import * as React from 'react';
import { Check, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

interface SavedRoomData {
  id: string | number;
}

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
  bookingsDetails?: Array<{
    dateStart: string;
    dateEnd?: string;
  }>;
}

interface RoomSelectionProps {
  allBedrooms: BedroomFromDB[];
}

export function RoomSelection({ allBedrooms }: RoomSelectionProps) {
  const [selectedRooms, setSelectedRooms] = React.useState<string[]>([]);
  const [expandedRoom, _setExpandedRoom] = React.useState<string | null>(null);
  const [searchData, setSearchData] = React.useState<{
    dateRange?: { from: Date; to: Date };
    guests: number;
    roomCount: number;
  }>({ guests: 2, roomCount: 1 });
  const [availableRooms, setAvailableRooms] = React.useState<BedroomFromDB[]>(
    []
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const { toast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    try {
      const savedDates = localStorage.getItem('selectedDates');
      const savedGuests = localStorage.getItem('selectedGuests');
      const savedRoomCount = localStorage.getItem('selectedRoomCount');
      const savedFilteredRooms = localStorage.getItem('filteredRooms');

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

      if (savedFilteredRooms) {
        const filteredIds = JSON.parse(savedFilteredRooms).map(
          (r: SavedRoomData) => String(r.id)
        );
        allBedrooms.forEach((bedroom) => {
          console.log(
            `  - Bedroom ID: "${bedroom.id}" (${typeof bedroom.id}) - Includes check: ${filteredIds.includes(String(bedroom.id))}`
          );
        });

        const matchedRooms = allBedrooms.filter((bedroom) =>
          filteredIds.includes(String(bedroom.id))
        );

        setAvailableRooms(matchedRooms);
      } else {
        setAvailableRooms(allBedrooms);
      }

      setIsLoading(false);
    } catch (error) {
      setAvailableRooms([]);
      setIsLoading(false);
    }
  }, [allBedrooms, router]);

  const toggleRoomSelection = (roomId: string) => {
    setSelectedRooms((prev) => {
      if (prev.includes(roomId)) {
        return prev.filter((id) => id !== roomId);
      }

      if (prev.length >= searchData.roomCount) {
        toast({
          title: 'Límite alcanzado',
          description: `Solo puedes seleccionar ${searchData.roomCount} habitación(es).`,
          variant: 'destructive'
        });
        return prev;
      }

      return [...prev, roomId];
    });
  };

  const handleReserve = () => {
    if (selectedRooms.length === 0) {
      toast({
        title: 'Selecciona una habitación',
        description:
          'Debes seleccionar al menos una habitación para continuar.',
        variant: 'destructive'
      });
      return;
    }

    const selectedRoomDetails = availableRooms.filter((room) =>
      selectedRooms.includes(room.id)
    );
    sessionStorage.setItem(
      'selectedRoomsForBooking',
      JSON.stringify(selectedRoomDetails)
    );
    router.push('/booking/form');
  };

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
    const selectedRoomDetails = availableRooms.filter((room) =>
      selectedRooms.includes(room.id)
    );
    const nightlyTotal = selectedRoomDetails.reduce(
      (sum, room) => sum + room.lowSeasonPrice,
      0
    );
    return nightlyTotal * (calculateNights() || 1);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-teal-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando habitaciones disponibles...</p>
        </div>
      </div>
    );
  }
  if (availableRooms.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900 mb-2">
            No hay habitaciones disponibles
          </p>
          <p className="text-gray-600 mb-4">
            No se encontraron habitaciones que cumplan con tus criterios de
            búsqueda
          </p>
          <Button
            onClick={() => router.push('/')}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Volver a buscar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="text-2xl font-bold text-gray-900">
            Madroño
            <span className="ml-1 text-sm font-normal text-gray-600">
              HOTEL
            </span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
              Volver a búsqueda
            </a>
          </nav>
        </div>
      </header>

      {/* Search Summary */}
      {searchData.dateRange && (
        <div className="border-b bg-orange-50 py-4">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Fechas:</span>
                <span className="text-gray-600">
                  {format(searchData.dateRange.from, 'dd MMM', { locale: es })}{' '}
                  -{' '}
                  {format(searchData.dateRange.to, 'dd MMM yyyy', {
                    locale: es
                  })}
                </span>
                <Badge variant="secondary">{calculateNights()} noche(s)</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Huéspedes:</span>
                <span className="text-gray-600">{searchData.guests}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">
                  Habitaciones solicitadas:
                </span>
                <span className="text-gray-600">{searchData.roomCount}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-balance text-3xl font-bold text-gray-900">
            Habitaciones Disponibles
          </h1>
          <p className="text-pretty text-gray-600">
            Selecciona hasta {searchData.roomCount} habitación(es) para tu
            estadía en Hotel Madroño
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Se encontraron {availableRooms.length} habitación(es) disponible(s)
            según tu búsqueda
          </p>
        </div>

        {/* Room Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {availableRooms.map((room) => {
            const isSelected = selectedRooms.includes(room.id);
            const _isExpanded = expandedRoom === room.id;

            return (
              <Card
                key={room.id}
                className={`relative overflow-hidden transition-all duration-300 ${isSelected
                    ? 'ring-2 ring-orange-600 shadow-lg'
                    : 'hover:shadow-md'
                  }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={room.image || '/placeholder.svg'}
                    alt={room.name}
                    className="h-full w-full object-cover"
                  />
                  {room.status && (
                    <Badge className="absolute bg-green-600 left-4 top-4 ">
                      Disponible
                    </Badge>
                  )}
                  {isSelected && (
                    <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{room.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {room.description}
                  </CardDescription>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                    <span>Habitación #{room.numberBedroom}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>Hasta {room.capacity} personas</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-gray-600">
                        Temporada baja
                      </span>
                      <span className="text-2xl font-bold text-gray-900">
                        C${room.lowSeasonPrice}
                      </span>
                      <span className="text-sm text-gray-600">/noche</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        Temporada alta: C${room.highSeasonPrice}/noche
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    onClick={() => toggleRoomSelection(room.id)}
                    className={`w-full ${isSelected
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : 'bg-green-600 hover:bg-green-800'
                      }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Seleccionada
                      </>
                    ) : (
                      'Seleccionar habitación'
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Sticky Bottom Bar */}
        {selectedRooms.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 border-t bg-white shadow-lg">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
              <div>
                <p className="text-sm text-gray-600">
                  {selectedRooms.length} de {searchData.roomCount}{' '}
                  habitación(es) seleccionada(s)
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  Total: C${getTotalPrice().toLocaleString()}
                </p>
              </div>
              <Button onClick={handleReserve} size="lg" variant={'save'}>
                Continuar con la reserva
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
