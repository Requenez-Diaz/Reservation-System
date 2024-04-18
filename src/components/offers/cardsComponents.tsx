import OfertsHeader from './OfferHeader';
import SpecialOferts from './SpecialOffer';

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
