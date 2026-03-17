import { getTestimonials } from '@/app/actions/testimonials/create-testimonials';
import { TestimonialsClient } from './testimonial-client';
import type { Testimonial } from './type';

export default async function TestimonialsSection() {
  const result = await getTestimonials();


  const source = result.success ? result.testimonials ?? [] : [];
  const testimonials: Testimonial[] = source.map((testimonial) => ({
    id: testimonial.id,
    name: testimonial.name,
    avatar: testimonial.User?.image || testimonial.avatar,
    rating: testimonial.rating,
    comment: testimonial.comment,
    location: testimonial.location,
    createdAt:
      testimonial.createdAt instanceof Date
        ? testimonial.createdAt
        : new Date(testimonial.createdAt),
    userId: testimonial.userId ?? undefined,
    User: testimonial.User ?? undefined
  }));

  return <TestimonialsClient initialTestimonials={testimonials} />;
}
