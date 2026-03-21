'use client';

import { Bed, Users } from 'lucide-react';

interface Bedroom {
  id: string | number;
  name: string;
  numberBedroom: number;
  capacity: number;
  BedroomImages?: Array<{ id: string; image: string }>;
}

interface BookingHeaderProps {
  bedroom: Bedroom;
  imageUrl: string;
}

export function BookingHeader({ bedroom, imageUrl }: BookingHeaderProps) {
  return (
    <div className="relative h-56">
      <img
        src={imageUrl}
        alt={bedroom.name}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
      <div className="absolute bottom-6 left-6 text-white">
        <h2 className="text-3xl font-black italic tracking-tighter uppercase">
          {bedroom.name}
        </h2>
        <div className="flex items-center gap-3 mt-1 text-slate-200">
          <span className="flex items-center gap-1 text-sm">
            <Bed className="h-4 w-4" /> Hab. {bedroom.numberBedroom}
          </span>
          <span className="flex items-center gap-1 text-sm">
            <Users className="h-4 w-4" /> Cap. {bedroom.capacity}
          </span>
        </div>
      </div>
    </div>
  );
}
