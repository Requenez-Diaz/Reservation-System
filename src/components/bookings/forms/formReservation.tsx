'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { saveReservation } from '@/app/actions/saveReservation/saveReservation';
import {
  Form,
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
import { useToast } from '@/components/ui/use-toast';
import {
  type ReservationFormValues,
  ReservationSchema
} from '../types/reservationSchema';
import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';
import { getAllBedrooms } from '@/app/actions/get-bedrooms';

interface AvailabilityInfo {
  availableRooms: number;
  totalRooms: number;
  nextAvailableDate: Date | null;
  conflictingReservations: Array<{
    id: number;
    arrivalDate: Date;
    departureDate: Date;
    rooms: number;
  }>;
}

export function FormReservation() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConflictAlert, setShowConflictAlert] = useState(false);
  const [availabilityInfo, setAvailabilityInfo] =
    useState<AvailabilityInfo | null>(null);
  const [originalFormData, setOriginalFormData] =
    useState<ReservationFormValues | null>(null);
  const [suggestedDates, setSuggestedDates] = useState<{
    arrivalDate: string;
    departureDate: string;
  } | null>(null);

  // Nuevo estado para almacenar los tipos de habitación
  const [bedroomsTypes, setBedroomsTypes] = useState<string[]>([]);

  // Usa useEffect para cargar los tipos de habitación cuando el componente se monte
  useEffect(() => {
    const fetchBedroomsTypes = async () => {
      try {
        const bedrooms = await getAllBedrooms();
        const types = bedrooms.map((bedroom) => bedroom.typeBedroom);
        // Usa un Set para obtener solo tipos únicos y luego conviértelo a un array
        const uniqueTypes = Array.from(new Set(types));
        setBedroomsTypes(uniqueTypes);
      } catch (error) {
        console.error('Error fetching bedroom types:', error);
        toast({
          title: 'Error',
          description: 'No se pudieron cargar los tipos de habitación.',
          variant: 'destructive'
        });
      }
    };

    fetchBedroomsTypes();
  }, []); // El array vacío asegura que se ejecute solo una vez al inicio

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(ReservationSchema),
    defaultValues: {
      guests: undefined,
      rooms: undefined,
      bedroomsType: '',
      arrivalDate: '',
      departureDate: ''
    }
  });

  const calculateSuggestedDates = (
    nextAvailableDate: Date,
    originalArrival: Date,
    originalDeparture: Date
  ) => {
    const originalDuration =
      originalDeparture.getTime() - originalArrival.getTime();
    const newArrivalDate = new Date(nextAvailableDate);
    const newDepartureDate = new Date(
      newArrivalDate.getTime() + originalDuration
    );

    return {
      arrivalDate: newArrivalDate.toISOString().split('T')[0],
      departureDate: newDepartureDate.toISOString().split('T')[0]
    };
  };

  const handleSubmit = async (data: ReservationFormValues) => {
    setIsSubmitting(true);

    try {
      const finalData = {
        ...data,
        arrivalDate: new Date(data.arrivalDate),
        departureDate: new Date(data.departureDate)
      };

      const response = await saveReservation(finalData);

      if (response.success) {
        toast({
          title: 'Reserva realizada',
          description: response.message
        });

        form.reset();
        setShowConflictAlert(false);
        setAvailabilityInfo(null);
        setOriginalFormData(null);
        setSuggestedDates(null);
      } else {
        if (response.showAvailabilityInfo && response.availabilityInfo) {
          setAvailabilityInfo(response.availabilityInfo);
          setOriginalFormData(data);

          if (response.availabilityInfo.nextAvailableDate) {
            const suggested = calculateSuggestedDates(
              response.availabilityInfo.nextAvailableDate,
              new Date(data.arrivalDate),
              new Date(data.departureDate)
            );
            setSuggestedDates(suggested);
          }

          setShowConflictAlert(true);
        } else {
          toast({
            title: 'Error',
            description:
              response.message ||
              'Hubo un problema al registrar la reservación.',
            variant: 'destructive'
          });
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'Error inesperado al procesar la reservación.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAcceptSuggestedDates = () => {
    if (suggestedDates && originalFormData) {
      form.setValue('arrivalDate', suggestedDates.arrivalDate);
      form.setValue('departureDate', suggestedDates.departureDate);

      setShowConflictAlert(false);

      toast({
        title: 'Fechas actualizadas',
        description:
          'Las fechas han sido cambiadas automáticamente. Puedes enviar la reserva nuevamente.'
      });

      setAvailabilityInfo(null);
      setOriginalFormData(null);
      setSuggestedDates(null);
    }
  };

  const handleCancelChange = () => {
    setShowConflictAlert(false);
    setAvailabilityInfo(null);
    setOriginalFormData(null);
    setSuggestedDates(null);

    toast({
      title: 'Sin cambios',
      description: 'Puedes modificar las fechas manualmente en el formulario.'
    });
  };

  const formatDateDisplay = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <>
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
              <Button
                type="button"
                variant="destructive"
                disabled={isSubmitting}
              >
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
        </form>
      </Form>

      {/* AlertDialog para conflictos de reservación */}
      <AlertDialog open={showConflictAlert} onOpenChange={setShowConflictAlert}>
        <AlertDialogContent className="max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-amber-700">
              <AlertTriangle className="w-5 h-5" />
              Conflicto de Fechas
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Las fechas seleccionadas no están disponibles debido a
                  reservaciones existentes.
                </p>

                {availabilityInfo && originalFormData && (
                  <div className="space-y-3">
                    {/* Estado actual */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-red-700">
                            Habitaciones solicitadas:
                          </span>
                          <span className="font-semibold text-red-800">
                            {originalFormData.rooms}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-red-700">
                            Habitaciones disponibles:
                          </span>
                          <span className="font-semibold text-red-800">
                            {availabilityInfo.availableRooms}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Fechas sugeridas */}
                    {suggestedDates && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-green-800">
                            Fechas disponibles:
                          </span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-green-700">
                              Nueva llegada:
                            </span>
                            <span className="font-semibold text-green-800">
                              {formatDateDisplay(suggestedDates.arrivalDate)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-700">
                              Nueva salida:
                            </span>
                            <span className="font-semibold text-green-800">
                              {formatDateDisplay(suggestedDates.departureDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Reservaciones en conflicto */}
                    {availabilityInfo.conflictingReservations.length > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-blue-800">
                            Reservaciones actuales:
                          </span>
                        </div>
                        <div className="space-y-1 max-h-20 overflow-y-auto">
                          {availabilityInfo.conflictingReservations
                            .slice(0, 2)
                            .map((reservation) => (
                              <div
                                key={reservation.id}
                                className="text-xs text-blue-700 bg-white p-2 rounded"
                              >
                                <div className="flex justify-between">
                                  <span>
                                    {new Date(
                                      reservation.arrivalDate
                                    ).toLocaleDateString('es-ES', {
                                      day: '2-digit',
                                      month: '2-digit'
                                    })}{' '}
                                    -{' '}
                                    {new Date(
                                      reservation.departureDate
                                    ).toLocaleDateString('es-ES', {
                                      day: '2-digit',
                                      month: '2-digit'
                                    })}
                                  </span>
                                  <span className="font-medium">
                                    {reservation.rooms} hab.
                                  </span>
                                </div>
                              </div>
                            ))}
                          {availabilityInfo.conflictingReservations.length >
                            2 && (
                            <div className="text-xs text-blue-600 text-center">
                              +
                              {availabilityInfo.conflictingReservations.length -
                                2}{' '}
                              más...
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <p className="text-sm text-gray-600">
                  ¿Deseas cambiar automáticamente a las fechas disponibles?
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelChange}>
              No, modificar manualmente
            </AlertDialogCancel>
            {suggestedDates && (
              <AlertDialogAction
                onClick={handleAcceptSuggestedDates}
                className="bg-green-600 hover:bg-green-700"
              >
                Sí, cambiar fechas
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default FormReservation;
