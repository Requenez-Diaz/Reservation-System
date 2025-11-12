'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Bed, MessageCircleMore, Wifi, Wind } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AddReservation } from '../bookings/components/addReservation';
import { generateWhatsappUrl } from './messages/message-encode';

interface PropsCardsProps {
  typeBedroom: string;
  // description: string; // ← si luego lo usarás, déjalo comentado
  lowSeasonPrice: number;
  status: boolean;
  numberBedroom: number;
  slug?: string;
  imageUrl: string;
  // imageContent: string; // ← igual, si planeas usarlo más adelante
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '_')
    .replace(/^-+|-+$/g, '');
}

export default function PropsCards({
  typeBedroom,
  // description,
  lowSeasonPrice,
  status,
  numberBedroom,
  imageUrl,
  slug
  // imageContent
}: PropsCardsProps) {
  const [imageError, setImageError] = useState(false);
  const finalSlug = slug || generateSlug(typeBedroom);

  let validImageUrl: string;

  if (imageUrl?.startsWith('http')) {
    validImageUrl = imageUrl;
  } else if (imageUrl) {
    const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    validImageUrl = `/api-imagenes/${fileName}`;
  } else {
    validImageUrl = 'https://via.placeholder.com/300x200?text=Sin+imagen';
  }

  return (
    <Card className="mx-3 mt-3 w-screen max-w-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <Link href={`/habitaciones-detail/${finalSlug}`} passHref>
        <div className="group relative h-48 overflow-hidden">
          {!imageError ? (
            <Image
              alt={`Habitación ${typeBedroom}`}
              className="object-cover transition-transform duration-500 hover:scale-110"
              fill
              onError={() => setImageError(true)}
              priority={false}
              src={validImageUrl || '/placeholder.svg'}
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200">
              <div className="text-center text-gray-500">
                <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-lg bg-gray-300">
                  <svg
                    className="h-8 w-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <p className="text-sm">Imagen no disponible</p>
              </div>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <CardContent className="space-y-4 p-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                C$ {lowSeasonPrice}
              </span>
              <span className="text-sm text-gray-500">/noche</span>
            </div>
            <Badge
              className="text-xs"
              variant={status ? 'success' : 'destructive'}
            >
              {status ? 'Disponible' : 'No disponible'}
            </Badge>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Bed className="h-4 w-4 text-gray-500" />
              <span>Habitación {numberBedroom}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Wifi className="h-4 w-4 text-blue-500" />
              <span>WiFi</span>
            </div>
            <div className="flex items-center space-x-1">
              <Wind className="h-4 w-4 text-blue-500" />
              <span>A/C</span>
            </div>
          </div>
        </CardContent>

        <div className="mt-4 border-t pt-4">
          <CardFooter className="flex flex-col gap-2 p-0 sm:flex-row">
            <div className="flex-1">
              <AddReservation selectedBedroomType={typeBedroom} />
            </div>
            <a
              className="flex-1"
              href={generateWhatsappUrl(
                typeBedroom,
                numberBedroom,
                lowSeasonPrice
              )}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button className="w-full bg-green-500 hover:bg-green-600">
                <MessageCircleMore className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
            </a>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
