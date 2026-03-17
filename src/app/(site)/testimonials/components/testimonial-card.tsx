import { Calendar, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Testimonial } from '../type';
import { RatingStars } from './rating-start';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 space-y-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={
                testimonial.User?.image ||
                testimonial.avatar ||
                '/placeholder.svg'
              }
            />
            <AvatarFallback>
              {testimonial.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
              {testimonial.User?.username}
            </h4>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="h-3 w-3" />
              {testimonial.location || 'Ubicación no disponible'}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            <RatingStars rating={testimonial.rating} />
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ({testimonial.rating}/5)
          </span>
        </div>

        {/* Comment */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{testimonial.comment}</p>

        {/* Stay Details */}
        <div className="pt-4 border-t border-gray-100 dark:border-slate-700 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>
              {testimonial.createdAt
                ? testimonial.createdAt.toLocaleDateString('en-US')
                : 'Fecha no disponible'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
