import React from 'react';
import OfertsHeader from './ofertsHeader';
import OfertsProps from './ofertsProps';
import SpecialOferts from './specialOferts';

const CardsComponents = () => {
  return (
    <div>
      <OfertsHeader
        title="Ofertas"
        slogan="Las mejores ofertas"
        description="Aqui encontraras las mejores ofertas de la semana"
      />

      <SpecialOferts/>
    </div>
  );
};

export default CardsComponents;
