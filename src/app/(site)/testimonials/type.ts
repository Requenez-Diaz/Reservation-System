export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  location: string;
  createdAt?: Date;
  userId?: number;
  User?: {
    id: number;
    username: string;
    email: string;
    image?: string | null;
  };
}

export interface TestimonialFormData {
  name: string;
  rating: number;
  comment: string;
  location: string;
}

export interface Bedroom {
  id: number;
  typeBedroom: string;
  description?: string;
}

export interface CurrentUser {
  id: number;
  username: string;
  email: string;
}
