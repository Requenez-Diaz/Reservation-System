import { z } from 'zod';

export const ReservationSchema = z
  .object({
    name: z.string().trim().min(1, 'El nombre es obligatorio.'),
    lastName: z.string().trim().min(1, 'El apellido es obligatorio.'),

    guests: z.coerce.number().min(1, 'Debe haber al menos 1 huésped.'),
    rooms: z.coerce
      .number()
      .min(1, 'Debe seleccionar al menos una habitación.'),
    bedroomsType: z.string().min(1, 'Selecciona un tipo de habitación.'),
    arrivalDate: z.string().min(1, 'La fecha de llegada es obligatoria.'),
    departureDate: z.string().min(1, 'La fecha de salida es obligatoria.')
  })
  .refine(
    (data) => {
      const today = new Date();
      const arrival = new Date(data.arrivalDate);
      const todayStr = today.toISOString().split('T')[0];
      const arrivalStr = arrival.toISOString().split('T')[0];

      return arrivalStr >= todayStr;
    },
    {
      message: 'Seleccione una fecha actual o posterior para la llegada.',
      path: ['arrivalDate']
    }
  )
  .refine(
    (data) => {
      const arrival = new Date(data.arrivalDate);
      const departure = new Date(data.departureDate);
      return departure > arrival;
    },
    {
      message: 'La fecha de salida debe ser mayor que la fecha de llegada.',
      path: ['departureDate']
    }
  );

export type ReservationFormValues = z.infer<typeof ReservationSchema>;
