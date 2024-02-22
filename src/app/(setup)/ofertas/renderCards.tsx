import React from 'react';
import HabitacionCard from './cardsOferts';
interface Habitacion {
  id: number;
  image: string;
  name: string;
  description: string;
  subtitle: string;
  price: string;
}

const RenderCards = () => {
  const habitaciones: Habitacion[] = [
    {
      id: 1,
      image:
        'https://images.hola.com/imagenes/decoracion/20230425230358/dormitorios-inspirados-en-habitaciones-hoteles-am/1-237-22/habitaciones-hotel-9m-m.jpg?tx=w_680',
      name: 'Habitación Estándar',
      description: 'Descripción de la habitación estándar.',
      subtitle: 'Incluye desayuno gratuito',
      price: '$100 por noche'
    },
    {
      id: 2,
      image: 'ruta/de/imagen2.jpg',
      name: 'Suite de Lujo',
      description: 'Descripción de la suite de lujo.',
      subtitle: 'Vista panorámica y servicios exclusivos',
      price: '$200 por noche'
    }
  ];
  return (
    <div>
      {habitaciones.map((habitacion) => (
        <HabitacionCard key={habitacion.id} habitacion={habitacion} />
      ))}
    </div>
  );
};

export default RenderCards;
