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
  const bedroom = promotion.BedroomsPromotions[0]?.bedroom;

  // Si no hay habitación vinculada, no renderizamos para evitar errores
  if (!bedroom) {
    return null;
  }

  const isActive = new Date() <= new Date(promotion.dateEnd);

  return (
    <Card className="group overflow-hidden border-none shadow-lg transition-all hover:shadow-2xl dark:bg-zinc-900">
      {/* CONTENEDOR DE IMAGEN */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={bedroom.image || '/placeholder-room.jpg'}
          alt={`Habitación ${bedroom.number}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Capa de degradado para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/70 via-black/20 to-transparent" />

        {/* Badge de Descuento Flotante */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-white shadow-xl">
          <TicketPercent className="h-4 w-4" />
          <span className="text-sm font-black">
            {promotion.porcentageDescuent}% OFF
          </span>
        </div>

        {/* Estado Activo/Inactivo */}
        <div className="absolute top-4 right-4">
          <Badge
            className={
              isActive ? 'bg-green-500/90 backdrop-blur-md' : 'bg-zinc-500/90'
            }
          >
            {isActive ? 'Oferta Activa' : 'Finalizada'}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <BedDouble className="h-5 w-5" />
            <CardTitle className="text-xl font-bold">
              {bedroom.typeBedroom}
            </CardTitle>
          </div>
          <span className="text-sm font-bold text-muted-foreground">
            #{bedroom.number}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Detalles de la Habitación */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <MapPin className="h-4 w-4 text-red-500" />
            <span className="truncate">{bedroom.name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span>
              Vence: {new Date(promotion.dateEnd).toLocaleDateString('es-ES')}
            </span>
          </div>
        </div>

        {/* Código de Promoción */}
        <div className="rounded-lg bg-zinc-100 p-2 text-center dark:bg-zinc-800">
          <p className="text-xs uppercase text-zinc-500">Código Promo</p>
          <p className="font-mono font-bold tracking-widest text-primary">
            {promotion.codePromotions}
          </p>
        </div>

        {/* Botón de Acción */}
        <Link href={`/ofertas/${promotion.id}`} className="block">
          <Button className="w-full bg-blue-600 font-bold transition-all hover:bg-blue-700 dark:bg-white blue:text-white dark:hover:bg-primary">
            VER DISPONIBILIDAD
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
