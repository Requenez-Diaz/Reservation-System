'use client';

import { MessageCircle } from 'lucide-react';

interface CommentCountProps {
  count: number;
}

export function CommentCount({ count }: CommentCountProps) {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-100 rounded">
      <span className="text-sm font-medium">Comentarios totales: {count}</span>
      <div className="flex items-center">
        <MessageCircle className="w-4 h-4 mr-1 text-blue-500" />
        <span className="text-sm font-bold">{count}</span>
      </div>
    </div>
  );
}
