'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { UndoIcon, Loader2Icon, SaveIcon } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import type { ReservationFormValues } from '../types/reservationSchema';

interface FormFieldsProps {
  form: UseFormReturn<ReservationFormValues>;
  isSubmitting: boolean;
  selectedBedroomType?: string;
}

export default function FormFields({
  form,
  isSubmitting,
  selectedBedroomType
}: FormFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Escribe tu nombre"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Escribe tu apellido"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

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
                  value={field.value ?? ''}
                  type="number"
                  min="1"
                  placeholder="Número de huéspedes"
                  disabled={isSubmitting}
                  // Convierte el valor a número para react-hook-form
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
                  value={field.value ?? ''}
                  type="number"
                  min="1"
                  placeholder="Cantidad de habitaciones"
                  disabled={isSubmitting}
                  // Convierte el valor a número para react-hook-form
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
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Tipo de habitación</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  disabled={true}
                  readOnly
                  className="bg-muted cursor-not-allowed"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
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

      <DialogFooter className="flex justify-end gap-4">
        <DialogClose asChild>
          <Button type="button" variant="destructive" disabled={isSubmitting}>
            <UndoIcon className="mr-2 size-4" />
            Cancelar
          </Button>
        </DialogClose>

        <Button type="submit" disabled={isSubmitting} variant="save">
          {isSubmitting ? (
            <>
              <Loader2Icon className="mr-2 size-4 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <SaveIcon className="mr-2 size-4" />
              Reservar
            </>
          )}
        </Button>
      </DialogFooter>
    </>
  );
}
