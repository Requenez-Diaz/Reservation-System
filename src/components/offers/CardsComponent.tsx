import { OfferHeader } from './OfferHeader';
import SpecialOferts from './SpecialOffer';

export const CardComponent = () => {
  return (
    <div>
      <OfferHeader
        description="Aqui encontraras las mejores ofertas de la semana"
        slogan="Las mejores ofertas"
        title="Ofertas"
      />

      <SpecialOferts />
    </div>
  );
};

export default CardComponent;
