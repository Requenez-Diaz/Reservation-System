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
  const _selectedBedroomType = selectedBedroomType;

  return (
    <>


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
                  disabled={isSubmitting}
                  min="1"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="Número de huéspedes"
                  type="number"
                  value={field.value ?? ''}
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
                  disabled={isSubmitting}
                  min="1"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="Cantidad de habitaciones"
                  type="number"
                  value={field.value ?? ''}
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
                  className="bg-muted cursor-not-allowed"
                  disabled={true}
                  readOnly
                  type="text"
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
                <Input {...field} disabled={isSubmitting} type="date" />
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
                <Input {...field} disabled={isSubmitting} type="date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <DialogFooter className="flex justify-end gap-4">
        <DialogClose asChild>
          <Button
            asChild
            disabled={isSubmitting}
            type="button"
            variant="destructive"
          >
            <span>
              <UndoIcon className="mr-2 size-4" />
              Cancelar
            </span>
          </Button>
        </DialogClose>

        <Button disabled={isSubmitting} type="submit" variant="save">
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
