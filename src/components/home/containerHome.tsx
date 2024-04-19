import React from 'react';
import FormBook from './formBook';
import { CarouselDemo } from './cards/carrucelServicios';
import { ContainerAboutHotels } from './adventagesHotels/containerAboutServices';
import Collage from './collage';
import CardDescriptions from './cards/cardsDescription';
import CollageImage from './collageImage';
import BannerHome from './bannerHome';

const ContainerHome = () => {
  return (
    <div>
      <BannerHome />
      <FormBook />
      <CarouselDemo />
      <ContainerAboutHotels />
      <Collage />
      <CardDescriptions />
      <CollageImage />
    </div>
  );
};

export default ContainerHome;
