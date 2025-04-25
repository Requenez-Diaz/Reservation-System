'use client';

import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Percent } from 'lucide-react';

interface PromotionBadgeProps {
  code: string;
  discount: number;
  dateStart: string | Date;
  dateEnd: string | Date;
  onClick?: () => void;
}

export function PromotionBadge({
  code,
  discount,
  dateStart,
  dateEnd,
  onClick
}: PromotionBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className="bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer flex items-center gap-1"
      onClick={onClick}
    >
      <Percent className="h-3 w-3" />
      {discount}% OFF
      <span className="sr-only">
        Promoción {code} válida desde {formatDate(dateStart)} hasta{' '}
        {formatDate(dateEnd)}
      </span>
    </Badge>
  );
}
