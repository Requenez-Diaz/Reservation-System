import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import Image from 'next/image';

interface OfertsProps {
  title: string;
  slogan: string;
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
    <div className="bg-white mt-4 ml-4 mr-4">
      <div className="flex flex-col items-center md:flex-row md:justify-between md:space-x-4 mt-4 p-4 shadow-md rounded-xl  transform transition-transform hover:scale-105">
        <Card className="bg-gray-200 shadow-md">
          <CardHeader>
            {images.map((image, index) => (
              <div key={index} className="mb-4">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={200}
                  height={200}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            ))}
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
        O O
      </div>
    </div>
  );
};

export default OfertsProps;
