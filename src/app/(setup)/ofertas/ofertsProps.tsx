import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import React from 'react';
import { TwentyFourHours } from 'tabler-icons-react';

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
    <div className="bg-white mt-4 ml-4 mr-4">
      <p className="text-blue-300">{title}</p>
      <div className="flex flex-row items-center justify-between m-8">
        <p>{slogan}</p>
        <button className="text-blue-500 font-bold">Ver mas</button>
      </div>
      <div>{description}</div>
      <div className="flex flex-col items-center md:flex-row md:justify-between md:space-x-4 mt-4">
        <Card className=" bg-gray-200 style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}">
          <CardHeader>
            <div>
              <img src={image} className="w-full h-auto rounded-xl" />
            </div>
            <CardTitle>
              <p className="text-black font-light">{name}</p>
            </CardTitle>
            <CardDescription className="text-white">
              <p className="text-black">{description2}</p>
              <p className="text-black">{subtitle}</p>
              <p className="text-black">{price}</p>
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-gray-200">
          <CardHeader>
            <div>
              <img src={image} className="w-full h-auto rounded-xl" />
            </div>
            <CardTitle>
              <p className="text-black font-light">{name}</p>
            </CardTitle>
            <CardDescription className="text-white">
              <p className="text-black">{description2}</p>
              <p className="text-black">{subtitle}</p>
              <p className="text-black">{price}</p>
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-gray-200">
          <CardHeader>
            <div>
              <img src={image} className="w-full h-auto rounded-xl" />
            </div>
            <CardTitle>
              <p className="text-black font-light">{name}</p>
            </CardTitle>
            <CardDescription className="text-white">
              <p className="text-black">{description2}</p>
              <p className="text-black">{subtitle}</p>
              <p className="text-black">{price}</p>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default OfertsProps;
