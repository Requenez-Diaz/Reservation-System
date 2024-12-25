import React from 'react';
import { MessageSquare, Star } from 'lucide-react';
import { getAllComments } from '@/app/actions/comments/getComments';
import { CommentCountWrapper } from '@/components/coments/commentsCountWrapper';
import CommentForm from '@/components/coments/commentsForms';
import CommentCard from '@/components/coments/commentCard';

export default async function CommentsPage() {
  const comments = await getAllComments();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center space-x-2 mb-8">
          <MessageSquare className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Lo que dicen nuestros cientes
          </h1>
        </div>

        <div className="mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Calificaciones y comentarios
                </h2>
                <CommentCountWrapper />
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
            {comments.map((comment, index) => (
              <CommentCard
                key={index}
                user={comment.User.username}
                date={comment.User.createdAt.toISOString()}
                content={comment.content}
                rating={comment.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
