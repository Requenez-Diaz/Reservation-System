export interface OfferCard {
  title: string;
  slogan: string;
  subtitle: string;
  description: string;
  name: string;
  description2: string;
  price: number;
  images: string;
}

export interface OfferPropertyProps {
  subtitle: string;
  description: string;
  name: string;
  description2: string;
  price: number;
  images: { src: string; alt: string }[];
}

export interface OfferHeaderProps {
  title: string;
  slogan: string;
  description: string;
}

export interface BannerProps {
  image: string;
  text: string;
}

export interface RoomCardProps {
  type: 'Habitación Estándar' | 'Suite de Lujo';
  description: string;
  price: number;
  image: string;
}
