'use client';
import Image from 'next/image';
import { useState } from 'react';
import { RoomAvailability } from './roomAvailability';
import { AddReservation } from './addReservation';
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
}

export default function PropsCards({
  typeBedroom,
  description,
  lowSeasonPrice,
  status,
  numberBedroom,
  commentCount
}: PropsCardsProps) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const toggleComments = () => {
    setIsCommentsOpen(!isCommentsOpen);
  };

  return (
    <Card className="w-screen max-w-md mt-3 mx-3 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative h-40 overflow-hidden group">
        <Image
          alt="Imagen de la habitación"
          src="https://media.istockphoto.com/id/1390233984/es/foto/habitaci%C3%B3n-de-lujo-moderna.webp?b=1&s=170667a&w=0&k=20&c=sLPzMweWiHutEfXwpxoo4Ew8Wu_kZxzT5dRUohKbP40="
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
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
          <RoomAvailability isAvailable={status} />
        </CardFooter>
      </div>
    </Card>
  );
}
