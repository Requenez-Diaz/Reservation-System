import React from 'react';
import { CarouselDescriptions } from './cardsSearchRooms/carrucelServicios';
import { ContainerAboutHotels } from './adventagesHotels/containerAboutServices';
import Collage from './collage';
import CardDescriptions from './cardsSearchRooms/cardsDescription';
import CollageImage from './collageImage';
import BannerHome from './bannerHome';
import BookingsFormsHome from './componentsBooksForms/formBookHome';

const ContainerHome = () => {
  return (
    <div>
      <BannerHome />
      <BookingsFormsHome />
      <CarouselDescriptions />
      <ContainerAboutHotels />
      {/* <Collage />
      <CardDescriptions />
      <CollageImage /> */}
    </div>
  );
};

export default ContainerHome;
