'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import FormEditReservation from './editReservationForm';

interface Reservation {
  id: number;
  arrivalDate: Date;
  departureDate: Date;
  rooms: number;
  bedroomsType: string;
  guests: number;
  status: string;
}

export function EditReservation({
  _reservationId
}: {
  _reservationId: number;
}) {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const loadReservation = async () => {
    if (reservation) {
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadReservation();
    }
  }, [isOpen]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Limpiar datos cuando se cierra
      setReservation(null);
      setError(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700" variant="default">
          Cambiar elección
        </Button>
      </DialogTrigger>

      <DialogContent className="p-6 sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar reservación</DialogTitle>
          <DialogDescription>
            Completa la información para editar su reservación.
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            <span>Cargando reservación...</span>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-red-600">{error}</p>
            <Button
              className="mt-2 bg-transparent"
              onClick={loadReservation}
              size="sm"
              variant="outline"
            >
              Reintentar
            </Button>
          </div>
        )}

        {reservation && !loading && !error && (
          <FormEditReservation
            onSuccess={() => setIsOpen(false)}
            reservation={reservation}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
