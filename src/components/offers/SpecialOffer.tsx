import React from 'react';
import OfertsProps from './ofertsProps';

interface OfferCard {
  title: string;
  slogan: string;
  subtitle: string;
  description: string;
  name: string;
  description2: string;
  price: number;
  images: string;
}

export const SpecialOffer = () => {
  const containerImage: OfferCard[] = [
    {
      title: 'Ofertas Especiales',
      slogan: '¡Aprovecha nuestras ofertas especiales!',
      subtitle: 'Incluye desayuno gratuito',
      description: 'Descripción de la habitación estándar.',
      name: 'Habitación Estándar',
      description2: 'Descripción de la habitación estándar.',
      price: 100,
      images:
        'https://media.istockphoto.com/id/1467126728/es/foto/dise%C3%B1o-interior-de-dormitorio-moderno-escandinavo-y-japon%C3%A9sdi-con-cama-color-blanco-mesa-y.jpg?s=2048x2048&w=is&k=20&c=iFU05E8kHNDlRYQeF4lyXZmAW53WUpfM8fJRANmRWvI='
    },
    {
      title: 'Ofertas Especiales',
      slogan: '¡Aprovecha nuestras ofertas especiales!',
      subtitle: 'Vista panorámica y servicios exclusivos',
      description: 'Descripción de la suite de lujo.',
      name: 'Suite de Lujo',
      description2: 'Descripción de la suite de lujo.',
      price: 200,
      images:
        'https://media.istockphoto.com/id/1467126728/es/foto/dise%C3%B1o-interior-de-dormitorio-moderno-escandinavo-y-japon%C3%A9sdi-con-cama-color-blanco-mesa-y.jpg?s=2048x2048&w=is&k=20&c=iFU05E8kHNDlRYQeF4lyXZmAW53WUpfM8fJRANmRWvI='
    },
    {
      title: 'Ofertas Especiales',
      slogan: '¡Aprovecha nuestras ofertas especiales!',
      subtitle: 'Vista panorámica y servicios exclusivos',
      description: 'Descripción de la suite de lujo.',
      name: 'Suite de Lujo',
      description2: 'Descripción de la suite de lujo.',
      price: 200,
      images:
        'https://media.istockphoto.com/id/1467126728/es/foto/dise%C3%B1o-interior-de-dormitorio-moderno-escandinavo-y-japon%C3%A9sdi-con-cama-color-blanco-mesa-y.jpg?s=2048x2048&w=is&k=20&c=iFU05E8kHNDlRYQeF4lyXZmAW53WUpfM8fJRANmRWvI='
    },

    {
      title: 'Ofertas Especiales',
      slogan: '¡Aprovecha nuestras ofertas especiales!',
      subtitle: 'Incluye desayuno gratuito',
      description: 'Descripción de la habitación estándar.',
      name: 'Habitación Estándar',
      description2: 'Descripción de la habitación estándar.',
      price: 100,
      images:
        'https://media.istockphoto.com/id/1467126728/es/foto/dise%C3%B1o-interior-de-dormitorio-moderno-escandinavo-y-japon%C3%A9sdi-con-cama-color-blanco-mesa-y.jpg?s=2048x2048&w=is&k=20&c=iFU05E8kHNDlRYQeF4lyXZmAW53WUpfM8fJRANmRWvI='
    },
    {
      title: 'Ofertas Especiales',
      slogan: '¡Aprovecha nuestras ofertas especiales!',
      subtitle: 'Vista panorámica y servicios exclusivos',
      description: 'Descripción de la suite de lujo.',
      name: 'Suite de Lujo',
      description2: 'Descripción de la suite de lujo.',
      price: 200,
      images:
        'https://media.istockphoto.com/id/1467126728/es/foto/dise%C3%B1o-interior-de-dormitorio-moderno-escandinavo-y-japon%C3%A9sdi-con-cama-color-blanco-mesa-y.jpg?s=2048x2048&w=is&k=20&c=iFU05E8kHNDlRYQeF4lyXZmAW53WUpfM8fJRANmRWvI='
    },
    {
      title: 'Ofertas Especiales',
      slogan: '¡Aprovecha nuestras ofertas especiales!',
      subtitle: 'Vista panorámica y servicios exclusivos',
      description: 'Descripción de la suite de lujo.',
      name: 'Suite de Lujo',
      description2: 'Descripción de la suite de lujo.',
      price: 200,
      images:
        'https://media.istockphoto.com/id/1467126728/es/foto/dise%C3%B1o-interior-de-dormitorio-moderno-escandinavo-y-japon%C3%A9sdi-con-cama-color-blanco-mesa-y.jpg?s=2048x2048&w=is&k=20&c=iFU05E8kHNDlRYQeF4lyXZmAW53WUpfM8fJRANmRWvI='
    }
  ];

  return (
    <div className="p-8 grid grid-cols-4 gap-4">
      {containerImage.map((ofert, index) => (
        <OfertsProps
          description={ofert.description}
          description2={ofert.description2}
          images={[{ src: ofert.images, alt: ofert.name }]}
          key={index}
          name={ofert.name}
          price={ofert.price}
          subtitle={ofert.subtitle}
        />
      ))}
    </div>
  );
};

export default SpecialOffer;
