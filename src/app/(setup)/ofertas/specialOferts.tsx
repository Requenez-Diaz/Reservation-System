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
        image=" https://media.istockphoto.com/id/1467126728/es/foto/dise%C3%B1o-interior-de-dormitorio-moderno-escandinavo-y-japon%C3%A9sdi-con-cama-color-blanco-mesa-y.jpg?s=2048x2048&w=is&k=20&c=iFU05E8kHNDlRYQeF4lyXZmAW53WUpfM8fJRANmRWvI="
        name="Habitaión de hotel"
        description2="Las mejores ofertas del mercado"
        price={100}
      />
    </div>
  );
};

export default SpecialOferts;
