// PropsCards.tsx
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { DialogModal } from '../ofertsComponents/modal';

interface PropsCardsProps {
  name: string;
  type: string;
  bathroom: string;
  beds: string;
  people: string;
  description: string;
  price: number;
}

const PropsCards: React.FC<PropsCardsProps> = ({
  name,
  type,
  bathroom,
  beds,
  people,
  description,
  price
}: PropsCardsProps) => {
  return (
    <div className="bg-gray-300 mb-4 p-4 ">
      <Image
        src={
          'https://media.istockphoto.com/id/1390233984/es/foto/habitaci%C3%B3n-de-lujo-moderna.webp?b=1&s=170667a&w=0&k=20&c=sLPzMweWiHutEfXwpxoo4Ew8Wu_kZxzT5dRUohKbP40='
        }
        alt="Picture of the author"
        width={500}
        height={500}
        className="mr-4"
      />
      <div className="bg-gray-400 p-4">
        <h1 className="text-xl font-bold mb-2">{name}</h1>
        <p className="text-sm mb-2">{type}</p>
        <p className="text-sm mb-2">{bathroom}</p>
        <p className="text-sm mb-2">{beds}</p>
        <p className="text-sm mb-2">{people}</p>
        <div>
          <p className="text-sm mb-2">{description}</p>
          <p className="text-lg font-bold">{price}</p>
        </div>
        <div className="flex flex-row mx-3 space-x-4 ">
        <DialogModal />

          <Button className="bg-white-300 border rounded-lg hover:bg-transparent text-black">
            Ver Disponibilidad
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropsCards;
