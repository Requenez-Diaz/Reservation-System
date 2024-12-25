import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export default function StarRating({
  rating,
  onRatingChange
}: StarRatingProps) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => onRatingChange(value)}
          className="focus:outline-none"
        >
          <Star
            size={24}
            className={`${
              value <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } cursor-pointer hover:text-yellow-400 transition-colors`}
          />
        </button>
      ))}
    </div>
  );
}
