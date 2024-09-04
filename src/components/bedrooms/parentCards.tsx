import React from 'react';
import PropsCards from './propsCards';

interface Item {
  typeBedroom: string;
  description: string;
  lowSeasonPrice: number;
  status: boolean;
  numberBedroom: number;
}

interface ParentComponents {
  items: Item[];
}

const ParentCards = ({ items }: ParentComponents) => {
  return (
    <div className="flex flex-wrap content-center justify-center">
      {items.map((item) => (
        <PropsCards key={item.numberBedroom} {...item} />
      ))}
    </div>
  );
};

export default ParentCards;
