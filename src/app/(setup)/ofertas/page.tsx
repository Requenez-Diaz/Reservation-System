import CardsComponents from '@/components/ofertsComponents/cardsComponents';
import ModalComponent from '@/components/ofertsComponents/modal';
import OfertsBook from '@/components/ofertsComponents/oferts';
import React from 'react';

const Ofertas = () => {
  return (
    <div>
      <OfertsBook />
      <CardsComponents />
      {/* <ModalComponent /> */}
    </div>
  );
};

export default Ofertas;
