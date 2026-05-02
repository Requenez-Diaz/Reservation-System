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
          description:
            'No se pudo cargar el usuario. Por favor, inicia sesión.',
          title: 'Error',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        description: 'Error de servidor al cargar usuario.',
        title: 'Error',
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

    if (!currentUser) {
      toast({
        description: 'Debes iniciar sesión para hacer una reserva.',
        title: 'Error',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const result = await createReservationForPromotion(undefined, formData);

      if (result.success) {
        toast({
          description:
            result.message ||
            `Reserva #${result.reservationId} creada exitosamente.`,
          title: '¡Reserva confirmada!'
        });
        setOpen(false);
      } else {
        toast({
          description: result.message || 'Ocurrió un error desconocido.',
          title: 'No se pudo crear la reserva',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('[ERROR] Error en handleSubmit:', error);
      toast({
        description:
          error instanceof Error
            ? error.message
            : 'Ocurrió un error al crear la reserva',
        title: 'Error',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto" variant={'save'}>
          Reservar habitación
        </Button>
      </DialogTrigger>
      {/* Las props de DialogContent ya están ordenadas alfabéticamente */}
      <DialogContent className="max-h-[85vh] overflow-y-auto p-4 sm:p-6 w-[95vw] max-w-[95vw] sm:max-w-[425px] md:max-w-[500px]">
        <DialogHeader className="text-left">
          <DialogTitle className="text-lg sm:text-xl">
            Reservar habitación con oferta
          </DialogTitle>
          <DialogDescription className="text-sm">
            Completa los datos para confirmar tu reserva.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="p-3 rounded-lg border bg-muted/40">
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-sm break-words">
                    {bedroom.name} - {bedroom.type} #{bedroom.number}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {bedroom.typeBedroom && (
                  <p className="text-xs text-muted-foreground">
                    {bedroom.typeBedroom}
                  </p>
                )}
    
                <Badge className="ml-0 text-xs" variant="info">
                  ID: {bedroom.id}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-green-700 mt-1">
                <CreditCard className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">
                  Precio por noche: <strong>${pricePerNight.toFixed(2)}</strong>
                </span>
              </div>
            </div>
          </div>

          {isLoadingUser ? (
            <div className="p-3 rounded-lg border bg-blue-50">
              <p className="text-sm text-blue-700 text-center">
                Cargando datos del usuario...
              </p>
            </div>
          ) : currentUser ? (
            <div className="p-3 rounded-lg border bg-green-50">
              <div className="flex items-start gap-2">
                <User2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-green-800 text-sm block mb-1">
                    Usuario autenticado:
                  </span>
                  <p className="text-sm text-green-700 break-words">
                    {currentUser.username}
                  </p>
                  <p className="text-sm text-green-700 break-words">
                    {currentUser.email}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-lg border bg-red-50">
              <p className="text-sm text-red-700 text-center">
                No se pudo cargar el usuario. Por favor, inicia sesión para
                reservar.
              </p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input name="promotionId" type="hidden" value={promotionId} />
            <input name="bedroomId" type="hidden" value={bedroom.id} />
            <input name="pricePerNight" type="hidden" value={pricePerNight} />
            {currentUser && (
              <input name="userId" type="hidden" value={currentUser.id} />
            )}

            <div className="space-y-3">
              <div className="space-y-2">
  
                <Label className="text-sm font-medium" htmlFor="guestName">
                  <span className="flex items-center gap-2">
                    <User2 className="h-4 w-4" />
                    Nombre completo
                  </span>
                </Label>
                <Input
                  className="w-full"
                  defaultValue={currentUser?.username || ''}
                  id="guestName"
                  name="guestName"
                  placeholder="Juan Pérez"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium" htmlFor="guestEmail">
                  Email
                </Label>
                <Input
                  className="w-full"
                  defaultValue={currentUser?.email || ''}
                  id="guestEmail"
                  name="guestEmail"
                  placeholder="juan@example.com"
                  required
                  type="email"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium" htmlFor="guests">
                  Huéspedes
                </Label>
                <Input
                  className="w-full"
                  defaultValue="2"
                  id="guests"
                  max="10"
                  min="1"
                  name="guests"
                  required
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium" htmlFor="rooms">
                  Habitaciones
                </Label>
                <Input
                  className="w-full"
                  defaultValue="1"
                  id="rooms"
                  max="5"
                  min="1"
                  name="rooms"
                  required
                  type="number"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="checkIn" className="text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Check-in
                  </span>
                </Label>
                <Input
                  className="w-full"
                  defaultValue={toInputDate(defaultCheckIn)}
                  id="checkIn"
                  max={toInputDate(defaultCheckOut)}
                  min={toInputDate(defaultCheckIn)}
                  name="checkIn"
                  required
                  type="date"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkOut" className="text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Check-out
                  </span>
                </Label>
                <Input
                  className="w-full"
                  defaultValue={toInputDate(defaultCheckOut)}
                  id="checkOut"
                  max={toInputDate(defaultCheckOut)}
                  min={toInputDate(defaultCheckIn)}
                  name="checkOut"
                  required
                  type="date"
                />
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button
                className="w-full sm:w-auto min-w-32"
                disabled={isSubmitting || !currentUser}
                type="submit"
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
