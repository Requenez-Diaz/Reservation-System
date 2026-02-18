import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUserReservations } from '@/app/actions/reservations/get-reservations-user';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Users, Info, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

// --- INTERFACES DE TYPESCRIPT ---
interface BedroomImage {
  imageContent: string | null;
}

interface TypeBedroom {
  nameType: string;
}

interface Bedroom {
  numberBedroom: number;
  description: string;
  galleryImages: BedroomImage[];
  TypeBedrooms: TypeBedroom | null;
}

interface ReservationDetail {
  id: number;
  price: number;
  dateStart: Date;
  dateEnd: Date;
  guestQuantity: number;
  Bedrooms: Bedroom;
}

interface Reservation {
  id: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  createdAt: Date;
  ReservationDetails: ReservationDetail[];
}

// --- COMPONENTE INTERNO: ReservationCard ---
function ReservationCard({ reservation }: { reservation: Reservation }) {
  if (!reservation) {
    return null;
  }

  const details = reservation.ReservationDetails || [];
  const firstDetail = details[0];
  const bedroom = firstDetail?.Bedrooms;
  const imageUrl = bedroom?.galleryImages?.[0]?.imageContent;

  const totalPrice = details.reduce(
    (sum: number, d: ReservationDetail) => sum + (d.price || 0),
    0
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'PENDING':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all border-slate-200">
      <div className="relative h-48 w-full bg-slate-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Habitación"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400 text-xs">
            Sin imagen disponible
          </div>
        )}
        <Badge
          className={`absolute top-3 right-3 ${getStatusColor(reservation.status)} border shadow-sm uppercase text-[10px]`}
        >
          {reservation.status === 'PENDING'
            ? 'Pendiente'
            : reservation.status === 'CONFIRMED'
              ? 'Confirmada'
              : 'Cancelada'}
        </Badge>
      </div>

      <CardHeader className="p-4 pb-2">
        <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
          {bedroom?.TypeBedrooms?.nameType || 'Habitación'} #
          {bedroom?.numberBedroom || 'N/A'}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-1">
          {bedroom?.description}
        </p>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-3">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-orange-600" />
            <span>
              {firstDetail?.dateStart
                ? format(new Date(firstDetail.dateStart), 'dd MMM', {
                    locale: es
                  })
                : '--'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-orange-600" />
            <span>{firstDetail?.guestQuantity || 0} pers.</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-3 mt-2">
          <span className="text-sm text-gray-500 font-medium">Total:</span>
          <span className="text-xl font-bold text-orange-600">
            C$ {totalPrice.toLocaleString()}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={`/reservaciones/${reservation.id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full gap-2 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200"
          >
            <Info className="h-4 w-4" />
            Detalles de reserva
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

// --- PÁGINA PRINCIPAL ---
export default async function ReservationsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/sign-in');
  }

  const userId = Number(session.user.id);
  const { success, reservations } = await getUserReservations(userId);

  // Aseguramos que reservations sea tratado como el tipo definido
  const typedReservations = (reservations || []) as unknown as Reservation[];

  if (!success || typedReservations.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center px-4 max-w-md">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              No hay reservaciones
            </h1>
            <p className="text-gray-500 mb-6">
              Parece que aún no has planeado tu próxima estancia con nosotros.
            </p>
            <Link href="/">
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                Explorar Habitaciones
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              Mis Reservaciones
            </h1>
            <p className="text-lg text-gray-600">
              Historial de tus estancias en{' '}
              <span className="font-semibold text-orange-600">
                Hotel Madroño
              </span>
              .
            </p>
          </div>
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-gray-600">
              <ArrowLeft className="h-4 w-4" /> Volver al hotel
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {typedReservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
        </div>
      </div>
    </div>
  );
}
