import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Calendar, User, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { getReservationDetails } from '@/app/actions/reservations/reservations';

type Props = {
  params: Promise<{ id: string }>;
};

const statusColors = {
  PENDING: 'bg-yellow-500',
  CONFIRMED: 'bg-green-500',
  CANCELLED: 'bg-red-500',
  COMPLETED: 'bg-blue-500'
};

const statusLabels = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed'
};

export default async function ReservationDetailsPage({ params }: Props) {
  const { id } = await params;
  const result = await getReservationDetails(Number(id));

  if (!result.success || !result.reservation) {
    notFound();
  }

  const { reservation } = result;

  return (
    <main className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
            <div>
              <h1 className="text-4xl font-bold">Reservation Confirmed</h1>
              <p className="text-muted-foreground">
                Reservation number: #{reservation.id}
              </p>
            </div>
          </div>
          <Badge className={statusColors[reservation.status]}>
            {statusLabels[reservation.status]}
          </Badge>
        </div>

        {/* Client Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Guest Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">
                  {reservation.user.name} {reservation.user.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  Email
                </p>
                <p className="font-medium">{reservation.user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Room Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Reserved Rooms
            </CardTitle>
            <CardDescription>
              {reservation.details.length} room(s) reserved
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {reservation.details.map((detail) => (
              <Card key={detail.id}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        {detail.bedroom.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {detail.bedroom.type}
                      </p>
                      <p className="text-sm">
                        Capacity: {detail.bedroom.capacity} people
                      </p>
                      <p className="text-sm">Guests: {detail.guestCount}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span className="text-muted-foreground">Check-in:</span>
                        <span className="font-medium">
                          {new Date(detail.checkInDate).toLocaleDateString(
                            'en-US',
                            {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span className="text-muted-foreground">
                          Check-out:
                        </span>
                        <span className="font-medium">
                          {new Date(detail.checkOutDate).toLocaleDateString(
                            'en-US',
                            {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }
                          )}
                        </span>
                      </div>
                      <div className="pt-2">
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="text-2xl font-bold">
                          ${Number(detail.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {detail.promotion && (
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded-md">
                      <p className="text-sm font-medium text-green-700 dark:text-green-300">
                        Promotion applied: {detail.promotion.code}
                      </p>
                    </div>
                  )}

                  <Badge className={`mt-4 ${statusColors[detail.status]}`}>
                    {statusLabels[detail.status]}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Total */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-3xl font-bold">
                  $
                  {reservation.details
                    .reduce((sum, d) => sum + Number(d.price), 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  Reservation Date
                </p>
                <p className="font-medium">
                  {new Date(reservation.createdAt).toLocaleDateString('en-US')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button asChild variant="outline" className="flex-1 bg-transparent">
            <Link href="/reservations">New Reservation</Link>
          </Button>
          <Button className="flex-1">Print Confirmation</Button>
        </div>
      </div>
    </main>
  );
}
