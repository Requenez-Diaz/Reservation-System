import React from 'react';

interface ImagesProps {
  title: string;
  description: string;
  images: { src: string; alt: string }[];
}

const BannerProps = ({ title, description, images }: ImagesProps) => {
  return (
    <div className=" p-4 rounded">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              width={150}
              height={100}
              className="w-full mb-4 rounded-2xl"
            />
          ))}
        </div>
        <div className="md:pr-4 flex flex-col justify-center items-center bg-blue-900 rounded-r-full">
          <h1 className="text-5xl font-extrabold text-white mb-2 leading-tight tracking-wide text-shadow">
            {' '}
            {title}
          </h1>
          <p className="text-gray-300 text-sm font-light text-shadow">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerProps;
