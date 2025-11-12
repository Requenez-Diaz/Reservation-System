import React from 'react';
import { Star } from 'lucide-react';

interface Comment {
  user: string;
  date: string;
  content: string;
  rating: number;
}

const SAMPLE_COMMENTS: Comment[] = [
  {
    user: 'John Doe',
    date: 'March 15, 2024',
    content: 'Great room with amazing views!',
    rating: 5
  },
  {
    user: 'Jane Smith',
    date: 'March 14, 2024',
    content: 'Clean and comfortable, would stay again.',
    rating: 4
  }
];

export default function CommentList() {
  return (
    <div className="space-y-4">
      {SAMPLE_COMMENTS.map((comment, index) => (
        <div
          className="bg-white rounded-lg p-4 shadow-sm" // CORRECCIÓN: className antes de key
          key={index}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">{comment.user}</h4>{' '}
              {/* Corregido para usar comment.user */}
              <p className="text-sm text-gray-500">{comment.date}</p>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  className={
                    i < comment.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }
                  key={i}
                  size={16}
                />
              ))}
            </div>
          </div>
          <p className="mt-2 text-gray-600">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}
