import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bed, Users, Wifi, Coffee } from 'lucide-react';
import { SelectRoomModal } from '../offers/SelectRoomModal';
import { rooms } from './roomsType';
import { ModalDescriptions } from './carrouselDescriptions/modalDescriptions';

export default function RoomInfoHome() {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Nuestras Habitaciones
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="overflow-hidden">
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle>{room.name}</CardTitle>
              <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-2">
                <Users size={16} />
                <span>Capacidad: {room.capacity} personas</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity, index) => (
                  <Badge key={index} variant="secondary">
                    {amenity === 'WiFi' && <Wifi size={14} className="mr-1" />}
                    {amenity === 'TV' && <Coffee size={14} className="mr-1" />}
                    {amenity}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="text-2xl font-bold">
                ${room.price}
                <span className="text-sm font-normal">/noche</span>
              </div>
              <ModalDescriptions />
              <SelectRoomModal />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
