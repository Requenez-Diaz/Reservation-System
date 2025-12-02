import { Bed } from 'lucide-react';
import PropsCards from './propsCards';

interface Item {
  typeBedroom: string;
  description: string;
  lowSeasonPrice: number;
  status: boolean;
  numberBedroom: number;
  image: string;
  slug?: string;
}

interface ParentComponents {
  items: Item[];
}

const ParentCards = ({ items }: ParentComponents) => {
  return (
    <div>
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-orange-50/50 to-amber-50/30 mx-5 p-8 rounded-2xl shadow-sm">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-100/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative flex items-center space-x-4">
          <div className="p-3 bg-orange-100/30 backdrop-blur-sm rounded-2xl shadow-sm ring-2 ring-orange-200/20 transform transition-transform hover:scale-110 duration-300">
            <Bed className="h-7 w-7 text-orange-600/70" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 drop-shadow-sm tracking-tight">
              Habitaciones Disponibles
            </h1>
            <p className="text-gray-700 mt-1.5 text-lg font-medium">
              Encuentra la habitación perfecta para tu estancia
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap content-center mt-5 justify-center">
        {items.map((item) => (
          <PropsCards
            key={item.numberBedroom}
            description={item.description}
            typeBedroom={item.typeBedroom}
            lowSeasonPrice={item.lowSeasonPrice}
            status={item.status}
            numberBedroom={item.numberBedroom}
            slug={item.slug}
            imageUrl={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default ParentCards;
