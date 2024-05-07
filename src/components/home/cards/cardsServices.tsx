import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Calendar, Sofa, Wifi, MessageCircle } from 'lucide-react';

interface CardData {
  title: string;
  subtitle: string;
  description: string;
  bgColor: string;
  icon: React.ReactNode;
}

const cardData: CardData[] = [
  {
    title: 'Horarios Flexibles',
    subtitle: 'Horarios de 8:00 am a 8:00 pm',
    description: 'La estadia depende de ti y las ganas de triunfar',
    bgColor: 'bg-yellow-200 bg-opacity-45',
    icon: <Calendar size={48} />
  },
  {
    title: 'Comodidad',
    subtitle: 'La comodiad es lo primero',
    description: 'La comodidad es lo primero',
    bgColor: 'bg-yellow-200 bg-opacity-45',
    icon: <Sofa size={48} />
  },
  {
    title: 'Wifi Gratis',
    subtitle: 'Wifi de alta velocidad',
    description:
      'Wifi de alta velocidad para que puedas trabajar sin problemas',
    bgColor: 'bg-yellow-200 bg-opacity-45',
    icon: <Wifi size={48} />
  },
  {
    title: 'Atencion 24-7',
    subtitle: 'La atencion es lo primero',
    description:
      'Atencion 24-7 para que puedas resolver tus dudas en cualquier momento',
    bgColor: 'bg-yellow-200 bg-opacity-45',
    icon: <MessageCircle size={48} />
  }
];

const CardService = () => {
  return (
    <div>
      <div className="flex justify-center items-center p-4">
        <div className="bg-white w-3/3 p-4 flex flex-col items-center rounded-xl border border-t-1 shadow-2xl">
          <div className="mt-4 w-full flex flex-col md:flex-row md:justify-between">
            {cardData.map((card, index) => (
              <Card
                key={index}
                className={`w-full md:w-1/3 mb-4 md:mb-0 flex flex-col items-center p-4 rounded-lg ${card.bgColor}`}
              >
                <CardHeader>{card.icon}</CardHeader>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </div>
      s
    </div>
  );
};

export default CardService;
