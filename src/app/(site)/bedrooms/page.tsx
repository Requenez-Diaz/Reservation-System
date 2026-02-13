'use client';

import * as React from 'react';
import {
  Calendar,
  Wifi,
  Coffee,
  Tv,
  Wind,
  MessageCircleMore
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { getAllBedrooms } from '@/app/actions/get-bedrooms';
import { useToast } from '@/components/ui/use-toast';
import { BookingModal } from './booking-modal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { generateWhatsappUrl } from '@/components/bedrooms/messages/message-encode';

interface BedroomImage {
  id: string;
  image: string;
}

interface PropsCardsProps {
  typeBedroom: string;
  description: string;
  lowSeasonPrice: number;
  status: boolean;
  numberBedroom: number;
  slug?: string;
  imageUrl: string;
}

interface Bedroom {
  id: string;
  name: string;
  description: string;
  capacity: number;
  numberBedroom: number;
  status: boolean;
  lowSeasonPrice: number;
  highSeasonPrice: number;
  slug: string;
  BedroomImages?: BedroomImage[];
  bookingsDetails?: Array<{
    dateStart: string;
    dateEnd?: string;
  }>;
  image?: string;
  Seasons?: {
    id: number;
    nameSeason: string;
    dateStart: Date;
    dateEnd: Date;
  } | null;
}

export default function HabitacionesPage({
  typeBedroom,
  numberBedroom,
  lowSeasonPrice
}: PropsCardsProps) {
  const [bedrooms, setBedrooms] = React.useState<Bedroom[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedBedroom, setSelectedBedroom] = React.useState<Bedroom | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { toast } = useToast();

  // Auth + Router
  const { data: session } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    async function fetchBedrooms() {
      try {
        const data = await getAllBedrooms();
        const mappedBedrooms: Bedroom[] = data.map((b) => ({
          id: String(b.id),
          name: b.typeBedroom, // Mapping typeBedroom to name
          description: b.description,
          capacity: b.capacity,
          numberBedroom: b.numberBedroom,
          status: b.status,
          lowSeasonPrice: b.lowSeasonPrice,
          highSeasonPrice: b.highSeasonPrice,
          slug: b.slug,
          image: b.image,
          BedroomImages: b.BedroomImages?.map((img) => ({
            id: String(img.fileName || Math.random()), // fallback id
            image: img.imageContent || ''
          })) || [],
          bookingsDetails: b.reservationDetails?.map((r) => ({
            dateStart: new Date(r.dateStart).toISOString(),
            dateEnd: new Date(r.dateEnd).toISOString()
          })) || [],
          Seasons: b.Seasons
        }));
        setBedrooms(mappedBedrooms);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBedrooms();
  }, []);

  React.useEffect(() => {
    if (session?.user) {
      const pending = localStorage.getItem('pending_booking');
      if (pending) {
        const bedroom = JSON.parse(pending) as Bedroom;
        setSelectedBedroom(bedroom);
        setIsModalOpen(true);
        localStorage.removeItem('pending_booking');
      }
    }
  }, [session]);

  const DEFAULT_IMAGE = '/luxury-hotel-room.png';

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const img = e.currentTarget as HTMLImageElement;
    if (!img.src.endsWith(DEFAULT_IMAGE)) {
      img.src = DEFAULT_IMAGE;
    }
  };

  const _amenities = [
    { icon: Wifi, label: 'WiFi gratis' },
    { icon: Coffee, label: 'Minibar' },
    { icon: Tv, label: 'TV pantalla plana' },
    { icon: Wind, label: 'Aire acondicionado' }
  ];

  const handleReserveClick = (bedroom: Bedroom) => {
    if (!session?.user) {
      localStorage.setItem('pending_booking', JSON.stringify(bedroom));

      toast({
        title: 'Inicia sesión o regístrate',
        description: 'Debes iniciar sesión para continuar con la reserva.'
      });

      router.push('http://localhost:3001/sign-up');
      return;
    }

    // ✔️ Tiene sesión → abrir modal directo
    setSelectedBedroom(bedroom);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-600">Cargando habitaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Nuestras Habitaciones
              </h1>
              <p className="mt-1 text-gray-600">
                Descubre el confort y lujo que ofrecemos
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Rooms */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {bedrooms.map((bedroom) => {
            const imageUrl =
              bedroom.BedroomImages?.[0]?.image ||
              bedroom.image ||
              DEFAULT_IMAGE;

            return (
              <Card
                key={bedroom.id}
                className="overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={bedroom.name}
                    className="h-full w-full object-cover"
                    onError={handleImageError}
                  />
                </div>

                <CardHeader>
                  <CardTitle>{bedroom.name}</CardTitle>
                  <CardDescription>{bedroom.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <p>Capacidad: {bedroom.capacity} personas</p>
                </CardContent>

                <CardFooter className="flex gap-3">
                  <Button
                    onClick={() => handleReserveClick(bedroom)}
                    variant="save"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Reservar ahora
                  </Button>

                  <a
                    href={generateWhatsappUrl(
                      typeBedroom,
                      numberBedroom,
                      lowSeasonPrice
                    )}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Button variant="success">
                      <MessageCircleMore className="mr-2 h-5 w-5" />
                      WhatsApp
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedBedroom && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          bedroom={selectedBedroom}
        />
      )}
    </div>
  );
}
