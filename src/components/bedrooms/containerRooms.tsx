import React from 'react';
import { getAllBedrooms } from '@/app/actions/get-bedrooms';
import OrdersRooms from './ordersRooms';
import ParentCards from './parentCards';

const ContainerRooms = async () => {
  const bedroomData = await getAllBedrooms();
  const mappedItems = bedroomData.map((bedroom) => {
    const firstImage = bedroom.BedroomImages?.[0];

    console.error('First image for bedroom ', {
      bedroomId: bedroom.id,
      firstImage
    });

    return {
      typeBedroom: bedroom.typeBedroom,
      description: bedroom.description,
      lowSeasonPrice: bedroom.lowSeasonPrice,
      status: bedroom.status,
      numberBedroom: bedroom.numberBedroom,
      fileName: firstImage?.fileName || '',
      mimeType: firstImage?.mimeType || '',
      // add properties required by Item type
      imageContent: firstImage?.imageContent || '',
      image: firstImage?.imageContent || '',
      imageUrl: firstImage?.imageContent || '/placeholder.svg',

      slug: bedroom.typeBedroom
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '')
    };
  });

  console.log('Mapped items for ParentCards:', mappedItems);

  return (
    <div>
      <OrdersRooms />
      <ParentCards items={mappedItems} />
    </div>
  );
};

export default ContainerRooms;
