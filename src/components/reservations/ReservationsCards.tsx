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
import { CalendarDays, BedDouble, Users, Banknote } from 'lucide-react';

export default function ReservationCards() {
  const reservations = [
    {
      id: 1,
      hotelName: 'Habitacion matrimonial',
      roomType: 'Suite Deluxe',
      checkIn: '2023-12-15',
      checkOut: '2023-12-20',
      guests: 2,
      price: 1500,
      status: 'Confirmada'
    },
    {
      id: 2,
      hotelName: 'Habitacion doble',
      roomType: 'Habitación Estándar',
      checkIn: '2024-01-10',
      checkOut: '2024-01-15',
      guests: 1,
      price: 750,
      status: 'Pendiente'
    },
    {
      id: 3,
      hotelName: 'Habitacion familiar',
      roomType: 'Cabaña Familiar',
      checkIn: '2024-02-20',
      checkOut: '2024-02-25',
      guests: 4,
      price: 2000,
      status: 'Confirmada'
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Mis Reservas</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reservations.map((reservation) => (
          <Card key={reservation.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{reservation.hotelName}</CardTitle>
              <CardDescription>{reservation.roomType}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  <span>
                    {reservation.checkIn} - {reservation.checkOut}
                  </span>
                </div>
                <div className="flex items-center">
                  <BedDouble className="mr-2 h-4 w-4" />
                  <span>{reservation.roomType}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  <span>{reservation.guests} huéspedes</span>
                </div>
                <div className="flex items-center">
                  <Banknote className="mr-2 h-4 w-4" />
                  <span>${reservation.price}</span>
                </div>
                <Badge
                  variant={
                    reservation.status === 'Confirmada' ? 'success' : 'pending'
                  }
                >
                  {reservation.status}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="success">Ver Detalles</Button>
              <Button variant="destructive">Cancelar Reserva</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
