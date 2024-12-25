'use client';

import React, { useState } from 'react';
import StarRating from './startRating';
import { createComment } from '@/app/actions/comments/comments';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function CommentForm({ bedroomId }: { bedroomId?: number }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (status !== 'authenticated') {
      setError('You must be logged in to submit a comment.');
      return;
    }

    const formData = new FormData();
    formData.append('rating', rating.toString());
    formData.append('comment', comment);
    formData.append('content', content);
    if (bedroomId) {
      formData.append('bedroomId', bedroomId.toString());
    }

    const result = await createComment(formData);

    if (result.success) {
      // Reset form
      setRating(0);
      setComment('');
      setContent('');
      // Refresh the page or update the comments list
      router.refresh();
    } else {
      setError(
        result.error || 'An error occurred while submitting the comment.'
      );
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Please sign in to leave a comment.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Escribe tu comentario</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Calificación
        </label>
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>

      <div className="mb-4">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Tu comentario
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Comparte tu experencias..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Contenido adicional
        </label>
        <textarea
          id="content"
          name="content"
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Contenido adicional..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Enviar Comentario
      </button>
    </form>
  );
}
