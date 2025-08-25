'use client';
import Image from 'next/image';
import { useState } from 'react';

import Link from 'next/link';

import { Wifi, Wind, MessageCircleMore, Bed } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { generateWhatsappUrl } from './messages/message-encode';
import { AddReservation } from '../bookings/components/addReservation';

interface PropsCardsProps {
  typeBedroom: string;
  description: string;
  lowSeasonPrice: number;
  status: boolean;
  numberBedroom: number;
  image: string;
  slug?: string;
}

// Función utilitaria para generar un slug, idéntica a la que usas en el Server Action
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_') // <-- CORREGIDO: ahora usa guión medio
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '_')
    .replace(/^-+|-+$/g, '');
}

export default function PropsCards({
  typeBedroom,
  description,
  lowSeasonPrice,
  status,
  numberBedroom,
  image,
  slug
}: PropsCardsProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const isBase64Image = (str: string) => {
    return str.startsWith('data:image/');
  };

  // Usa la función utilitaria para generar el slug si no se proporciona
  const finalSlug = slug || generateSlug(typeBedroom);

  console.log('PropsCards Debug:');
  console.log('- typeBedroom:', typeBedroom);
  console.log('- slug prop:', slug);
  console.log('- finalSlug:', finalSlug);
  console.log('- URL generada:', `/habitaciones-detail/${finalSlug}`);

  return (
    <Card className="w-screen max-w-md mt-3 mx-3 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <Link href={`/habitaciones-detail/${finalSlug}`} passHref>
        <div className="relative h-48 overflow-hidden group">
          {image && !imageError ? (
            isBase64Image(image) ? (
              <Image
                src={image || '/placeholder.svg'}
                alt={`Habitación ${typeBedroom}`}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
                onError={handleImageError}
                priority={false}
              />
            ) : (
              <Image
                src={image || '/placeholder.svg'}
                alt={`Habitación ${typeBedroom}`}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
                onError={handleImageError}
                priority={false}
              />
            )
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm">Imagen no disponible</p>
              </div>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-xl font-bold text-white leading-none">
              {typeBedroom}
            </h3>
            <p className="text-sm text-gray-200 mt-1">{description}</p>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-500 flex items-center justify-center">
            <span className="text-white text-base font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/60 px-4 py-2 rounded-full">
              Ver detalles
            </span>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <CardContent className="p-0 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                ${lowSeasonPrice}
              </span>
              <span className="text-sm text-gray-500">/noche</span>
            </div>
            <Badge
              variant={status ? 'success' : 'destructive'}
              className="text-xs"
            >
              {status ? 'Disponible' : 'No disponible'}
            </Badge>
          </div>

          <div className="flex items-center space-x-4 text-gray-600 text-sm">
            <div className="flex items-center space-x-1">
              <Bed className="w-4 h-4 text-gray-500" />
              <span>Habitación {numberBedroom}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Wifi className="w-4 h-4 text-blue-500" />
              <span>WiFi</span>
            </div>
            <div className="flex items-center space-x-1">
              <Wind className="w-4 h-4 text-blue-500" />
              <span>A/C</span>
            </div>
          </div>
        </CardContent>
        <div className="mt-4 border-t pt-4">
          <CardFooter className="p-0 flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <AddReservation />
            </div>

            <a
              href={generateWhatsappUrl(
                typeBedroom,
                numberBedroom,
                lowSeasonPrice
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full bg-green-500 hover:bg-green-600">
                <MessageCircleMore className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </a>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
