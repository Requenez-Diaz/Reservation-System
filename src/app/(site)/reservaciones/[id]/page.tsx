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
  XCircle
} from 'lucide-react';

import Link from 'next/link';
import { getReservationById } from '@/app/actions/reservations/get-reservation';

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

  const { reservation } = result;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            Pendiente
          </Badge>
        );
      case 'CONFIRMED':
        return (
          <Badge className="gap-1 bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-3 w-3" />
            Confirmada
          </Badge>
        );
      case 'CANCELLED':
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Cancelada
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const calculateNights = (dateStart: Date, dateEnd: Date) => {
    return Math.max(
      1,
      Math.ceil(
        (new Date(dateEnd).getTime() - new Date(dateStart).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );
  };

  const getTotalPrice = () => {
    return reservation.ReservationDetails.reduce(
      (sum, detail) => sum + detail.price,
      0
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-white-200 to-orange-300 py-8">
        <div className="mx-auto max-w-4xl px-4 text-center text-white">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <CheckCircle className="h-10 w-10 text-orange-600" />
            </div>
          </div>
          <h1 className="text-black mb-2 text-3xl font-bold">
            ¡Reservación en proceso!
          </h1>
          <p className="text-pretty text-black">
            Tu reserva #{reservation.id} ha sido procesada exitosamente
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-balance text-2xl font-bold text-gray-900">
              Detalles de la reserva
            </h2>
            <p className="text-pretty text-gray-600">
              Número de reserva: #{reservation.id}
            </p>
          </div>
          {getStatusBadge(reservation.status)}
        </div>

        <div className="grid gap-6">
          {/* Información del huésped */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-teal-600" />
                Información del huésped
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Nombre</p>
                  <p className="font-semibold">{reservation.User.username}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold">{reservation.User.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Habitaciones reservadas */}
          {reservation.ReservationDetails.map((detail, _index) => {
            const bedroom = detail.Bedrooms;
            const nights = calculateNights(detail.dateStart, detail.dateEnd);

            const imageUrl =
              bedroom.galleryImages && bedroom.galleryImages.length > 0
                ? bedroom.galleryImages[0].imageContent
                : null;

            return (
              <Card key={detail.id}>
                <CardHeader>
                  <CardTitle>
                    {/* CORRECCIÓN: nameType jalado desde la relación TypeBedrooms */}
                    Habitación {bedroom.numberBedroom} -{' '}
                    {bedroom.TypeBedrooms?.nameType || 'Tipo N/A'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={`Habitación ${bedroom.numberBedroom}`}
                        className="h-32 w-32 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1 space-y-3">
                      <p className="text-sm text-gray-600">
                        {bedroom.description}
                      </p>

                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 flex items-center gap-2">
                            <Calendar className="h-4 w-4" /> Check-in:
                          </span>
                          <span className="font-semibold">
                            {format(
                              new Date(detail.dateStart),
                              "dd 'de' MMMM yyyy",
                              { locale: es }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 flex items-center gap-2">
                            <Calendar className="h-4 w-4" /> Check-out:
                          </span>
                          <span className="font-semibold">
                            {format(
                              new Date(detail.dateEnd),
                              "dd 'de' MMMM yyyy",
                              { locale: es }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Noches:</span>
                          <Badge variant="secondary">{nights} noche(s)</Badge>
                        </div>
                        <div className="flex items-center justify-between border-t pt-2 mt-2">
                          <span className="text-gray-600 font-bold">
                            Subtotal:
                          </span>
                          <span className="text-xl font-bold text-orange-600">
                            C${detail.price.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {detail.Promotions &&
                        detail.Promotions.codePromotions !== 'NO_PROMOTION' && (
                          <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                            <p className="text-sm font-semibold text-green-800">
                              Promoción aplicada:{' '}
                              {detail.Promotions.codePromotions}
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Total a pagar */}
          <Card className="border-orange-600 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    Total a pagar
                  </p>
                </div>
                <p className="text-4xl font-bold text-orange-900">
                  C${getTotalPrice().toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-4">
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-transparent"
              >
                <ArrowLeft className="h-5 w-5" /> Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
