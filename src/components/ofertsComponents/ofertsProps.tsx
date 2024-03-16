import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';
import { DialogModal } from './modal';

interface OfertsProps {
  subtitle: string;
  description: string;
  name: string;
  description2: string;
  price: number;
  images: { src: string; alt: string }[];
}

const OfertsProps: React.FC<OfertsProps> = ({
  subtitle,
  images,
  description2,
  name,
  price
}: OfertsProps) => {
  return (
    <div className="bg-white mx-4">
      <div className="flex flex-col items-center md:flex-row md:items-stretch md:space-x-4 mt-4 p-4 shadow-md rounded-xl transform transition-transform hover:scale-105">
        <Card className="flex-grow bg-gray-300 shadow-md overflow-hidden rounded-xl">
          <CardHeader>
            <div className="mb-4 h-40 md:h-48 relative">
              <Image
                src={images[0].src}
                alt={images[0].alt}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
              />
            </div>
            <CardTitle>
              <p className="text-black font-semibold text-lg md:text-xl mb-2">
                {name}
              </p>
            </CardTitle>
            <CardDescription className="text-gray-800">
              <p className="text-sm md:text-base font-light mb-2">{subtitle}</p>
              <p className="text-sm md:text-base mb-2">{description2}</p>
              <div className="flex flex-row justify-around items-center">
                <p className="text-yellow-600 text-lg md:text-xl font-semibold">
                  ${price} / noche
                </p>
                <DialogModal />
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default OfertsProps;
