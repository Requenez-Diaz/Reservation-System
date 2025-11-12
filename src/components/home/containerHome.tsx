import React from 'react';
import { ContainerAboutHotels } from './adventagesHotels/containerAboutServices';
import CardDescriptions from './cardsSearchRooms/cardsServicesHotels';
import GalleryBedrooms from './galleryBedrooms/galleryBedrooms';
import RoomInfoHome from './roomInfoHome';
import TestimonialsSection from '@/app/(site)/testimonials/testimonialsSections';
import BedroomSearch from './componentsBooksForms/bedroomsSearch';
import { BannerHome } from './bannerHome';

const ContainerHome = () => {
  return (
    <div>
      <BannerHome />
      <BedroomSearch />
      {/* <CarouselDescriptions /> */}
      <ContainerAboutHotels />
      <GalleryBedrooms />
      <CardDescriptions />
      <RoomInfoHome />
      <TestimonialsSection />
    </div>
  );
};

export default ContainerHome;
