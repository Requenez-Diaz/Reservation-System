import React from 'react';
import { Button } from 'react-day-picker';

interface OfertsBannerProps {
  title: string;
  slogan: string;
  description: string;
}

const OfertsBanner = ({ title, slogan, description }: OfertsBannerProps) => {
  return (
    <>
      <div>
        <p className="text-blue-300">{title}</p>
        <div className="flex flex-row items-center justify-between m-8">
          <p>{slogan}</p>
          <Button className="text-blue-500 font-bold">Ver mas</Button>
        </div>
        <div>{description}</div>
      </div>
    </>
  );
};

export default OfertsBanner;
