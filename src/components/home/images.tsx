import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { DialogModal } from '../offers/modal';
interface CollageProps {
  images: {
    src: string;
    alt: string;
    tipo: string;
    precio: number;
    descripcion: string;
  }[];
}

const Images: React.FC<CollageProps> = ({ images }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div className="flex flex-col items-center" key={index}>
            <div className="relative mb-4">
              <Image
                alt={image.alt}
                className="w-full rounded"
                height={200}
                src={image.src}
                width={300}
              />
            </div>
            <div className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between">
              <div>
                <p className="text-lg font-semibold">{image.tipo}</p>
                <p className="text-lg font-semibold">
                  Precio: $ {image.precio}
                </p>
                <p className="text-justify">{image.descripcion}</p>
              </div>
              <div>
                <DialogModal />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;
