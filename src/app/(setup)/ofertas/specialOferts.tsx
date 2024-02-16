import React from 'react';
import OfertsProps from './ofertsProps';

const SpecialOferts = () => {
  return (
    <div>
      <OfertsProps
        title="Ofertas Especiales"
        slogan="Las mejores ofertas las encuentras aquí"
        description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo"
        subtitle="Las mejores ofertas"
        image=" https://images.hola.com/imagenes/decoracion/20230425230358/dormitorios-inspirados-en-habitaciones-hoteles-am/1-237-31/habitaciones-hotel-8a-a.jpg"
        name="Habitaión de hotel"
        description2="Las mejores ofertas del mercado"
        price={100}
      />
    </div>
  );
};

export default SpecialOferts;
