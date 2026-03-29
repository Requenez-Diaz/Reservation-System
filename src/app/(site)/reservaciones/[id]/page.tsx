import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Calendar,
  Users,
  Mail,
  ArrowLeft,
  CheckCircle,
  Clock,
  XCircle,
  Info,
  BedDouble
} from 'lucide-react';

import Link from 'next/link';
import { getReservationById } from '@/app/actions/reservations/get-reservation';
import { CancelButton } from '../cancel-button';

interface Bedroom {
  numberBedroom: number | string;
  description?: string | null;
  TypeBedrooms?: {
    nameType: string;
  } | null;
  galleryImages?: { imageContent: string }[];
}

interface ReservationDetail {
  id: number;
  price: number;
  dateStart: Date | string;
  dateEnd: Date | string;
  guestQuantity: number;
  Bedrooms: Bedroom;
}

interface ReservationResult {
  id: number;
  status: string;
  createdAt: Date | string;
  User: {
    username: string;
    email: string;
  };
  ReservationDetails: ReservationDetail[];
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ReservationDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const reservationId = Number.parseInt(resolvedParams.id, 10);

  if (Number.isNaN(reservationId)) {
    notFound();
  }

  const result = await getReservationById(reservationId);

  if (!result.success || !result.reservation) {
    notFound();
  }

  const reservation = result.reservation as ReservationResult;

  // --- FUNCIONES DE CORRECCIÓN DE FECHA ---

  /**
   * Ajusta la fecha para que se muestre según el valor UTC guardado en la DB
   * evitando que el navegador le reste horas por zona horaria.
   */
  const formatDateSafe = (dateSource: Date | string) => {
    const d = new Date(dateSource);
    // Creamos un objeto fecha usando los valores UTC exactos
    const dateUTC = new Date(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate(),
      12,
      0,
      0
    );
    return format(dateUTC, 'dd MMM, yyyy', { locale: es });
  };

  /**
   * Calcula noches usando timestamps UTC para evitar errores de cambio de hora
   */
  const calculateNights = (
    dateStart: Date | string,
    dateEnd: Date | string
  ) => {
    const start = new Date(dateStart);
    const end = new Date(dateEnd);

    const utc1 = Date.UTC(
      start.getUTCFullYear(),
      start.getUTCMonth(),
      start.getUTCDate()
    );
    const utc2 = Date.UTC(
      end.getUTCFullYear(),
      end.getUTCMonth(),
      end.getUTCDate()
    );

    return Math.max(1, Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24)));
  };

  // --- FIN DE CORRECCIONES ---

  const getStatusBadge = (status: string) => {
    const config = {
      PENDING: {
        color: 'bg-amber-100 text-amber-700 border-amber-200',
        icon: Clock,
        label: 'Pendiente'
      },
      CONFIRMED: {
        color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        icon: CheckCircle,
        label: 'Confirmada'
      },
      CANCELLED: {
        color: 'bg-red-100 text-red-700 border-red-200',
        icon: XCircle,
        label: 'Cancelada'
      }
    };
    const current = config[status as keyof typeof config] || config.PENDING;
    const Icon = current.icon;

    return (
      <Badge
        variant="outline"
        className={`px-3 py-1 gap-1.5 font-medium ${current.color}`}
      >
        <Icon className="h-3.5 w-3.5" /> {current.label}
      </Badge>
    );
  };

  const totalPrice = (reservation.ReservationDetails || []).reduce(
    (sum: number, detail: ReservationDetail) => sum + detail.price,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-900 pb-20">
      <div className="bg-white dark:bg-slate-950 border-b dark:border-slate-800 shadow-sm">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <Link
            href="/reservaciones"
            className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors mb-6 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Volver a mis reservaciones
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  Reserva #{reservation.id}
                </h1>
                {getStatusBadge(reservation.status)}
              </div>
              <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Registrada el{' '}
                {/* Usamos formatDateSafe también aquí si createdAt es tipo Date sin hora */}
                {format(new Date(reservation.createdAt), 'PPP', { locale: es })}
              </p>
            </div>
            <div className="md:text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                Inversión total
              </p>
              <p className="text-4xl font-black text-orange-600">
                C${totalPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 mt-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <BedDouble className="h-5 w-5 text-orange-600" />
            Configuración de Habitaciones
          </h2>

          {reservation.ReservationDetails.map((detail: ReservationDetail) => {
            const bedroom = detail.Bedrooms;
            const nights = calculateNights(detail.dateStart, detail.dateEnd);
            const imageUrl = bedroom.galleryImages?.[0]?.imageContent;

            return (
              <Card
                key={detail.id}
                className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all dark:bg-slate-800"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-56 h-48 sm:h-auto relative bg-slate-200">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Room"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
                        <BedDouble className="h-8 w-8 opacity-20" />
                      </div>
                    )}
                  </div>

                  <CardContent className="flex-1 p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <Badge className="mb-2 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/60 border-none rounded-sm px-2 text-[10px] uppercase tracking-wider font-bold">
                            {bedroom.TypeBedrooms?.nameType || 'Habitación'}
                          </Badge>
                          <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            Unidad #{bedroom.numberBedroom}
                          </CardTitle>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                            C${detail.price.toLocaleString()}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">
                            {nights} {nights === 1 ? 'Noche' : 'Noches'}
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg border border-slate-100 dark:border-slate-600 mb-4">
                        <div className="flex gap-2 items-start text-slate-600 dark:text-slate-300">
                          <Info className="h-4 w-4 mt-0.5 text-orange-500 shrink-0" />
                          <p className="text-sm leading-relaxed italic">
                            {bedroom.description ||
                              'Sin descripción adicional disponible para esta habitación.'}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 py-3 border-t border-slate-100 dark:border-slate-700 mt-auto">
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase font-bold text-slate-400 tracking-tighter">
                            Entrada
                          </span>
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            {formatDateSafe(detail.dateStart)}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase font-bold text-slate-400 tracking-tighter">
                            Salida
                          </span>
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            {formatDateSafe(detail.dateEnd)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="space-y-6">
          {/* Card de Titular y Ocupación igual que antes... */}
          <Card className="border-none shadow-sm bg-orange-500 text-white overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase tracking-widest opacity-70">
                Titular de Reserva
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center font-black text-white text-xl shadow-inner">
                  {reservation.User.username[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-lg font-bold">
                    {reservation.User.username}
                  </p>
                  <p className="text-xs text-orange-100/70 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" /> {reservation.User.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden dark:bg-slate-800">
            <div className="h-2 bg-orange-500" />
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4 text-orange-600" />
                Ocupación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                La capacidad total de esta reserva está configurada para recibir
                a un total de{' '}
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {reservation.ReservationDetails.reduce(
                    (acc: number, detail: ReservationDetail) =>
                      acc + detail.guestQuantity,
                    0
                  )}{' '}
                  huéspedes
                </span>
                .
              </p>
            </CardContent>
          </Card>

          {reservation.status === 'PENDING' && (
            <div className="pt-2">
              <CancelButton reservationId={reservation.id} />
            </div>
          )}

          <Button
            variant="outline"
            className="w-full border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400"
            asChild
          >
            <Link href="mailto:alfredorequenez57libra@gmail.com">
              ¿Problemas con los datos?
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
