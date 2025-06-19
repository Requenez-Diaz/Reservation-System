import { Bed } from 'lucide-react';

const OrdersRooms = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 mx-5 p-6 rounded-lg shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-100 rounded-full">
          <Bed className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Habitaciones Disponibles
          </h1>
          <p className="text-gray-600 mt-1">
            Encuentra la habitación perfecta para tu estancia
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrdersRooms;
