'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { saveReservation } from '@/app/actions/saveReservation/saveReservation';
import { Form } from '@/components/ui/form';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import {
  type ReservationFormValues,
  ReservationSchema
} from '../types/reservationSchema';

import { ConflictAlertDialog } from './ConflictAlertDialog';
import FormFields from './form-field';

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

interface FormReservationProps {
  selectedBedroomType?: string;
}

export function FormReservation({ selectedBedroomType }: FormReservationProps) {
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

  console.log(
    '[v0] FormReservation - selectedBedroomType prop:',
    selectedBedroomType
  );

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(ReservationSchema),
    defaultValues: {
      name: '',
      lastName: '',
      guests: undefined,
      rooms: undefined,
      bedroomsType: selectedBedroomType || '',
      arrivalDate: '',
      departureDate: ''
    }
  });

  useEffect(() => {
    const loadDatesFromStorage = () => {
      try {
        const fromSearch = localStorage.getItem('fromSearch');
        console.log('[v0] Flag fromSearch en localStorage:', fromSearch);

        if (fromSearch === 'true') {
          const storedDates = localStorage.getItem('selectedDates');
          const storedGuests = localStorage.getItem('selectedGuests');

          console.log('[v0] Datos en localStorage:', {
            storedDates,
            storedGuests,
            fromSearch
          });

          if (storedDates) {
            const { from, to } = JSON.parse(storedDates);
            const arrivalDate = new Date(from).toISOString().split('T')[0];
            const departureDate = new Date(to).toISOString().split('T')[0];

            console.log('[v0] Cargando fechas del localStorage:', {
              arrivalDate,
              departureDate
            });

            form.setValue('arrivalDate', arrivalDate);
            form.setValue('departureDate', departureDate);
          }

          if (storedGuests) {
            const guests = Number.parseInt(storedGuests, 10);
            console.log('[v0] Cargando huéspedes del localStorage:', guests);
            form.setValue('guests', guests);
          }

          toast({
            title: 'Información cargada',
            description:
              'Las fechas y número de huéspedes se han cargado automáticamente.'
          });
        } else {
          console.log(
            '[v0] No se encontró la flag fromSearch, no se cargan fechas automáticamente'
          );
        }
      } catch (error) {
        console.error('[v0] Error al cargar datos del localStorage:', error);
      }
    };

    loadDatesFromStorage();
  }, [form, toast]);

  useEffect(() => {
    if (selectedBedroomType) {
      console.log(
        '[v0] Resetting form with bedroomsType:',
        selectedBedroomType
      );
      const currentArrivalDate = form.getValues('arrivalDate');
      const currentDepartureDate = form.getValues('departureDate');

      form.reset({
        name: '',
        lastName: '',
        guests: undefined,
        rooms: undefined,
        bedroomsType: selectedBedroomType,
        arrivalDate: currentArrivalDate,
        departureDate: currentDepartureDate
      });
    }
  }, [selectedBedroomType, form]);

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
    console.log('[v0] Submitting form with data:', data);

    setIsSubmitting(true);
    try {
      const finalData = {
        ...data,
        arrivalDate: new Date(data.arrivalDate),
        departureDate: new Date(data.departureDate)
      };
      const response = await saveReservation(finalData);
      if (response.success) {
        toast({ title: 'Reserva realizada', description: response.message });
        form.reset();
        localStorage.removeItem('selectedDates');
        localStorage.removeItem('selectedGuests');
        localStorage.removeItem('fromSearch');
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
      console.error('[v0] Error submitting form:', error);
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
      form.reset({
        ...originalFormData,
        arrivalDate: suggestedDates.arrivalDate,
        departureDate: suggestedDates.departureDate
      });
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

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormFields
            form={form}
            isSubmitting={isSubmitting}
            selectedBedroomType={selectedBedroomType}
          />
        </form>
      </Form>
      <ConflictAlertDialog
        open={showConflictAlert}
        onOpenChange={setShowConflictAlert}
        availabilityInfo={availabilityInfo}
        originalFormData={originalFormData}
        suggestedDates={suggestedDates}
        onAccept={handleAcceptSuggestedDates}
        onCancel={handleCancelChange}
      />
    </>
  );
}

export default FormReservation;
