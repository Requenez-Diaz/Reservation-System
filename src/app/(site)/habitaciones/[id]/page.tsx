'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getBedroomsById } from '@/app/actions/get-bedrooms';

interface Bedroom {
  id: number;
  typeBedroom: string;
  description: string;
  lowSeasonPrice: number;
  highSeasonPrice: number;
  status: boolean;
  numberBedroom: number;
  seasonsId: number;
  amenities: any[];
  capacity: number;
  bookingsDetails: any[];
}

export default function BedroomDetails() {
  const params = useParams();
  const id = typeof params.id === 'string' ? Number.parseInt(params.id) : 0;
  const [bedroom, setBedroom] = useState<Bedroom | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBedroom() {
      if (id) {
        try {
          setIsLoading(true);
          const data = (await getBedroomsById(id)) as Bedroom;
          console.log('Datos de la habitación:', data);
          setBedroom(data);
        } catch (error) {
          console.error('Error al obtener los datos:', error);
          setError(
            `Error al cargar los datos de la habitación: ${error instanceof Error ? error.message : String(error)}`
          );
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchBedroom();
  }, [id]);

  if (isLoading) {
    return <div className="container mx-auto p-4">Cargando...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4">Error: {error}</div>;
  }

  if (!bedroom) {
    return (
      <div className="container mx-auto p-4">No se encontró la habitación</div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{bedroom.typeBedroom}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{bedroom.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Detalles de la habitación</h3>
              <p>Capacidad: {bedroom.capacity} personas</p>
              <p>Precio temporada baja: ${bedroom.lowSeasonPrice}</p>
              <p>Precio temporada alta: ${bedroom.highSeasonPrice}</p>
              <p>Número de habitación: {bedroom.numberBedroom}</p>
            </div>
            {bedroom.amenities && bedroom.amenities.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Amenidades</h3>
                <ul className="list-disc list-inside">
                  {bedroom.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
