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
    bgColor: 'bg-blue-400',
    icon: <Calendar size={48} />
  },
  {
    title: 'Comodidad',
    subtitle: 'La comodiad es lo primero',
    description: 'La comodidad es lo primero',
    bgColor: 'bg-blue-400',
    icon: <Sofa size={48} />
  },
  {
    title: 'Wifi Gratis',
    subtitle: 'Wifi de alta velocidad',
    description:
      'Wifi de alta velocidad para que puedas trabajar sin problemas',
    bgColor: 'bg-blue-400',
    icon: <Wifi size={48} />
  },
  {
    title: 'Atencion 24-7',
    subtitle: 'La atencion es lo primero',
    description:
      'Atencion 24-7 para que puedas resolver tus dudas en cualquier momento',
    bgColor: 'bg-blue-400',
    icon: <MessageCircle size={48} />
  }
];

const Cards: React.FC = () => {
  return (
    <>
      <div className=" flex flex-row items-center md:justify-between md:space-x-4 shadow-md mt-4 m-4">
        {cardData.map((data, index) => (
          <Card key={index} className={`bg-blue-400 ${data.bgColor}`}>
            <CardHeader>
              <div>
                {data.icon}
                <h1>{data.title}</h1>
              </div>
              <CardTitle>
                <p className="text-black font-light">{data.subtitle}</p>
              </CardTitle>
              <CardDescription className="text-black hover:text-cyan-900">
                <h1>{data.description}</h1>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Cards;
