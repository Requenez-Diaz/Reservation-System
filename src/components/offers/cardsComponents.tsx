import React from 'react';
import OfertsHeader from './ofertsHeader';
import OfertsProps from './ofertsProps';
import SpecialOferts from './specialOferts';

const CardsComponents = () => {
  return (
    <div>
      <OfertsHeader
        description="Aqui encontraras las mejores ofertas de la semana"
        slogan="Las mejores ofertas"
        title="Ofertas"
      />

      <SpecialOferts />
    </div>
  );
};

export default CardsComponents;
