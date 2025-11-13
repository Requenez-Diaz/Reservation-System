'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingDetail } from '../home/roomsType';

interface Bedroom {
  id: number;
  typeBedroom: string;
  description: string;
  lowSeasonPrice: number;
  highSeasonPrice: number;
  status: boolean;
  numberBedroom: number;
  seasonsId: number;
  amenities: string[];
  capacity: number;
  bookingsDetails: BookingDetail[];
}

export default function BedroomDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [bedroom, setBedroom] = useState<Bedroom | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/habitaciones/${id}`)
        .then((response) => response.json())
        .then((data) => setBedroom(data))
        .catch((error) =>
          console.error('Error fetching bedroom details:', error)
        );
    }
  }, [id]);

  if (!bedroom) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{bedroom.typeBedroom}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{bedroom.description}</p>
          <p>Capacidad: {bedroom.capacity} personas</p>
          <p>Precio temporada baja: ${bedroom.lowSeasonPrice}</p>
          <p>Precio temporada alta: ${bedroom.highSeasonPrice}</p>
          <p>Número de habitación: {bedroom.numberBedroom}</p>
        </CardContent>
      </Card>
    </div>
  );
}
