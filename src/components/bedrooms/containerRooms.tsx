'use client';

import React, { useEffect, useState } from 'react';
import OrdersRooms from './ordersRooms';
import ParentCards from './parentCards';
import { getAllBedrooms } from '@/app/actions/get-bedrooms';

const ContainerRooms = () => {
  const [items, setItems] = useState<{
    typeBedroom: string;
    description: string;
    lowSeasonPrice: number;
    // highSeasonPrice: number;
    status: boolean;
    numberBedroom: number;
  }[]>([]);

  useEffect(() => {
    const fetchBedrooms = async () => {
      try {
        const bedroomData = await getAllBedrooms();
        const mappedItems = bedroomData.map((bedroom) => ({
          typeBedroom: bedroom.typeBedroom,
          description: bedroom.description,
          lowSeasonPrice: bedroom.lowSeasonPrice,
          // highSeasonPrice: bedroom.highSeasonPrice,
          status: bedroom.status,
          numberBedroom: bedroom.numberBedroom,
        }));
        setItems(mappedItems);
      } catch (error) {
        console.error('Error fetching bedrooms:', error);
      }
    };

    fetchBedrooms();
  }, []);

  return (
    <div>
      <OrdersRooms />
      <ParentCards items={items} />
    </div>
  );
};

export default ContainerRooms;
