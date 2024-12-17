import Image from 'next/image';
import React from 'react';
import { RoomAvailability } from './roomAvailability';
import { AddReservation } from './addReservation';
import BedroomDetail from './bedroomDetail';
import { Wifi, Wind, MessageCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PropsCardsProps {
  typeBedroom: string;
  description: string;
  lowSeasonPrice: number;
  status: boolean;
  numberBedroom: number;
}

export default function PropsCards({
  typeBedroom,
  description,
  lowSeasonPrice,
  status,
  numberBedroom
}: PropsCardsProps) {
  return (
    <Card className="w-full max-w-screen-sm mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative h-64 overflow-hidden group">
        <Image
          alt="Imagen de la habitación"
          src="https://media.istockphoto.com/id/1390233984/es/foto/habitaci%C3%B3n-de-lujo-moderna.webp?b=1&s=170667a&w=0&k=20&c=sLPzMweWiHutEfXwpxoo4Ew8Wu_kZxzT5dRUohKbP40="
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-500 flex items-center justify-center">
          <span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            Ver detalles
          </span>
        </div>
      </div>
      <div className="p-6">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
            {typeBedroom}
          </CardTitle>
          <Badge variant={status ? 'success' : 'destructive'} className="mb-4">
            {status ? 'Disponible' : 'No disponible'}
          </Badge>
        </CardHeader>
        <CardContent className="p-0 space-y-2">
          <BedroomDetail label="Descripción" value={description} />
          <BedroomDetail label="Precio" value={lowSeasonPrice} isPrice />
          <BedroomDetail label="Número de habitación" value={numberBedroom} />
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center">
              <Wifi className="w-5 h-5 text-blue-500 mr-1" />
              <span className="text-sm">WiFi</span>
            </div>
            <div className="flex items-center">
              <Wind className="w-5 h-5 text-blue-500 mr-1" />
              <span className="text-sm">Aire acondicionado</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-0 pt-4 flex flex-row items-stretch gap-4">
          <div className="flex flex-row gap-2 w-full">
            <AddReservation />
            <Button variant="outline" className="w-full">
              <MessageCircle className="w-4 h-4 mr-2" />
              Comentarios
            </Button>
          </div>
          <RoomAvailability isAvailable={status} />
        </CardFooter>
      </div>
    </Card>
  );
}
