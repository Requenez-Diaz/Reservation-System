import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  onRatingChange: (rating: number) => void;
  rating: number;
}

export default function StarRating({
  rating,
  onRatingChange
}: StarRatingProps) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          className="focus:outline-none"
          key={value}
          onClick={() => onRatingChange(value)}
          type="button"
        >
          <Star
            className={`cursor-pointer transition-colors ${
              value <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300 hover:text-yellow-400'
            }`}
            size={24}
          />
        </button>
      ))}
    </div>
  );
}
