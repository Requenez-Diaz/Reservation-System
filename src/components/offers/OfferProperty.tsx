import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import Image from 'next/image';
import { OfferPropertyProps } from './types';
import { SelectRoomModal } from './SelectRoomModal';

export const OfferProperty: React.FC<OfferPropertyProps> = ({
  subtitle,
  images,
  description2,
  name,
  price
}: OfferPropertyProps) => {
  return (
    <div className="bg-white mx-4">
      <div className="flex flex-col items-center md:flex-row md:items-stretch md:space-x-4 mt-4 p-4 shadow-md rounded-xl transform transition-transform hover:scale-105">
        <Card className="flex-grow bg-gray-300 shadow-md overflow-hidden rounded-xl">
          <CardHeader>
            <div className="mb-4 h-40 md:h-48 relative">
              <Image
                alt={images[0].alt}
                className="rounded-t-xl"
                layout="fill"
                objectFit="cover"
                src={images[0].src}
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
                <SelectRoomModal />
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default OfferProperty;
