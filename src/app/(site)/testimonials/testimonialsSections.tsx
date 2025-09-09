import { getTestimonials } from '@/app/actions/testimonials/create-testimonials';
import { TestimonialsClient } from './testimonial-client';
import type { Testimonial } from './type';

export default async function TestimonialsSection() {
  const result = await getTestimonials();

  // Transformar los datos para que coincidan con la interfaz esperada
  const testimonials: Testimonial[] = result.success
    ? result.testimonials.map((testimonial) => ({
        id: testimonial.id,
        name: testimonial.name,
        avatar: testimonial.avatar,
        rating: testimonial.rating,
        comment: testimonial.comment,
        location: testimonial.location,
        createdAt:
          testimonial.createdAt instanceof Date
            ? testimonial.createdAt
            : new Date(testimonial.createdAt),
        userId: testimonial.userId,
        User: testimonial.User
      }))
    : [];

  return <TestimonialsClient initialTestimonials={testimonials} />;
}
