import { getTestimonials } from '@/app/actions/testimonials/create-testimonials';
import { TestimonialsClient } from './testimonial-client';
import type { Testimonial } from './type';

export default async function TestimonialsSection() {
  // Obtener testimonios reales de la base de datos
  const result = await getTestimonials();

  // Transformar los datos para que coincidan con la interfaz esperada
  const testimonials: Testimonial[] = result.success
    ? result.testimonials.map((testimonial) => ({
        id: testimonial.id,
        name: testimonial.name,
        avatar: testimonial.avatar,
        rating: testimonial.rating,
        comment: testimonial.comment,
        roomType: testimonial.roomType,
        stayDate:
          testimonial.stayDate instanceof Date
            ? testimonial.stayDate.toISOString()
            : testimonial.stayDate,
        location: testimonial.location,
        createdAt:
          testimonial.createdAt instanceof Date
            ? testimonial.createdAt.toISOString()
            : testimonial.createdAt,
        userId: testimonial.userId,
        User: testimonial.User
      }))
    : [];

  return <TestimonialsClient initialTestimonials={testimonials} />;
}
