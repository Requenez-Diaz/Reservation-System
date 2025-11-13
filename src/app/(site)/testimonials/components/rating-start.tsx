'use client';

import { Star } from 'lucide-react';

interface RatingStarProps {
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  rating: number;
  size?: 'sm' | 'md';
}

export function RatingStars({
  rating: starRating,
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
            className="focus:outline-none"
            key={i}
            onClick={() => onRatingChange?.(i + 1)}
            type="button"
          >
            <Star
              className={`${starSize} ${i < starRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          </button>
        ) : (
          <Star
            className={`${starSize} ${
              i < starRating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
            key={i}
          />
        )
      )}
    </>
  );
}
