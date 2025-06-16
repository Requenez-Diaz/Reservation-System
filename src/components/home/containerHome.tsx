import React from 'react';
import { CarouselDescriptions } from './cardsSearchRooms/carrucelServicios';
import { ContainerAboutHotels } from './adventagesHotels/containerAboutServices';
import Collage from './galleryBedrooms/galleryBedrooms';
import CardDescriptions from './cardsSearchRooms/cardsServicesHotels';
import CollageImage from './roomInfoHome';
import BannerHome from './bannerHome';
import BookingsFormsHome from './componentsBooksForms/formBookHome';
import GalleryBedrooms from './galleryBedrooms/galleryBedrooms';
import RoomInfoHome from './roomInfoHome';
import TestimonialsSection from '@/app/(site)/testimonials/testimonialsSections';

const ContainerHome = () => {
  return (
    <div>
      <BookingsFormsHome />
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
