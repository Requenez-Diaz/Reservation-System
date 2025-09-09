'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from './components/section-header';
import { TestimonialCard } from './components/testimonial-card';
import StatsSection from './components/stats-section';
import type { Testimonial, TestimonialFormData } from './type';
import { CreateTestimonialForm } from './forms/testimonial-form';

interface TestimonialsClientProps {
  initialTestimonials: Testimonial[];
  onSubmit?: (formData: TestimonialFormData) => void;
}

export function TestimonialsClient({
  initialTestimonials,
  onSubmit
}: TestimonialsClientProps) {
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(initialTestimonials);
  const [showForm, setShowForm] = useState(false);

  const handleSubmitTestimonial = (formData: TestimonialFormData) => {
    const newTestimonial: Testimonial = {
      id: testimonials.length + 1,
      name: formData.name,
      avatar: '/placeholder.svg?height=40&width=40',
      rating: formData.rating,
      comment: formData.comment,
      location: formData.location
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setShowForm(false);
    onSubmit?.(formData);
  };

  const calculateStats = () => {
    const totalReviews = testimonials.length;

    if (totalReviews === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        satisfactionPercentage: 0
      };
    }

    const averageRating =
      testimonials.reduce((sum, item) => sum + item.rating, 0) / totalReviews;
    const satisfactionPercentage = Math.round(
      (testimonials.filter((item) => item.rating >= 4).length / totalReviews) *
        100
    );

    return {
      averageRating: Number.parseFloat(averageRating.toFixed(1)),
      totalReviews,
      satisfactionPercentage
    };
  };

  const stats = calculateStats();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <SectionHeader
        title="Lo que dicen nuestros huéspedes"
        description="Descubre las experiencias reales de quienes han elegido nuestras habitaciones"
      />

      <div className="flex justify-center">
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {showForm ? 'Cancelar' : 'Escribir reseña'}
        </Button>
      </div>

      {showForm && <CreateTestimonialForm onSubmit={handleSubmitTestimonial} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      <StatsSection
        averageRating={stats.averageRating}
        totalReviews={stats.totalReviews}
        satisfactionPercentage={stats.satisfactionPercentage}
      />
    </div>
  );
}
