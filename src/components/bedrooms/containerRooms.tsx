import React from 'react';
import { getAllBedrooms } from '@/app/actions/get-bedrooms';
import OrdersRooms from './ordersRooms';
import ParentCards from './parentCards';

const ContainerRooms = async () => {
  const bedroomData = await getAllBedrooms();
  const mappedItems = bedroomData.map((bedroom) => ({
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
      {/* <Testimonial /> */}
    </div>
  );
};

export default ContainerRooms;
