'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getBedroomsById } from '@/app/actions/get-bedrooms';

interface BedroomImage {
  id: number;
  imageContent: string;
  url?: string;
}

interface Bedroom {
  id: number;
  typeBedroom: string;
  description: string;
  lowSeasonPrice: number;
  highSeasonPrice: number;
  status: boolean;
  numberBedroom: number;
  seasonsId: number;

  amenities: unknown[];
  capacity: number;
  bookingsDetails: unknown[];
  BedroomImages: BedroomImage[];
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
          const data = await getBedroomsById(id);
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
    return (
      <div className="container mx-auto p-4 text-center text-gray-500">
        Cargando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!bedroom) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-500">
        No se encontró la habitación
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="shadow-xl border border-gray-200 rounded-lg bg-white">
        <CardHeader className="bg-blue-50 p-6 rounded-t-lg">
          <CardTitle className="text-3xl font-bold text-blue-800">
            {bedroom.typeBedroom}
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Número de Habitación: {bedroom.numberBedroom}
          </p>
        </CardHeader>

        {bedroom.BedroomImages && bedroom.BedroomImages.length > 0 && (
          <div className="w-full h-64 overflow-hidden rounded-lg mb-4">
            <img
              // CORRECCIÓN: Orden alfabético de props (Línea 102 y 103 corregidas)
              alt={`Imagen de la habitación ${bedroom.numberBedroom}`}
              className="w-full h-full object-cover"
              src={
                bedroom.BedroomImages[0].imageContent
                  ? `data:image/jpeg;base64,${bedroom.BedroomImages[0].imageContent}`
                  : (bedroom.BedroomImages[0].url ?? '')
              }
            />
          </div>
        )}

        <CardContent className="p-6 space-y-6">
          <p className="text-gray-700 text-lg">{bedroom.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Detalles de la habitación
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>Capacidad:</strong> {bedroom.capacity} personas
                </li>
                <li>
                  <strong>Precio temporada baja:</strong>{' '}
                  <span className="text-green-600 font-semibold">
                    ${bedroom.lowSeasonPrice}
                  </span>
                </li>
                <li>
                  <strong>Precio temporada alta:</strong>{' '}
                  <span className="text-red-600 font-semibold">
                    ${bedroom.highSeasonPrice}
                  </span>
                </li>
                <li>
                  <strong>Estado:</strong>{' '}
                  <span
                    className={
                      bedroom.status
                        ? 'text-green-500 font-semibold'
                        : 'text-red-500 font-semibold'
                    }
                  >
                    {bedroom.status ? 'Disponible' : 'Ocupado'}
                  </span>
                </li>
              </ul>
            </div>

            {bedroom.amenities && bedroom.amenities.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Amenidades
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {bedroom.amenities.map((amenity, index) => (
                    <li key={index}>{String(amenity)}</li>
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
