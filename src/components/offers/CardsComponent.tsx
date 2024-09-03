import Component from './cardOfertComponent';
import { OfferHeader } from './OfferHeader';

export const CardComponent = () => {
  return (
    <div>
      <OfferHeader
        description="Aqui encontraras las mejores ofertas de la semana"
        slogan="Las mejores ofertas"
        title="Ofertas"
      />

      <div>
        <Component />
      </div>
    </div>
  );
};

export default CardComponent;
