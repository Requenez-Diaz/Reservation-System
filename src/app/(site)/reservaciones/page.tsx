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

  // Calculamos totales de la reserva completa
  const totalGuests = details.reduce(
    (sum, d) => sum + (d.guestQuantity || 0),
    0
  );
  const totalPrice = details.reduce((sum, d) => sum + (d.price || 0), 0);
  const extraRooms = details.length - 1;

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
    <Card className="overflow-hidden hover:shadow-lg transition-all border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-900">
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

        {/* Indicador de habitaciones adicionales (+1, +2...) */}
        {extraRooms > 0 && (
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-orange-700/80 text-white border-none backdrop-blur-md font-bold px-2 py-1">
              +{extraRooms}{' '}
              {extraRooms === 1 ? 'habitación extra' : 'habitaciones extras'}
            </Badge>
          </div>
        )}

        <Badge
          className={`absolute top-3 right-3 ${getStatusColor(reservation.status)} border shadow-sm uppercase text-[10px] px-2 py-1`}
        >
          {reservation.status === 'PENDING'
            ? 'Pendiente'
            : reservation.status === 'CONFIRMED'
              ? 'Confirmada'
              : 'Cancelada'}
        </Badge>
      </div>

      <CardHeader className="p-4 pb-2">
        <h3 className="font-bold text-lg text-gray-900 dark:text-slate-100 line-clamp-1">
          {bedroom?.TypeBedrooms?.nameType || 'Habitación'} #
          {bedroom?.numberBedroom || 'N/A'}
        </h3>
        <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-1 italic">
          {bedroom?.description || 'Sin descripción disponible'}
        </p>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Calendar className="h-4 w-4 text-orange-600" />
            <span className="font-medium">
              {firstDetail?.dateStart
                ? format(new Date(firstDetail.dateStart), 'dd MMM yyyy', {
                  locale: es
                })
                : '--'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Users className="h-4 w-4 text-orange-600" />
            <span className="font-medium">{totalGuests} pers. total</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-3 mt-2">
          <span className="text-xs text-gray-500 dark:text-slate-400 font-bold uppercase tracking-wider">
            Total Estancia:
          </span>
          <span className="text-xl font-black text-orange-600">
            C$ {totalPrice.toLocaleString()}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={`/reservaciones/${reservation.id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full gap-2 border-slate-200 dark:border-slate-700 hover:bg-orange-50 dark:hover:bg-slate-700 hover:text-orange-700 dark:hover:text-orange-400 hover:border-orange-200 dark:hover:border-slate-600 transition-colors"
          >
            <Info className="h-4 w-4" />
            Ver detalles completos
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

  // Casteo seguro de datos de Prisma
  const typedReservations = (reservations || []) as unknown as Reservation[];

  if (!success || typedReservations.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center px-4 max-w-md">
          <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="text-orange-600 h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2">
              No tienes reservas aún
            </h1>
            <p className="text-gray-500 dark:text-slate-400 mb-8">
              Parece que no has realizado ninguna reservación en Hotel Madroño.
            </p>
            <Link href="/">
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg">
                Reservar ahora
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pb-20">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-3">
              Mis Reservaciones
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Gestiona tus estancias en{' '}
              <span className="font-bold text-orange-600 underline underline-offset-4 decoration-orange-200">
                Hotel Madroño
              </span>
              .
            </p>
          </div>
          <Link href="/">
            <Button
              variant="ghost"
              className="gap-2 text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" /> Volver al inicio
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
