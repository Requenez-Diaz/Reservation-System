// @/components/home/componentsBooksForms/room-selection.tsx
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
import { format, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NoAvailableRooms } from './no-available-rooms';

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

interface RoomSelectionProps {
  allBedrooms: BedroomFromDB[];
  canAccommodateAllGuests: boolean;
}

interface SearchData {
  guests: number;
  roomCount: number;
  dateRange?: { from: Date; to: Date };
}

interface SavedRoom {
  id: string;
}

export function RoomSelection({ allBedrooms, canAccommodateAllGuests }: RoomSelectionProps) {
  const [selectedRooms, setSelectedRooms] = React.useState<string[]>([]);
  const [searchData, setSearchData] = React.useState<SearchData>({
    guests: 2,
    roomCount: 1
  });
  const [availableRooms, setAvailableRooms] = React.useState<BedroomFromDB[]>(
    []
  );
  const [isPageLoading, setIsPageLoading] = React.useState(true);
  const { toast } = useToast();
  const router = useRouter();

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
      const savedDates = localStorage.getItem('selectedDates');
      const savedGuests = localStorage.getItem('selectedGuests');
      const savedRoomCount = localStorage.getItem('selectedRoomCount');
      const savedFilteredRooms = localStorage.getItem('filteredRooms');

      if (savedDates) {
        const { from, to } = JSON.parse(savedDates);
        setSearchData((prev: SearchData) => ({
          ...prev,
          dateRange: { from: new Date(from), to: new Date(to) }
        }));
      }

      if (savedGuests) {
        setSearchData((p: SearchData) => ({
          ...p,
          guests: Number(savedGuests)
        }));
      }

      if (savedRoomCount) {
        setSearchData((p: SearchData) => ({
          ...p,
          roomCount: Number(savedRoomCount)
        }));
      }

      let matchedRooms: BedroomFromDB[] = [];
      if (savedFilteredRooms) {
        const filteredIds = JSON.parse(savedFilteredRooms).map((r: SavedRoom) =>
          String(r.id)
        );
        matchedRooms = allBedrooms.filter((bedroom) =>
          filteredIds.includes(String(bedroom.id))
        );
      } else {
        matchedRooms = [...allBedrooms];
      }

      matchedRooms.sort((a, b) => {
        const priceA = isHighSeasonActive(a)
          ? a.highSeasonPrice
          : a.lowSeasonPrice;
        const priceB = isHighSeasonActive(b)
          ? b.highSeasonPrice
          : b.lowSeasonPrice;
        return priceA - priceB;
      });

      setAvailableRooms(matchedRooms);
      setIsPageLoading(false);
    } catch (error) {
      console.error('Error en RoomSelection:', error);
      setIsPageLoading(false);
    }
  }, [allBedrooms]);

  const toggleRoomSelection = (roomId: string) => {
    setSelectedRooms((prev) => {
      if (prev.includes(roomId)) {
        return prev.filter((id) => id !== roomId);
      }
      if (prev.length >= searchData.roomCount) {
        toast({ title: 'Límite alcanzado', variant: 'destructive' });
        return prev;
      }
      return [...prev, roomId];
    });
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
    const selected = availableRooms.filter((room) =>
      selectedRooms.includes(room.id)
    );
    const nightlyTotal = selected.reduce((sum, room) => {
      const price = isHighSeasonActive(room)
        ? room.highSeasonPrice
        : room.lowSeasonPrice;
      return sum + price;
    }, 0);
    return nightlyTotal * calculateNights();
  };

  const handleReserve = () => {
    const details = availableRooms.filter((room) =>
      selectedRooms.includes(room.id)
    );

    // Incluir la información de temporada al guardar
    const roomsWithSeason = details.map((room) => ({
      ...room,
      Season: room.Season
    }));

    localStorage.setItem(
      'selectedRoomsForBooking',
      JSON.stringify(roomsWithSeason)
    );
    router.push('/booking/form');
  };

  if (isPageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center italic text-slate-400">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <header className="border-b dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
            Madroño{' '}
            <span className="text-sm font-normal text-gray-600 dark:text-slate-400">
              HOTEL
            </span>
          </div>
          <Link
            href="/"
            className="text-sm text-gray-600 dark:text-slate-400 hover:text-gray-900"
          >
            Volver a búsqueda
          </Link>
        </div>
      </header>

      {searchData.dateRange && (
        <div className="border-b dark:border-slate-800 bg-orange-50 dark:bg-slate-900/50 py-4">
          <div className="mx-auto max-w-7xl px-4 flex flex-wrap gap-4 text-sm items-center">
            <span className="font-semibold">Fechas:</span>
            <span className="text-gray-600">
              {format(searchData.dateRange.from, 'dd MMM', { locale: es })} -{' '}
              {format(searchData.dateRange.to, 'dd MMM yyyy', { locale: es })}
            </span>
            <Badge variant="secondary">{calculateNights()} noche(s)</Badge>
          </div>
        </div>
      )}

      {!canAccommodateAllGuests && <NoAvailableRooms />}

      <div className="mx-auto max-w-7xl px-4 py-8 pb-32">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-slate-100">
          Habitaciones Disponibles
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allBedrooms.map((room) => {
            const isSelected = selectedRooms.includes(room.id);
            const isHigh = isHighSeasonActive(room);
            const currentPrice = isHigh
              ? room.highSeasonPrice
              : room.lowSeasonPrice;

            return (
              <Card
                key={room.id}
                className={`relative overflow-hidden border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all duration-300 ${isSelected ? 'ring-2 ring-orange-600 shadow-lg' : 'hover:shadow-md'}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="h-full w-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white shadow-md">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                  {isHigh && (
                    <Badge className="absolute bg-orange-600 left-4 bottom-4 border-none shadow-lg">
                      Temporada Alta
                    </Badge>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{room.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
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
                        C$ {currentPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-600">/noche</span>
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

        {selectedRooms.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 border-t bg-white dark:bg-slate-900 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                  Total: C$ {getTotalPrice().toLocaleString()}
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
