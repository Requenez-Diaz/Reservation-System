'use client';

import type React from 'react';

import { useMemo, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, CreditCard, MapPin, User2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { createReservationForPromotion } from '@/app/actions/bookings/reservation-offerts';
import { getCurrentUser } from '@/app/actions/testimonials/create-testimonials';
import { useRouter } from 'next/navigation'; // Importar useRouter

type User = {
  id: number;
  username: string;
  email: string;
};

type ReserveRoomDialogProps = {
  promotionId: number;
  bedroom: {
    id: number;
    name: string;
    type: string;
    number: string;
    typeBedroom?: string;
  };
  pricePerNight: number;
  promotionDateStart: string | Date;
  promotionDateEnd: string | Date;
};

export function ReserveRoomDialog({
  promotionId,
  bedroom,
  pricePerNight,
  promotionDateStart,
  promotionDateEnd
}: ReserveRoomDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const router = useRouter(); // Inicializar router

  useEffect(() => {
    if (open && !currentUser && !isLoadingUser) {
      loadCurrentUser();
    }
  }, [open, currentUser, isLoadingUser]);

  const loadCurrentUser = async () => {
    setIsLoadingUser(true);
    try {
      const result = await getCurrentUser();
      if (result.success) {
        setCurrentUser(result.user ?? null);
      } else {
        toast({
          title: 'Error',
          description:
            'No se pudo cargar el usuario. Por favor, inicia sesión.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error de servidor al cargar usuario.',
        variant: 'destructive'
      });
    } finally {
      setIsLoadingUser(false);
    }
  };

  const defaultCheckIn = useMemo(() => {
    const d = new Date(promotionDateStart);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [promotionDateStart]);

  const defaultCheckOut = useMemo(() => {
    const d = new Date(promotionDateEnd);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [promotionDateEnd]);

  const toInputDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!currentUser) {
      toast({
        title: 'Error',
        description: 'Debes iniciar sesión para hacer una reserva.',
        variant: 'destructive'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData(e.currentTarget);
      console.log('Form data:', Object.fromEntries(formData.entries()));

      const result = await createReservationForPromotion(
        { success: false, message: '' },
        formData
      );

      console.log('Reservation result:', result);

      if (result.success) {
        toast({
          title: 'Reserva confirmada',
          description: `Reserva #${result.reservationId} creada exitosamente.`
        });
        setOpen(false);
        e.currentTarget.reset();
      } else {
        toast({
          title: 'No se pudo crear la reserva',
          description: result.message,
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error al crear la reserva',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'save'} className="w-full md:w-auto">
          Reservar habitación
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reservar habitación con oferta</DialogTitle>
          <DialogDescription>
            Completa los datos para confirmar tu reserva.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-3 rounded-lg border bg-muted/40">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="font-medium">
                {bedroom.name} - {bedroom.type} #{bedroom.number}
              </span>
              <Badge variant="info" className="ml-auto">
                ID: {bedroom.id}
              </Badge>
            </div>
            {bedroom.typeBedroom && (
              <p className="text-xs text-muted-foreground mt-1">
                {bedroom.typeBedroom}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2 text-green-700">
              <CreditCard className="h-4 w-4" />
              <span className="text-sm">
                Precio por noche con descuento:{' '}
                <strong>${pricePerNight.toFixed(2)}</strong>
              </span>
            </div>
          </div>

          {isLoadingUser ? (
            <div className="p-3 rounded-lg border bg-blue-50">
              <p className="text-sm text-blue-700">
                Cargando datos del usuario...
              </p>
            </div>
          ) : currentUser ? (
            <div className="p-3 rounded-lg border bg-green-50">
              <div className="flex items-center gap-2">
                <User2 className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">
                  Usuario autenticado:
                </span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                {currentUser.username} ({currentUser.email})
              </p>
            </div>
          ) : (
            <div className="p-3 rounded-lg border bg-red-50">
              <p className="text-sm text-red-700">
                No se pudo cargar el usuario. Por favor, inicia sesión para
                reservar.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="promotionId" value={promotionId} />
            <input type="hidden" name="bedroomId" value={bedroom.id} />
            <input type="hidden" name="pricePerNight" value={pricePerNight} />
            {/* Campo oculto para el userId */}
            {currentUser && (
              <input type="hidden" name="userId" value={currentUser.id} />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="guestName" className="flex items-center gap-2">
                  <User2 className="h-4 w-4" /> Nombre completo
                </Label>
                <Input
                  name="guestName"
                  id="guestName"
                  placeholder="Juan Pérez"
                  defaultValue={currentUser?.username || ''}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="guestEmail">Email</Label>
                <Input
                  type="email"
                  name="guestEmail"
                  id="guestEmail"
                  placeholder="juan@example.com"
                  defaultValue={currentUser?.email || ''}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="guests">Número de huéspedes</Label>
                <Input
                  type="number"
                  name="guests"
                  id="guests"
                  min="1"
                  max="10"
                  defaultValue="2"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rooms">Número de habitaciones</Label>
                <Input
                  type="number"
                  name="rooms"
                  id="rooms"
                  min="1"
                  max="5"
                  defaultValue="1"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="checkIn" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" /> Check-in
                </Label>
                <Input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  defaultValue={toInputDate(defaultCheckIn)}
                  min={toInputDate(defaultCheckIn)}
                  max={toInputDate(defaultCheckOut)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="checkOut" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" /> Check-out
                </Label>
                <Input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  defaultValue={toInputDate(defaultCheckOut)}
                  min={toInputDate(defaultCheckIn)}
                  max={toInputDate(defaultCheckOut)}
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={isSubmitting || !currentUser}
                className="w-full"
                variant={'save'}
              >
                {isSubmitting ? 'Creando reserva...' : 'Confirmar reserva'}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
