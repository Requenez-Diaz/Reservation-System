import React from 'react';
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
    <div className="flex flex-wrap content-center mt-5 justify-center">
      {items.map((item) => (
        <PropsCards
          key={item.numberBedroom}
          typeBedroom={item.typeBedroom}
          lowSeasonPrice={item.lowSeasonPrice}
          status={item.status}
          numberBedroom={item.numberBedroom}
          slug={item.slug}
          imageUrl={item.image}
        />
      ))}
    </div>
  );
};

export default ParentCards;
