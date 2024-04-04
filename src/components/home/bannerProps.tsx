import Image from 'next/image';
import React from 'react';

interface ImagesProps {
  title: string;
  description: string;
  images: { src: string; alt: string }[];
}

const BannerProps = ({ title, description, images }: ImagesProps) => {
  return (
    <div className="p-4 rounded bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              width={150}
              height={100}
              className="w-full mb-4 rounded-lg"
            />
          ))}
        </div>
        <div className="md:pr-4 flex flex-col justify-center items-center bg-yellow-50 bg-opacity-75 rounded-r-full">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-2 leading-tight">
            {title}
          </h1>
          <p className="text-black text-sm font-light">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BannerProps;
