'use client';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import Icon from '@/components/ui/icons/icons';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { updateReservation } from '@/app/actions/saveReservation';
import { bedroomsTypes } from '../../bedroomstype/bedroomsType';
import {
  type ReservationFormValues,
  ReservationSchema
} from '../types/reservationSchema';

interface Reservation {
  id: number;
  arrivalDate: Date;
  departureDate: Date;
  rooms: number;
  bedroomsType: string;
  guests: number;
  status: string;
}

interface FormEditReservationProps {
  reservation: Reservation;
  onSuccess?: () => void; // Callback para cerrar el diálogo
}

export function FormEditReservation({
  reservation,
  onSuccess
}: FormEditReservationProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(ReservationSchema),
    defaultValues: {
      guests: reservation.guests,
      rooms: reservation.rooms,
      bedroomsType: reservation.bedroomsType,
      arrivalDate: new Date(reservation.arrivalDate)
        .toISOString()
        .split('T')[0],
      departureDate: new Date(reservation.departureDate)
        .toISOString()
        .split('T')[0]
    }
  });

  const handleSubmit = async (data: ReservationFormValues) => {
    setIsSubmitting(true);

    try {
      const formData = {
        reservationId: reservation.id.toString(),
        guests: data.guests.toString(),
        rooms: data.rooms.toString(),
        bedroomsType: data.bedroomsType,
        arrivalDate: data.arrivalDate,
        departureDate: data.departureDate
      };

      const response = await updateReservation(formData);

      if (response?.success) {
        toast({
          title: 'Reservación actualizada',
          description: 'La reservación se actualizó correctamente.'
        });

        // Llamar al callback de éxito para cerrar el diálogo
        onSuccess?.();
      } else {
        toast({
          title: 'Error',
          description:
            response?.message || 'Error al actualizar la reservación.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error updating reservation:', error);
      toast({
        title: 'Error',
        description: 'Error inesperado al actualizar la reservación.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Huéspedes</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min="1"
                    placeholder="Número de personas"
                    disabled={isSubmitting}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Habitaciones</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min="1"
                    placeholder="Cantidad de habitaciones"
                    disabled={isSubmitting}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bedroomsType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de habitación</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  disabled={isSubmitting}
                >
                  <option value="" disabled>
                    Selecciona el tipo de habitación
                  </option>
                  {bedroomsTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="arrivalDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de llegada</FormLabel>
                <FormControl>
                  <Input {...field} type="date" disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="departureDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de salida</FormLabel>
                <FormControl>
                  <Input {...field} type="date" disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter className="flex flex-wrap justify-between pt-4 gap-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isSubmitting}>
              <Icon action="undo" className="mr-2" />
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Icon action="accept" className="mr-2 animate-spin" />
                Actualizando...
              </>
            ) : (
              <>
                <Icon action="save" className="mr-2" />
                Actualizar
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default FormEditReservation;
