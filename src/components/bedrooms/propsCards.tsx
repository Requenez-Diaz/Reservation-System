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
  description: string;
  lowSeasonPrice: number;
  status: boolean;
  numberBedroom: number;
  slug?: string;
  imageUrl: string;
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
  slug
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
    <Card className="group relative mx-3 mt-3 w-screen max-w-md overflow-hidden rounded-2xl border-0 bg-white dark:bg-slate-900 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
      <Badge
        className="absolute right-4 top-4 z-10 px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
        variant={status ? 'success' : 'destructive'}
      >
        {status ? '✓ Disponible' : '✗ No disponible'}
      </Badge>

      <Link href={`/habitaciones-detail/${finalSlug}`} passHref>
        <div className="relative h-72 overflow-hidden">
          {!imageError ? (
            <>
              <Image
                alt={`Habitación ${typeBedroom}`}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                fill
                onError={() => setImageError(true)}
                priority={false}
                src={validImageUrl || '/placeholder.svg'}
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg">
                  <svg
                    className="h-10 w-10 text-gray-400"
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
                <p className="text-sm font-medium text-gray-500">
                  Imagen no disponible
                </p>
              </div>
            </div>
          )}
        </div>
      </Link>

      <div className="p-7">
        <CardContent className="space-y-6 p-0">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100">
              {typeBedroom}
            </h3>
            <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 px-4 py-2 shadow-sm transition-all duration-300 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-900/40 dark:hover:to-blue-800/40 hover:shadow-md">
              <Bed className="h-5 w-5 text-blue-600" />
              <span className="text-base font-bold text-blue-900 dark:text-blue-300">
                {numberBedroom}
              </span>
            </div>
          </div>

          <div className="flex items-end justify-between rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-5 shadow-md">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-wide text-blue-100">
                Desde
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white">
                  C$ {lowSeasonPrice}
                </span>
                <span className="text-sm font-semibold text-blue-100">
                  /noche
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {description}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-2 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20 px-4 py-2.5 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:shadow-sm">
                <Wifi className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  WiFi Gratis
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20 px-4 py-2.5 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:shadow-sm">
                <Wind className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">A/C</span>
              </div>
            </div>
          </div>
        </CardContent>

        <div className="mt-7 border-t border-gray-200 dark:border-slate-700 pt-6">
          <CardFooter className="flex flex-col gap-3 p-0 sm:flex-row">
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
              <Button className="w-full rounded-xl bg-green-600 py-6 font-bold shadow-md transition-all duration-300 hover:bg-green-700 hover:shadow-xl active:scale-95">
                <MessageCircleMore className="mr-2 h-5 w-5" />
                Contactar por WhatsApp
              </Button>
            </a>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
