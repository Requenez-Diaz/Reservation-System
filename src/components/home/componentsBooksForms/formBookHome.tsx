'use client';

import * as React from 'react';
import { MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getAllBedrooms } from '@/app/actions/get-bedrooms';
import Link from 'next/link';

interface Bedroom {
  id: number;
  typeBedroom: string;
  description: string;
  lowSeasonPrice: number;
  highSeasonPrice: number;
  status: boolean;
  numberBedroom: number;
  seasonsId: number;
  amenities: any[];
  capacity: number;
  bookingsDetails: any[];
}

export default function BedroomSearch() {
  const [open, setOpen] = React.useState(false);
  const [roomType, setRoomType] = React.useState('');
  const [guests, setGuests] = React.useState(1);
  const [bedrooms, setBedrooms] = React.useState<Bedroom[]>([]);
  const [searchResults, setSearchResults] = React.useState<Bedroom[]>([]);

  React.useEffect(() => {
    const fetchBedrooms = async () => {
      try {
        const response: Bedroom[] = await getAllBedrooms();
        console.log('API Response:', response);

        if (!Array.isArray(response) || response.length === 0) {
          console.error('API response is not an array or is empty');
          return;
        }

        console.log('Bedrooms:', response);
        setBedrooms(response);
      } catch (error) {
        console.error('Error fetching bedrooms:', error);
      }
    };

    fetchBedrooms();
  }, []);

  const handleSearch = () => {
    console.log('Search parameters:', { roomType, guests });
    console.log('Available bedrooms:', bedrooms);

    const results = bedrooms.filter(
      (bedroom) =>
        bedroom.typeBedroom.toLowerCase().includes(roomType.toLowerCase()) &&
        bedroom.capacity >= guests
    );

    console.log('Search results:', results);
    setSearchResults(results);
  };

  return (
    <div className="w-full bg-gradient-to-b from-primary/10 to-background p-8">
      <Card className="mx-auto max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold tracking-tight">
            ¿Qué quieres buscar?
          </CardTitle>
          <CardDescription className="text-lg">
            Descubre el mejor lugar para ti!!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-[1fr,auto,auto] md:items-center">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-start text-left font-normal"
                  >
                                   
                    <MapPin className="mr-2 h-4 w-4 shrink-0 opacity-50" />     
                               {' '}
                    {roomType
                      ? bedrooms.find(
                          (bedroom) => bedroom.typeBedroom === roomType
                        )?.typeBedroom
                      : 'Buscar tipo de habitación...'}
                                   {' '}
                  </Button>
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput
                    placeholder="Buscar tipo de habitación..."
                    value={roomType}
                    onValueChange={setRoomType}
                  />
                  <CommandList>
                    <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                    <CommandGroup>
                      {bedrooms.map((bedroom) => (
                        <CommandItem
                          key={bedroom.id}
                          onSelect={() => {
                            setRoomType(bedroom.typeBedroom);
                            setOpen(false);
                          }}
                        >
                          {bedroom.typeBedroom}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
              >
                -
              </Button>
              <div className="flex items-center gap-2 px-4">
                <Users className="h-4 w-4" />
                <span>{guests}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => setGuests((prev) => prev + 1)}
              >
                +
              </Button>
            </div>

            <Button className="" variant={'save'} onClick={handleSearch}>
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <Card className="mx-auto max-w-4xl mt-8">
          <CardHeader>
            <CardTitle>Resultados de la búsqueda</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {searchResults.map((bedroom) => (
                <li key={bedroom.id} className="border-b pb-4">
                  <Link
                    href={`/habitaciones/${bedroom.id}`}
                    className="block hover:bg-gray-100 p-2 rounded"
                  >
                    <h3 className="text-lg font-semibold">
                      {bedroom.typeBedroom}
                    </h3>
                    <p>{bedroom.description}</p>
                    <p>Capacidad: {bedroom.capacity} personas</p>
                    <p>Precio temporada baja: ${bedroom.lowSeasonPrice}</p>
                    <p>Precio temporada alta: ${bedroom.highSeasonPrice}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
