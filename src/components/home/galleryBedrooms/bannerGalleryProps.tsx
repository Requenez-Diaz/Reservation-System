import Image from 'next/image';
import React from 'react';

interface ImagesProps {
  title: string;
  description: string;
  images: { src: string; alt: string }[];
}

const BannerGalleryProps = ({ title, description, images }: ImagesProps) => {
  return (
    <div className="rounded bg-gray-100 p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2">
          {images.map((image, index) => (
            <Image
              alt={image.alt}
              className="mb-4 w-full rounded-lg"
              height={100}
              key={index}
              src={image.src}
              width={150}
            />
          ))}
        </div>
        <div className="flex flex-col items-center justify-center rounded-r-full bg-yellow-50 bg-opacity-75 md:pr-4">
          <h1 className="ml-2 mb-2 text-4xl font-extrabold leading-tight text-black md:text-5xl">
            {title}
          </h1>
          <p className="ml-2 text-sm font-light text-black">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BannerGalleryProps;
