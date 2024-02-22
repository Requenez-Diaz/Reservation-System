// Asegúrate de importar tu componente de tarjeta si es necesario

import { Card } from '@/components/ui/card';

interface Habitacion {
  id: number;
  image: string;
  name: string;
  description: string;
  subtitle: string;
  price: string;
}

const HabitacionCard = ({ habitacion }: { habitacion: Habitacion }) => {
  const { image, name, description, subtitle, price } = habitacion;

  return (
    <Card className="bg-blue-500  text-white shadow-md rounded-xl p-4 transform transition-transform hover:scale-105">
      <div>
        <img src={image} className="w-full h-auto rounded-xl mb-4" alt={name} />
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-sm">{description}</p>
        <p className="text-sm">{subtitle}</p>
        <p className="text-lg font-bold">{price}</p>
      </div>
    </Card>
  );
};

export default HabitacionCard;
