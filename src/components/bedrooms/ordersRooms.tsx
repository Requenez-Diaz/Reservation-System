import React from 'react';
import { Button } from '../ui/button';

const OrdersRooms = () => {
  return (
    <div className="flex flex-row justify-between mx-4 p-2">
      <h1 className="text-2xl">Habitaciones</h1>
      <div className="mx-4 space-x-4">
        <Button className="bg-blue-300 hover:bg-transparent text-black">
          Defecto
        </Button>

        <Button className="bg-white-300 border rounded-lg hover:bg-transparent text-black">
          A-Z
        </Button>
        <Button className="bg-white-300 border rounded-xl hover:bg-transparent text-black">
          Ultima Vista
        </Button>
      </div>
    </div>
  );
};

export default OrdersRooms;
