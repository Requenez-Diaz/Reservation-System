import { OfferHeader } from './OfferHeader';
import { SpecialOffers } from './SpecialOffers';

export const CardComponent = () => {
  return (
    <div>
      <OfferHeader
        description="Aqui encontraras las mejores ofertas de la semana"
        slogan="Las mejores ofertas"
        title="Ofertas"
      />
      <SpecialOffers />
    </div>
  );
};

export default CardComponent;
