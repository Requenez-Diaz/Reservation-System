'use client';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import Icon from '@/components/ui/icons/icons';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { updateReservation } from '@/app/actions/saveReservation';
import {
  type ReservationFormValues,
  ReservationSchema
} from '../types/reservationSchema';
import { getAllBedrooms } from '@/app/actions/get-bedrooms';

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
  onSuccess?: () => void;
}

export function FormEditReservation({
  reservation,
  onSuccess
}: FormEditReservationProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bedroomsTypes, setBedroomsTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchBedroomsTypes = async () => {
      try {
        const bedrooms = await getAllBedrooms();
        // Mapea los resultados para obtener solo el 'typeBedroom' y elimina duplicados
        const types = bedrooms.map((bedroom) => bedroom.typeBedroom);
        const uniqueTypes = Array.from(new Set(types));
        setBedroomsTypes(uniqueTypes);
      } catch (error) {
        console.error('Error fetching bedroom types:', error);
        toast({
          description: 'No se pudieron cargar los tipos de habitación.',
          title: 'Error',
          variant: 'destructive'
        });
      }
    };

    fetchBedroomsTypes();
  }, []);

  const form = useForm<ReservationFormValues>({
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
    },
    resolver: zodResolver(ReservationSchema)
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
          description: 'La reservación se actualizó correctamente.',
          title: 'Reservación actualizada'
        });

        onSuccess?.();
      } else {
        toast({
          description:
            response?.message || 'Error al actualizar la reservación.',
          title: 'Error',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error updating reservation:', error);
      toast({
        description: 'Error inesperado al actualizar la reservación.',
        title: 'Error',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => {
              const { onChange: fieldOnChange, ...restField } = field;
              return (
                <FormItem>
                  <FormLabel>Huéspedes</FormLabel>
                  <FormControl>
                    <Input
                      {...restField}
                      type="number"
                      min="1"
                      placeholder="Número de personas"
                      disabled={isSubmitting}
                      onChange={(e) => fieldOnChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="rooms"
            render={({ field }) => {
              const { onChange: fieldOnChange, ...restField } = field;
              return (
                <FormItem>
                  <FormLabel>Habitaciones</FormLabel>
                  <FormControl>
                    <Input
                      {...restField}
                      type="number"
                      min="1"
                      placeholder="Cantidad de habitaciones"
                      disabled={isSubmitting}
                      onChange={(e) => fieldOnChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
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
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  disabled={isSubmitting}
                  {...field}
                >
                  <option disabled value="">
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
                  <Input disabled={isSubmitting} type="date" {...field} />
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
                  <Input disabled={isSubmitting} type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter className="flex flex-wrap justify-between pt-4 gap-4">
          <DialogClose asChild>
            <Button disabled={isSubmitting} type="button" variant="outline">
              <Icon action="undo" className="mr-2" />
              Cancelar
            </Button>
          </DialogClose>

          <Button disabled={isSubmitting} type="submit">
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
