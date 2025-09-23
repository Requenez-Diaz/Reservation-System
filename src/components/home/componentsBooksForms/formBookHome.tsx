// components/BedroomSearchForm.tsx

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
import { getAllBedrooms } from '@/app/actions/get-bedrooms'; // Mantén el Server Action
import { Bedroom } from '../roomsType';

interface BedroomSearchFormProps {
  onSearch: (results: Bedroom[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}

export default function BedroomSearchForm({
  onSearch,
  setIsLoading,
  isLoading
}: BedroomSearchFormProps) {
  const [open, setOpen] = React.useState(false);
  const [roomType, setRoomType] = React.useState('');
  const [guests, setGuests] = React.useState(1);
  const [bedrooms, setBedrooms] = React.useState<Bedroom[]>([]);

  React.useEffect(() => {
    const fetchBedrooms = async () => {
      try {
        const response: Bedroom[] = await getAllBedrooms();
        if (!Array.isArray(response) || response.length === 0) {
          console.error('API response is not an array or is empty');
          return;
        }
        setBedrooms(response);
      } catch (error) {
        console.error('Error fetching bedrooms:', error);
      }
    };
    fetchBedrooms();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const results = bedrooms.filter(
      (bedroom) =>
        bedroom.typeBedroom.toLowerCase().includes(roomType.toLowerCase()) &&
        bedroom.capacity >= guests
    );

    onSearch(results);
    setIsLoading(false);
  };

  return (
    <Card className="mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
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
            <div className="relative group">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input
                type="search"
                placeholder="Buscar tipo de habitación"
                className="pl-9 transition-all duration-200 focus:scale-[1.02] focus:shadow-md"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              />
            </div>

            <PopoverContent className="p-0 animate-in fade-in slide-in-from-top-2 duration-200">
              <Command>
                <CommandInput placeholder="Buscar tipo de habitación..." />
                <CommandList>
                  <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                  <CommandGroup>
                    {bedrooms.map((bedroom, index) => (
                      <CommandItem
                        key={bedroom.id}
                        className="animate-in fade-in slide-in-from-left-2 duration-200 hover:bg-accent/50 transition-colors"
                        style={{ animationDelay: `${index * 50}ms` }}
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
              className="h-10 w-10 transition-all duration-200 hover:scale-110 active:scale-95 bg-transparent"
              onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
            >
              -
            </Button>
            <div className="flex items-center gap-2 px-4 transition-all duration-300">
              <Users className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              <span className="font-medium tabular-nums transition-all duration-200">
                {guests}
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 transition-all duration-200 hover:scale-110 active:scale-95 bg-transparent"
              onClick={() => setGuests((prev) => prev + 1)}
            >
              +
            </Button>
          </div>
          <Button
            className="relative overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95 disabled:scale-100"
            variant="save"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Buscando...
              </div>
            ) : (
              'Buscar'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
