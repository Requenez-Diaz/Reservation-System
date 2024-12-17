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
import { getAllBedrooms } from '@/app/actions/get-bedrooms';
import OrdersRooms from '../bedrooms/ordersRooms';
import ParentCards from '../bedrooms/parentCards';

export default async function RoomInfoHome() {
  const bedroomsData = await getAllBedrooms();
  const mappedItems = bedroomsData.map((bedroom) => ({
    typeBedroom: bedroom.typeBedroom,
    description: bedroom.description,
    lowSeasonPrice: bedroom.lowSeasonPrice,
    status: bedroom.status,
    numberBedroom: bedroom.numberBedroom
  }));

  return (
    <div>
      <OrdersRooms />
      <ParentCards items={mappedItems} />
    </div>
  );
}
