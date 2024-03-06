// ParentCards.tsx
import React from 'react';
import PropsCards from './propsCards';

interface Item {
  name: string;
  type: string;
  bathroom: string;
  beds: string;
  people: string;
  description: string;
  price: number;
}

interface ParentComponents {
  items: Item[];
}

const ParentCards = ({ items }: ParentComponents) => {
  return (
    <div className="flex flex-wrap content-center justify-center">
      {items.map((item, index) => (
        <PropsCards key={index} {...item} />
      ))}
    </div>
  );
};

export default ParentCards;
