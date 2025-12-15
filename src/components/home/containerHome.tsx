import React from 'react';
import { ContainerAboutHotels } from './adventagesHotels/containerAboutServices';
import CardDescriptions from './cardsSearchRooms/cardsServicesHotels';
import GalleryBedrooms from './galleryBedrooms/galleryBedrooms';
import TestimonialsSection from '@/app/(site)/testimonials/testimonialsSections';
import BedroomSearch from './componentsBooksForms/bedroomsSearch';
import { BannerHome } from './bannerHome';
import HabitacionesPage from '@/app/(site)/bedrooms/page';

const ContainerHome = () => {
  return (
    <div>
      <BannerHome />
      <BedroomSearch />
      {/* <CarouselDescriptions /> */}
      <ContainerAboutHotels />
      <GalleryBedrooms />
      <CardDescriptions />
      {/* <RoomInfoHome /> */}
      <HabitacionesPage
        typeBedroom={''}
        description={''}
        lowSeasonPrice={0}
        status={false}
        numberBedroom={0}
        imageUrl={''}
      />
      <TestimonialsSection />
    </div>
  );
};

export default ContainerHome;
