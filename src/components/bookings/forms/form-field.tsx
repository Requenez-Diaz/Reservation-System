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
import Icon from '@/components/ui/icons/icons';
import { UseFormReturn } from 'react-hook-form';
import { ReservationFormValues } from '../types/reservationSchema';
import { useState } from 'react';

interface FormFieldsProps {
  form: UseFormReturn<ReservationFormValues>;
  isSubmitting: boolean;
  bedroomsTypes: string[];
}

export default function FormFields({
  form,
  isSubmitting,
  bedroomsTypes
}: FormFieldsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReservationSuccess = () => {
    setIsModalOpen(false);
  };

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
                  type="number"
                  min="1"
                  placeholder="Número de huéspedes"
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
            <Icon action="undo" className="mr-2" />
            Cancelar
          </Button>
        </DialogClose>

        <Button type="submit" disabled={isSubmitting} variant="save">
          {isSubmitting ? (
            <>
              <Icon action="loading" className="mr-2 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <Icon action="save" className="mr-2" />
              Reservar
            </>
          )}
        </Button>
      </DialogFooter>
    </>
  );
}
