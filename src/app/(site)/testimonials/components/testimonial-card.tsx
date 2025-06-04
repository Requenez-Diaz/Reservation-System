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
              src={testimonial.avatar || '/placeholder.svg'}
              alt={testimonial.name}
            />
            <AvatarFallback>
              {testimonial.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="h-3 w-3" />
              {testimonial.location}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            <RatingStars rating={testimonial.rating} />
          </div>
          <span className="text-sm text-gray-600">
            ({testimonial.rating}/5)
          </span>
        </div>

        {/* Comment */}
        <p className="text-gray-700 leading-relaxed">{testimonial.comment}</p>

        {/* Stay Details */}
        <div className="pt-4 border-t border-gray-100 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{testimonial.stayDate}</span>
          </div>
          <div className="text-sm font-medium text-blue-600">
            {testimonial.roomType}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
