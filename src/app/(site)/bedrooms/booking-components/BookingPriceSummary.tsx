'use client';

import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

interface BookingPriceSummaryProps {
  pricePerNight: number;
  highSeasonPrice: number;
  nightsCount: number;
  totalAmount: number;
}

export function BookingPriceSummary({
  pricePerNight,
  highSeasonPrice,
  nightsCount,
  totalAmount
}: BookingPriceSummaryProps) {
  const isHighSeason = pricePerNight === highSeasonPrice;

  return (
    <>
      <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
            Precio por noche
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-orange-600">
              C${pricePerNight.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-bold">/ noche</span>
          </div>
        </div>
        <Badge
          className={
            isHighSeason ? 'bg-orange-600 animate-pulse' : 'bg-emerald-600'
          }
        >
          Temporada {isHighSeason ? 'Alta' : 'Baja'}
        </Badge>
      </div>

      {nightsCount > 0 && (
        <div className="bg-orange-50/50 dark:bg-orange-950/30 p-4 rounded-xl border border-orange-100 dark:border-orange-900/50 flex justify-between items-center">
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
              Total: C${totalAmount.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">
              {nightsCount} noches
            </p>
          </div>
          <div className="flex items-center gap-1 text-orange-600 text-xs font-bold bg-white dark:bg-slate-800 px-2 py-1 rounded-full shadow-sm">
            <CheckCircle2 className="h-3 w-3" /> Precio Garantizado
          </div>
        </div>
      )}
    </>
  );
}
