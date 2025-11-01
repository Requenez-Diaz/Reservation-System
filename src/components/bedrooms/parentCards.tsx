import React from 'react';
import PropsCards from './propsCards';

interface Item {
  typeBedroom: string;
  description: string;
  lowSeasonPrice: number;
  status: boolean;
  numberBedroom: number;
  image: string;
  slug: string;
  fileName: string;
  mimeType: string;
  imageUrl: string;
  imageContent: string;
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
          {...item}
          imageUrl={item.image || '/placeholder.svg'}
        />
      ))}
    </div>
  );
};

export default ParentCards;
