'use client';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import Icon from '@/components/ui/icons/icons';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { bedroomsTypes } from '../bedroomstype/bedroomsType';
import { saveReservation } from '@/app/actions/saveReservation';

const FormSchema = z
  .object({
    guests: z.coerce.number().min(1, 'Debe haber al menos 1 huésped.'),
    rooms: z.coerce.number().min(1, 'Debe seleccionar al menos una habitación.'),
    bedroomsType: z.string().min(1, 'Selecciona un tipo de habitación.'),
    arrivalDate: z.string().min(1, 'La fecha de llegada es obligatoria.'),
    departureDate: z.string().min(1, 'La fecha de salida es obligatoria.')
  })
  .refine((data) => {
    const today = new Date();
    const arrival = new Date(data.arrivalDate);

    // Comparamos solo la parte de la fecha (YYYY-MM-DD)
    const todayStr = today.toISOString().split('T')[0];
    const arrivalStr = arrival.toISOString().split('T')[0];

    return arrivalStr >= todayStr;
  }, {
    message: 'Seleccione una fecha actual o posterior para la llegada.',
    path: ['arrivalDate']
  })
  .refine((data) => {
    const arrival = new Date(data.arrivalDate);
    const departure = new Date(data.departureDate);

    return departure > arrival;
  }, {
    message: 'La fecha de salida debe ser mayor que la fecha de llegada.',
    path: ['departureDate']
  });


export function FormReservation() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      guests: undefined,
      rooms: undefined,
      bedroomsType: '',
      arrivalDate: '',
      departureDate: ''
    }
  });

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response = await saveReservation({
      ...data,
      arrivalDate: new Date(data.arrivalDate),
      departureDate: new Date(data.departureDate)
    });

    if (response.success) {
      toast({
        title: 'Reserva realizada.',
        description: 'La reservación se registró correctamente.'
      });
    } else {
      toast({
        title: 'Reserva no realizada.',
        description:
          response.message || 'Ha ocurrido un error al realizar la reservación.'
      });
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
                    placeholder="Número de huéspedes"
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
                >
                  <option value="" disabled>
                    Selecciona el tipo
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
                  <Input {...field} type="date" />
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
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button type="button" variant="success">
              <Icon action="undo" className="mr-2" />
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit" variant="update">
            <Icon action="save" className="mr-2" />
            Reservar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default FormReservation;