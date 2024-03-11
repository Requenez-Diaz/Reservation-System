import React from 'react';
import OrdersRooms from './ordersRooms';

import ParrentCards from './parentCards';

const ContainerRooms = () => {
  const items = [
    {
      name: 'Habitacion 1',
      type: 'Privada',
      bathroom: '1 baño',
      beds: '1 cama',
      people: '2 personas',
      description: 'Habitacion privada con baño',
      price: 100
    },
    {
      name: 'Habitacion 2',
      type: 'Privada',
      bathroom: '1 baño',
      beds: '1 cama',
      people: '2 personas',
      description: 'Habitacion privada con baño',
      price: 100
    },
    {
      name: 'Habitacion 3',
      type: 'Privada',
      bathroom: '1 baño',
      beds: '1 cama',
      people: '2 personas',
      description: 'Habitacion privada con baño',
      price: 100
    },
    {
      name: 'Habitacion 4',
      type: 'Privada',
      bathroom: '1 baño',
      beds: '1 cama',
      people: '2 personas',
      description: 'Habitacion privada con baño',
      price: 100
    },
    {
      name: 'Habitacion 5',
      type: 'Privada',
      bathroom: '1 baño',
      beds: '1 cama',
      people: '2 personas',
      description: 'Habitacion privada con baño',
      price: 100
    },
    {
      name: 'Habitacion 6',
      type: 'Privada',
      bathroom: '1 baño',
      beds: '1 cama',
      people: '2 personas',
      description: 'Habitacion privada con baño',
      price: 100
    }
  ];

  return (
    <div>
      <OrdersRooms />
      <ParrentCards items={items} />
    </div>
  );
};

export default ContainerRooms;
