import { Testimonial } from './type';

export const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'María González',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 5,
    comment:
      '¡Experiencia increíble! La habitación estaba impecable y el servicio fue excepcional. Definitivamente volveré a reservar aquí.',
    roomType: 'Suite Deluxe',
    stayDate: 'Marzo 2024',
    location: 'Madrid, España'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 5,
    comment:
      'Perfecto para mi viaje de negocios. Ubicación excelente, WiFi rápido y desayuno delicioso. Muy recomendado.',
    roomType: 'Habitación Ejecutiva',
    stayDate: 'Febrero 2024',
    location: 'Barcelona, España'
  },
  {
    id: 3,
    name: 'Ana Martínez',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 4,
    comment:
      'Muy buena relación calidad-precio. Las instalaciones están bien mantenidas y el personal es muy amable.',
    roomType: 'Habitación Estándar',
    stayDate: 'Enero 2024',
    location: 'Valencia, España'
  }
];
