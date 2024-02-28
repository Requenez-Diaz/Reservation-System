import React from 'react';

interface OfertsBannerProps {
  title: string;
  slogan: string;
  description: string;
}

const OfertsHeader = ({ title, slogan, description }: OfertsBannerProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">{title}</h2>
      <div className="flex items-center justify-center">
        <p className="text-lg text-gray-600">{slogan}</p>
      </div>
      <p className="text-gray-800 mt-4">{description}</p>
    </div>
  );
};

export default OfertsHeader;
