import React from 'react';
import PropsCards from './propsCards';

interface Item {
  typeBedroom: string;
  description: string;
  lowSeasonPrice: number;
  status: boolean;
  numberBedroom: number;
  commentCount: number;
  image: string;
}

interface ParentComponents {
  items: Item[];
}

const ParentCards = ({ items }: ParentComponents) => {
  return (
    <div className="flex flex-wrap content-center mt-5 justify-center">
      {items.map((item) => (
        <PropsCards key={item.numberBedroom} {...item} />
      ))}
    </div>
  );
};

export default ParentCards;
