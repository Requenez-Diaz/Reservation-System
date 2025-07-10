'use client';
import Image from 'next/image';
import { useState } from 'react';
import { RoomAvailability } from './roomAvailability';
import { AddReservation } from '../bookings/components/addReservation';
import BedroomDetail from './bedroomDetail';

import {
  Wifi,
  Wind,
  MessageCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CommentCount } from '../coments/commentCount';

interface PropsCardsProps {
  typeBedroom: string;
  description: string;
  lowSeasonPrice: number;
  status: boolean;
  numberBedroom: number;
  commentCount: number;
  image: string;
}

export default function PropsCards({
  typeBedroom,
  description,
  lowSeasonPrice,
  status,
  numberBedroom,
  commentCount,
  image
}: PropsCardsProps) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const toggleComments = () => {
    setIsCommentsOpen(!isCommentsOpen);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Función para verificar si la imagen es base64
  const isBase64Image = (str: string) => {
    console.log(isBase64Image, 'Probando ');
    return str.startsWith('data:image/');
  };

  return (
    <Card className="w-screen max-w-md mt-3 mx-3 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative h-40 overflow-hidden group">
        {image && !imageError ? (
          isBase64Image(image) ? (
            // Imagen en base64
            <Image
              src={image || '/placeholder.svg'}
              alt={`Habitación ${typeBedroom}`}
              fill
              className="object-cover transition-transform hover:scale-105"
              onError={handleImageError}
              priority={false}
            />
          ) : (
            // Imagen con URL normal
            <Image
              src={image || '/placeholder.svg'}
              alt={`Habitación ${typeBedroom}`}
              fill
              className="object-cover transition-transform hover:scale-105"
              onError={handleImageError}
              priority={false}
            />
          )
        ) : (
          // Imagen placeholder cuando no hay imagen o hay error
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
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-500 flex items-center justify-center">
          <span className="text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            Ver detalles
          </span>
        </div>
      </div>
      <div className="p-3">
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-bold text-gray-800 mb-1">
            {typeBedroom}
          </CardTitle>
          <Badge
            variant={status ? 'success' : 'destructive'}
            className="mb-2 text-xs"
          >
            {status ? 'Disponible' : 'No disponible'}
          </Badge>
        </CardHeader>
        <CardContent className="p-0 space-y-1">
          <BedroomDetail label="Descripción" value={description} />
          <BedroomDetail label="Precio" value={lowSeasonPrice} isPrice />
          <BedroomDetail label="Número de habitación" value={numberBedroom} />
          <div className="flex items-center space-x-3 mt-1">
            <div className="flex items-center">
              <Wifi className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-xs">WiFi</span>
            </div>
            <div className="flex items-center">
              <Wind className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-xs">A/C</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-0 pt-2 flex flex-col gap-2">
          <div className="flex flex-row items-stretch gap-1 w-full">
            <AddReservation />
            <Button
              variant="outline"
              size="sm"
              className="w-full flex justify-between items-center text-xs"
              onClick={toggleComments}
            >
              <div className="flex items-center">
                <MessageCircle className="w-3 h-3 mr-1" />
                Comentarios
              </div>
              {isCommentsOpen ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </Button>
          </div>
          {isCommentsOpen && (
            <div className="w-full">
              <CommentCount count={commentCount} />
              <Link
                href="comments"
                className="text-xs text-blue-500 hover:underline mt-1 inline-block"
              >
                Ver todos los comentarios
              </Link>
            </div>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
