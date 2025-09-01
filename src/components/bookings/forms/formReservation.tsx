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
import { getAllBedrooms } from '@/app/actions/get-bedrooms';

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
  const [bedroomsTypes, setBedroomsTypes] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReservationSuccess = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchBedroomsTypes = async () => {
      try {
        const bedrooms = await getAllBedrooms();
        const types = bedrooms.map((bedroom) => bedroom.typeBedroom);
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
  }, []);

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
        toast({ title: 'Reserva realizada', description: response.message });
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

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormFields
            form={form}
            isSubmitting={isSubmitting}
            bedroomsTypes={bedroomsTypes}
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
