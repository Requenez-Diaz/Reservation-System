'use client';

import { Star } from 'lucide-react';

interface RatingStarProps {
  rating: number;
  interactive?: boolean;
  size?: 'sm' | 'md';
  onRatingChange?: (rating: number) => void;
}

export function RatingStars({
  rating,
  interactive = false,
  size = 'sm',
  onRatingChange
}: RatingStarProps) {
  const starSize = size === 'sm' ? 'h-4 w-4' : 'h-6 w-6';

  return (
    <>
      {Array.from({ length: 5 }, (_, i) =>
        interactive ? (
          <button
            key={i}
            type="button"
            onClick={() => onRatingChange?.(i + 1)}
            className="focus:outline-none"
          >
            <Star
              className={`${starSize} ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          </button>
        ) : (
          <Star
            key={i}
            className={`${starSize} ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        )
      )}
    </>
  );
}
