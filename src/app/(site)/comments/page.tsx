import React from 'react';
import { MessageSquare, Star } from 'lucide-react';
import CommentForm from '@/components/coments/commentsForms';
import CommentCard from '@/components/coments/commentCard';

const SAMPLE_COMMENTS = [
  {
    author: 'Sarah Johnson',
    date: 'March 15, 2024',
    content:
      'Amazing room with a spectacular view! The amenities were top-notch and the bed was incredibly comfortable. The staff was very attentive to all our needs.',
    rating: 5,
    likes: 24,
    dislikes: 1,
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
  },
  {
    author: 'Michael Chen',
    date: 'March 14, 2024',
    content:
      'Great location and beautiful decor. The room was spotless and well-maintained. Would definitely recommend to others!',
    rating: 4,
    likes: 15,
    dislikes: 2,
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  },
  {
    author: 'Emily Wilson',
    date: 'March 13, 2024',
    content:
      'The room exceeded my expectations. Modern amenities with a cozy feel. Perfect for both business and leisure travelers.',
    rating: 5,
    likes: 19,
    dislikes: 0,
    avatarUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
  }
];

export default function CommentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center space-x-2 mb-8">
          <MessageSquare className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Room Reviews</h1>
        </div>

        <div className="mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Reviews & Ratings
                </h2>
                <p className="text-gray-600">
                  {SAMPLE_COMMENTS.length} reviews
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-gray-900">4.7</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <Star
                      key={index}
                      size={20}
                      className={
                        index < 4
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <CommentForm />

          <div className="space-y-4">
            {SAMPLE_COMMENTS.map((comment, index) => (
              <CommentCard key={index} {...comment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
