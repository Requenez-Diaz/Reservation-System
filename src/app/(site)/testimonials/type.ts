export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  roomType: string;
  stayDate: string;
  location: string;
}

export interface TestimonialFormData {
  name: string;
  rating: number;
  comment: string;
  roomType: string;
  stayDate: string;
  location: string;
}
