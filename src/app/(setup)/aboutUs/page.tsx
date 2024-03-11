import AboutUsComponent from '@/components/aboutUs/aboutUs';
import ContainerAbout from '@/components/aboutUs/containerAbout';
import Info from '@/components/aboutUs/info';
import React from 'react';

const AboutUs = () => {
  return (
    <div>
      <AboutUsComponent />
      <Info />
      <ContainerAbout />
    </div>
  );
};

export default AboutUs;
