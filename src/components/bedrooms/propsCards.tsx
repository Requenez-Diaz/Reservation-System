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
  slug?: string;
  imageUrl: string;
  imageContent: string;
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
  description,
  lowSeasonPrice,
  status,
  numberBedroom,
  imageUrl,
  slug,
  imageContent
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
    <Card className="w-screen max-w-md mt-3 mx-3 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <Link href={`/habitaciones-detail/${finalSlug}`} passHref>
        <div className="relative h-48 overflow-hidden group">
          {!imageError ? (
            <Image
              src={validImageUrl || '/placeholder.svg'}
              alt={`Habitación ${typeBedroom}`}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 hover:scale-110"
              onError={() => setImageError(true)}
              priority={false}
            />
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
        </div>
      </Link>

      <div className="p-4">
        <CardContent className="p-0 space-y-4">
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
              <AddReservation selectedBedroomType={typeBedroom} />
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
