import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';

interface CardData {
  title: string;
  subtitle: string;
  description: string;
  bgColor: string;
}

const cardData: CardData[] = [
  {
    title: 'HOla',
    subtitle: 'i dont understand',
    description: 'I dont have a description for this card',
    bgColor: 'bg-blue-400'
  },

  {
    title: 'HOla',
    subtitle: 'i dont understand',
    description: 'I dont have a description for this card',
    bgColor: 'bg-blue-400'
  },
  {
    title: 'HOla',
    subtitle: 'i dont understand',
    description: 'I dont have a description for this card',
    bgColor: 'bg-blue-400'
  },
  {
    title: 'esta es una card',
    subtitle: 'i dont understand',
    description: 'I dont have a description for this card',
    bgColor: 'bg-blue-400'
  }
];

const Cards: React.FC = () => {
  return (
    <>
      <div className="bg-red-300 flex flex-row items-center md:justify-between md:space-x-4 shadow-md mt-4 m-4">
        {cardData.map((data, index) => (
          <Card key={index} className={`bg-blue-400 ${data.bgColor}`}>
            <CardHeader>
              <div>
                <h1>{data.title}</h1>
              </div>
              <CardTitle>
                <p className="text-black font-light">{data.subtitle}</p>
              </CardTitle>
              <CardDescription className="text-white">
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
