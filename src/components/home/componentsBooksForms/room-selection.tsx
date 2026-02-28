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
import Link from 'next/link';

// --- INTERFACES ---
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
  seasonName?: string | null;
}

interface RoomSelectionProps {
  allBedrooms: BedroomFromDB[];
}

export function RoomSelection({ allBedrooms }: RoomSelectionProps) {
  const [selectedRooms, setSelectedRooms] = React.useState<string[]>([]);
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

        const matchedRooms = allBedrooms.filter((bedroom) =>
          filteredIds.includes(String(bedroom.id))
        );

        setAvailableRooms(matchedRooms);
      } else {
        setAvailableRooms(allBedrooms);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error loading selection data:', error);
      setAvailableRooms([]);
      setIsLoading(false);
    }
  }, [allBedrooms]);

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
    localStorage.setItem(
      'selectedRoomsForBooking',
      JSON.stringify(selectedRoomDetails)
    );
    router.push('/booking/form');
  };

  const calculateNights = () => {
    if (!searchData.dateRange) {
      return 1;
    }
    const diff =
      searchData.dateRange.to.getTime() - searchData.dateRange.from.getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const getTotalPrice = () => {
    const selectedRoomDetails = availableRooms.filter((room) =>
      selectedRooms.includes(room.id)
    );
    const nightlyTotal = selectedRoomDetails.reduce((sum, room) => {
      const isHigh = room.seasonName?.toLowerCase().includes('alta');
      const price = isHigh ? room.highSeasonPrice : room.lowSeasonPrice;
      return sum + price;
    }, 0);
    return nightlyTotal * calculateNights();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 dark:border-slate-700 border-t-teal-600 dark:border-t-teal-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-slate-400">Cargando habitaciones...</p>
        </div>
      </div>
    );
  }

  if (availableRooms.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-2">
            No hay habitaciones disponibles
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="border-b dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
            Madroño{' '}
            <span className="text-sm font-normal text-gray-600 dark:text-slate-400">HOTEL</span>
          </div>
          <Link href="/" className="text-sm text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200">
            Volver a búsqueda
          </Link>
        </div>
      </header>

      {/* Resumen de búsqueda */}
      {searchData.dateRange && (
        <div className="border-b dark:border-slate-800 bg-orange-50 dark:bg-slate-900/50 py-4">
          <div className="mx-auto max-w-7xl px-4 flex flex-wrap gap-4 text-sm items-center">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700 dark:text-slate-300">Fechas:</span>
              <span className="text-gray-600 dark:text-slate-400">
                {format(searchData.dateRange.from, 'dd MMM', { locale: es })} -{' '}
                {format(searchData.dateRange.to, 'dd MMM yyyy', { locale: es })}
              </span>
              <Badge variant="secondary">{calculateNights()} noche(s)</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700 dark:text-slate-300">Huéspedes:</span>
              <span className="text-gray-600 dark:text-slate-400">{searchData.guests}</span>
            </div>
          </div>
        </div>
      )}

      {/* Grid Principal */}
      <div className="mx-auto max-w-7xl px-4 py-8 pb-32">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
            Habitaciones Disponibles
          </h1>
          <p className="text-gray-600 dark:text-slate-400">
            Selecciona hasta {searchData.roomCount} habitación(es).
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableRooms.map((room) => {
            const isSelected = selectedRooms.includes(room.id);
            const isHighSeason = room.seasonName
              ?.toLowerCase()
              .includes('alta');

            return (
              <Card
                key={room.id}
                className={`relative overflow-hidden border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all duration-300 ${isSelected ? 'ring-2 ring-orange-600 shadow-lg' : 'hover:shadow-md'}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={room.image || '/placeholder.svg'}
                    alt={room.name}
                    className="h-full w-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                  {room.seasonName && (
                    <Badge className="absolute bg-orange-600 left-4 bottom-4">
                      {room.seasonName}
                    </Badge>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-xl dark:text-slate-100">{room.name}</CardTitle>
                  <CardDescription className="line-clamp-2 dark:text-slate-400">
                    {room.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-slate-400">
                    <Users className="h-4 w-4" />
                    <span>Hasta {room.capacity} personas</span>
                  </div>
                  <div className="border-t dark:border-slate-700 pt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                        C${' '}
                        {isHighSeason
                          ? room.highSeasonPrice
                          : room.lowSeasonPrice}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-slate-400">/noche</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    onClick={() => toggleRoomSelection(room.id)}
                    className={`w-full ${isSelected ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'}`}
                  >
                    {isSelected ? 'Seleccionada' : 'Seleccionar habitación'}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Barra Inferior Sticky */}
        {selectedRooms.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 border-t dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg z-50">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  {selectedRooms.length} de {searchData.roomCount} seleccionadas
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                  Total: C${getTotalPrice().toLocaleString()}
                </p>
              </div>
              <Button
                onClick={handleReserve}
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Continuar reserva <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
