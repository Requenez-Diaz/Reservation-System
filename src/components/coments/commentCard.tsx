import React from 'react';
import { ThumbsDown, ThumbsUp, MoreVertical, Star } from 'lucide-react';

interface CommentCardProps {
  avatarUrl: string;
  content: string;
  date: string;
  dislikes: number;
  likes: number;
  rating: number;
  user: string;
}

export default function CommentCard({
  avatarUrl,
  content,
  date,
  dislikes,
  likes,
  rating,
  user
}: CommentCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <img
            alt={user}
            className="h-12 w-12 rounded-full object-cover"
            src={avatarUrl}
          />
          <div>
            <h3 className="font-semibold text-gray-800">{user}</h3>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                className={
                  index < rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }
                key={index}
                size={16}
              />
            ))}
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      <p className="mt-4 leading-relaxed text-gray-600">{content}</p>

      <div className="mt-4 flex items-center space-x-4">
        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
          <ThumbsUp size={18} />
          <span>{likes}</span>
        </button>
        <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600">
          <ThumbsDown size={18} />
          <span>{dislikes}</span>
        </button>
      </div>
    </div>
  );
}
