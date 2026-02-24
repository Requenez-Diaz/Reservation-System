'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  MapPin,
  TicketPercent,
  ArrowRight,
  BedDouble
} from 'lucide-react';
import Link from 'next/link';

interface PromotionRoomCardProps {
  promotion: {
    id: number;
    codePromotions: string;
    porcentageDescuent: number;
    dateStart: string;
    dateEnd: string;
    description?: string;
    BedroomsPromotions: Array<{
      bedroom: {
        id: number;
        name: string;
        type: string;
        number: string;
        typeBedroom: string;
        image: string;
      };
    }>;
  };
}

export function PromotionRoomCard({ promotion }: PromotionRoomCardProps) {
  const bedroomData = promotion.BedroomsPromotions[0]?.bedroom;

  if (!bedroomData) {
    return null;
  }

  const isActive = new Date() <= new Date(promotion.dateEnd);

  return (
    <Card className="group overflow-hidden border-none shadow-lg transition-all hover:shadow-2xl bg-white">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={bedroomData.image || '/luxury-hotel-room.png'}
          alt={`Habitación ${bedroomData.number}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-orange-600 px-3 py-1.5 text-white shadow-xl">
          <TicketPercent className="h-4 w-4" />
          <span className="text-sm font-black">
            {promotion.porcentageDescuent}% OFF
          </span>
        </div>

        <div className="absolute top-4 right-4">
          <Badge
            className={
              isActive ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'
            }
          >
            {isActive ? 'Oferta Activa' : 'Finalizada'}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BedDouble className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-xl font-bold text-slate-800">
              {bedroomData.typeBedroom}
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-slate-500 border-slate-200">
            #{bedroomData.number}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="h-4 w-4 text-orange-500" />
            <span className="truncate">{bedroomData.name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>
              Vence: {new Date(promotion.dateEnd).toLocaleDateString('es-ES')}
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 border border-slate-100 p-2 text-center">
          <p className="text-[10px] uppercase text-slate-400 font-bold">
            Código de Descuento
          </p>
          <p className="font-mono font-black tracking-widest text-orange-600">
            {promotion.codePromotions}
          </p>
        </div>

        <Link href={`/ofertas/${promotion.id}`} className="block">
          <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold transition-all">
            VER DISPONIBILIDAD
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
