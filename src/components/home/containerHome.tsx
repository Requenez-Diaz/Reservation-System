import React from 'react';
import { CarouselDescriptions } from './cardsSearchRooms/carrucelServicios';
import { ContainerAboutHotels } from './adventagesHotels/containerAboutServices';
import CardDescriptions from './cardsSearchRooms/cardsServicesHotels';
import BannerHome from './bannerHome';
import GalleryBedrooms from './galleryBedrooms/galleryBedrooms';
import RoomInfoHome from './roomInfoHome';
import TestimonialsSection from '@/app/(site)/testimonials/testimonialsSections';
import BedroomSearch from './componentsBooksForms/bedroomsSearch';

const ContainerHome = () => {
  return (
    <div>
      <BedroomSearch />
      <BannerHome />
      <CarouselDescriptions />
      <ContainerAboutHotels />
      <GalleryBedrooms />
      <CardDescriptions />
      <RoomInfoHome />
      <TestimonialsSection />
    </div>
  );
};

export default ContainerHome;
