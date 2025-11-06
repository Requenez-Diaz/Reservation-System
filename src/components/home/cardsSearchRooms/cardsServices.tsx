import type React from 'react';
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
  icon: React.ReactNode;
}

const cardData: CardData[] = [
  {
    title: 'Horarios Flexibles',
    subtitle: 'Horarios de 8:00 am a 8:00 pm',
    description: 'La estadía depende de ti y las ganas de disfrutar',
    icon: <Calendar className="w-12 h-12" />
  },
  {
    title: 'Comodidad',
    subtitle: 'La comodidad es lo primero',
    description: 'Espacios diseñados para tu máximo confort y relajación',
    icon: <Sofa className="w-12 h-12" />
  },
  {
    title: 'Wifi Gratis',
    subtitle: 'Wifi de alta velocidad',
    description: 'Conexión de alta velocidad para que estés siempre conectado',
    icon: <Wifi className="w-12 h-12" />
  },
  {
    title: 'Atención 24/7',
    subtitle: 'La atención es lo primero',
    description:
      'Servicio disponible las 24 horas para resolver tus necesidades',
    icon: <MessageCircle className="w-12 h-12" />
  }
];

const CardService = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {cardData.map((card, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 hover:border-amber-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <CardHeader className="flex flex-col items-center text-center space-y-4 p-6">
            <div className="p-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
              {card.icon}
            </div>
            <CardTitle className="text-xl font-bold text-amber-900">
              {card.title}
            </CardTitle>
            <CardDescription className="text-amber-700 leading-relaxed">
              {card.description}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default CardService;
