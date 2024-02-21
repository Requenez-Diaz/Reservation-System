import React from 'react';
import Collage from './collage';
import { Button } from '../ui/button';

interface CollageProps {
  images: { src: string; alt: string }[];
}

const Images = ({ images }: CollageProps) => {
  return (
    <div className="bg-white shadow-md p-4 rounded">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image.src}
              alt={image.alt}
              width={300}
              height={200}
              className="w-full mb-4 rounded"
            />
            <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-2">
              <Button className="px-4 py-2 bg-blue-500 text-white">
                Ver más
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;
