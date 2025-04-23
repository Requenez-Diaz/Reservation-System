import { Badge, Bed, Wifi, Coffee } from 'lucide-react';
import type { RoomCardProps } from './types';
import { ModalBookRooms } from './modalRoomsBooks';

export default function RoomCard({
  type,
  description,
  image,
  price
}: RoomCardProps) {
  return (
    <div className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl rounded-lg">
      <div className="p-0 relative">
        <img
          src={image || '/placeholder.svg'}
          alt={type}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
          {type === 'Habitación Estándar' ? 'Estándar' : 'Lujo'}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{type}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Bed className="h-4 w-4" />2 personas
          </span>
          <span className="flex items-center gap-1">
            <Wifi className="h-4 w-4" />
            Wi-Fi
          </span>
          <span className="flex items-center gap-1">
            <Coffee className="h-4 w-4" />
            Desayuno
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center p-4 bg-secondary">
        <div className="text-lg font-bold">
          ${price}{' '}
          <span className="text-sm font-normal text-muted-foreground">
            / noche
          </span>
        </div>

        <ModalBookRooms />
      </div>
    </div>
  );
}
