import CardsComponents from '@/components/offers/CardsComponent';
import OfferBook from '@/components/offers/OfferBook';
import React from 'react';

export const OffersPage = () => {
  return (
    <div>
      <OfferBook />
      <CardsComponents />
    </div>
  );
};

export default OffersPage;
