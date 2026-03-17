'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Bed } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

interface ReservationCardProps {
  reservation: {
    id: number;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | string;
    createdAt: Date | string;
    reservationDetails: Array<{
      id: number;
      dateStart: Date | string;
      dateEnd: Date | string;
      price: number;
      guestQuantity: number;
      bedrooms?: {
        id: number;
        typeBedroom: string;
        numberBedroom: number;
        image?: string;
      } | null;
    }>;
  };
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  CONFIRMED: 'bg-green-100 text-green-800 border-green-200',
  CANCELLED: 'bg-red-100 text-red-800 border-red-200'
} as const;

const statusLabels = {
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmada',
  CANCELLED: 'Cancelada'
} as const;

export function ReservationCard({ reservation }: ReservationCardProps) {
  const router = useRouter();

  // ✅ Si viene vacío o undefined, que no rompa
  const details = reservation.reservationDetails ?? [];
  const totalPrice = details.reduce((sum, d) => sum + (d?.price ?? 0), 0);
  const totalGuests = details.reduce(
    (sum, d) => sum + (d?.guestQuantity ?? 0),
    0
  );
  const roomCount = details.length;

  const firstDetail = details[0];

  // ✅ Fechas seguras
  const dateStart = firstDetail?.dateStart
    ? new Date(firstDetail.dateStart)
    : null;
  const dateEnd = firstDetail?.dateEnd ? new Date(firstDetail.dateEnd) : null;

  // ✅ Imagen segura
  const firstBedroomImage =
    firstDetail?.bedrooms?.image && firstDetail?.bedrooms?.image.trim() !== ''
      ? firstDetail.bedrooms.image
      : '/placeholder.svg';

  const firstBedroomType = firstDetail?.bedrooms?.typeBedroom ?? 'Habitación';

  const handleClick = () => {
    router.push(`/reservaciones/${reservation.id}`);
  };

  const statusClass =
    statusColors[reservation.status as keyof typeof statusColors] ??
    'bg-gray-100 text-gray-800 border-gray-200';
  const statusLabel =
    statusLabels[reservation.status as keyof typeof statusLabels] ??
    reservation.status;

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
      onClick={handleClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">
              Reservación #{reservation.id}
            </CardTitle>
            <CardDescription>
              Creada el{' '}
              {format(new Date(reservation.createdAt), "dd 'de' MMMM, yyyy", {
                locale: es
              })}
            </CardDescription>
          </div>
          <Badge className={statusClass}>{statusLabel}</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          {/* ✅ Imagen (fallback si no hay detalles) */}
          <div className="relative h-40 overflow-hidden rounded-lg">
            <img
              src={firstBedroomImage}
              alt={firstBedroomType}
              className="h-full w-full object-cover"
            />
            {roomCount > 1 && (
              <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                +{roomCount - 1} habitación{roomCount - 1 !== 1 ? 'es' : ''} más
              </Badge>
            )}
          </div>

          {/* Información de la reserva */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>
                {dateStart && dateEnd ? (
                  <>
                    {format(dateStart, 'dd MMM', { locale: es })} -{' '}
                    {format(dateEnd, 'dd MMM yyyy', { locale: es })}
                  </>
                ) : (
                  'Fechas no disponibles'
                )}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>
                {totalGuests} huésped{totalGuests !== 1 ? 'es' : ''}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Bed className="h-4 w-4" />
              <span>
                {roomCount} habitación{roomCount !== 1 ? 'es' : ''}
              </span>
            </div>
          </div>

          {/* Precio total */}
          <div className="border-t pt-3 flex items-center justify-between">
            <span className="text-sm text-gray-600">Total</span>
            <span className="text-2xl font-bold text-gray-900">
              C${Number(totalPrice || 0).toLocaleString('es-NI')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
``;
