import React from 'react';
import Collage from './collage';

interface CollageProps {
  images: { src: string; alt: string }[];
}

const Images = ({ images }: CollageProps) => {
  return (
    <div className="bg-white shadow-md p-4 rounded">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            width={300}
            height={200}
            className="w-full mb-4 rounded"
          />
        ))}
      </div>
    </div>
  );
};

export default Images;
