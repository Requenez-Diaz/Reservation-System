import React from 'react';
import { ThumbsUp, ThumbsDown, MoreVertical, Star } from 'lucide-react';
import User from '@/app/(site)/navbar/usersComponents/User';

interface CommentCardProps {
  user: string;
  date: string;
  content: string;
  rating: number;
  likes: number;
  dislikes: number;
  avatarUrl: string;
}

export default function CommentCard({
  user,
  date,
  content,
  rating,
  likes,
  dislikes,
  avatarUrl
}: CommentCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={avatarUrl}
            alt={user}
            className="w-12 h-12 rounded-full object-cover"
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
                key={index}
                size={16}
                className={
                  index < rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      <p className="mt-4 text-gray-600 leading-relaxed">{content}</p>

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
