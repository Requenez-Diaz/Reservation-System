import React from 'react';

import { getAllBedrooms } from '@/app/actions/get-bedrooms';
import ParentCards from '../bedrooms/parentCards';

export default async function RoomInfoHome() {
  const bedroomsData = await getAllBedrooms();
  const mappedItems = bedroomsData.map((bedroom) => ({
    typeBedroom: bedroom.TypeBedrooms?.nameType || '',
    description: bedroom.description,
    lowSeasonPrice: bedroom.lowSeasonPrice,
    status: bedroom.status,
    numberBedroom: bedroom.numberBedroom,
    image: bedroom.image
  }));

  return (
    <div>
      <ParentCards items={mappedItems} />
    </div>
  );
}
