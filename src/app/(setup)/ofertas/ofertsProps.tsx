// OfertsProps.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

interface OfertsProps {
  title: string;
  slogan: string;
  subtitle: string;
  description: string;
  image: string;
  name: string;
  description2: string;
  price: number;
}

const OfertsProps: React.FC<OfertsProps> = ({
  title,
  slogan,
  subtitle,
  description,
  image,
  description2,
  name,
  price
}: OfertsProps) => {
  return (
    <div className="w-screen bg-gray-400 m-3 p-4 md:p-8 flex flex-col ">
      <p>{title}</p>
      <div className="text-center">
        <p>{slogan}</p>
        <Button className="bg-blue-500">Comprar</Button>
        <div>{description}</div>
      </div>
      <div className="flex flex-col items-center md:flex-row md:justify-between md:space-x-4 mt-4">
        <div className="w-full md:w-1/2 p-3">
          <img src={image} className="w-full h-auto" />
          <p>{name}</p>
          <p>{description2}</p>
          <p>{subtitle}</p>
          <p>{price}</p>
        </div>
        <div className="w-full md:w-1/2 p-3 mt-4 md:mt-0">
          <img src={image} className="w-full h-auto" />
          <p>{name}</p>
          <p>{description2}</p>
          <p>{subtitle}</p>
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
};

export default OfertsProps;
