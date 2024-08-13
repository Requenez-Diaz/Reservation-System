import React from 'react';
import { CarouselDescriptions } from './cardsSearchRooms/carrucelServicios';
import { ContainerAboutHotels } from './adventagesHotels/containerAboutServices';
import Collage from './galleryBedrooms/galleryBedrooms';
import CardDescriptions from './cardsSearchRooms/cardsServicesHotels';
import CollageImage from './collageImage';
import BannerHome from './bannerHome';
import BookingsFormsHome from './componentsBooksForms/formBookHome';
import GalleryBedrooms from './galleryBedrooms/galleryBedrooms';

const ContainerHome = () => {
  return (
    <div>
      <BookingsFormsHome />
      <BannerHome />
      <CarouselDescriptions />
      <ContainerAboutHotels />
      <GalleryBedrooms />
      <CardDescriptions />
      <CollageImage />
    </div>
  );
};

export default ContainerHome;
