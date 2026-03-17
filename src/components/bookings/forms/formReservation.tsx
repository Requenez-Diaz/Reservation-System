'use client';

import * as React from 'react';
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

// 1. 🔑 IMPORTACIÓN CLAVE: Importa el hook para la sesión
// (Ajusta esta importación según tu librería de autenticación, ej: useSession)
import { useSession } from 'next-auth/react';

import { ConflictAlertDialog } from './ConflictAlertDialog';
import FormFields from './form-field';

// ... (Interfaces, getInitialFormValues, calculateSuggestedDates se mantienen igual) ...

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

// Función auxiliar para valores iniciales (ajustada para aceptar datos de sesión)
const getInitialFormValues = (
  selectedBedroomType: string | undefined,
  sessionName: string | undefined
): ReservationFormValues => {
  // Se modificó para ser más simple

  // Si el nombre de la sesión incluye un apellido, lo separamos
  const [name = '', lastName = ''] = sessionName?.split(' ') || [];

  const initialValues: ReservationFormValues = {
    name: name, // <-- Valor de la sesión
    lastName: lastName, // <-- Valor de la sesión
    guests: 1,
    rooms: 1,
    bedroomsType: selectedBedroomType || '',
    arrivalDate: '',
    departureDate: ''
  };

  // ... (Lógica de localStorage para fechas/huéspedes se mantiene igual) ...
  try {
    const fromSearch = localStorage.getItem('fromSearch');
    if (fromSearch === 'true') {
      const storedDates = localStorage.getItem('selectedDates');
      const storedGuests = localStorage.getItem('selectedGuests');

      if (storedDates) {
        const { from, to } = JSON.parse(storedDates);
        if (from) {
          initialValues.arrivalDate = new Date(from)
            .toISOString()
            .split('T')[0];
          initialValues.departureDate = to
            ? new Date(to).toISOString().split('T')[0]
            : new Date(from).toISOString().split('T')[0];
        }
      }

      if (storedGuests) {
        const guests = Number.parseInt(storedGuests, 10);
        if (!Number.isNaN(guests) && guests > 0) {
          initialValues.guests = guests;
        }
      }
    }
  } catch (error) {
    console.error('Error al obtener valores iniciales de localStorage:', error);
  }

  return initialValues;
};


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

  // 2. 🎣 USAR HOOK DE SESIÓN
  const { data: session } = useSession();
  const sessionUserName = session?.user?.name;

  // 3. ACTUALIZAR VALORES INICIALES PARA USAR LA SESIÓN
  const initialValues = React.useMemo(
    () => getInitialFormValues(selectedBedroomType, sessionUserName),
    [selectedBedroomType, sessionUserName] // Dependencia de la sesión
  );

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(ReservationSchema),
    // Usamos initialValues (que ahora incluye datos de sesión)
    defaultValues: initialValues
  });

  // 4. RESETEAR EL FORMULARIO CUANDO LOS DATOS DE LA SESIÓN SE CARGUEN
  // Este useEffect asegura que el formulario se actualice si la sesión se carga después del render inicial.
  const didMountRef = React.useRef(false);
  React.useEffect(() => {
    if (didMountRef.current) {
      const newInitialValues = getInitialFormValues(
        selectedBedroomType,
        sessionUserName
      );
      // Usamos form.reset para establecer los valores predeterminados (incluyendo nombre/apellido)
      form.reset({
        ...newInitialValues,
        // Conserva las fechas/huéspedes si ya fueron modificados por el usuario
        ...form.getValues()
      });
    } else {
      didMountRef.current = true;
    }
  }, [sessionUserName, selectedBedroomType, form]);

  useEffect(() => {
    if (localStorage.getItem('fromSearch') === 'true') {
      toast({
        description:
          'Las fechas y número de huéspedes se han cargado automáticamente.',
        title: 'Información cargada'
      });
    }
  }, [toast]);

  useEffect(() => {
    if (
      selectedBedroomType &&
      form.getValues('bedroomsType') !== selectedBedroomType
    ) {
      form.reset({
        ...form.getValues(),
        bedroomsType: selectedBedroomType
      });
    }
  }, [selectedBedroomType, form]);

  const handleSubmit = async (data: ReservationFormValues) => {
    setIsSubmitting(true);
    // ... (El resto de la lógica de handleSubmit se mantiene igual) ...
    try {
      const finalData = {
        ...data,
        arrivalDate: new Date(data.arrivalDate),
        departureDate: new Date(data.departureDate)
      };

      // La acción del servidor se encarga de la seguridad y el userId
      const response = await saveReservation(finalData);

      if (response.success) {
        toast({ description: response.message, title: 'Reserva realizada' });
        form.reset();

        localStorage.removeItem('selectedDates');
        localStorage.removeItem('selectedGuests');
        localStorage.removeItem('fromSearch');

        setShowConflictAlert(false);
        setAvailabilityInfo(null);
        setOriginalFormData(null);
        setSuggestedDates(null);
      } else if (response.showAvailabilityInfo && response.availabilityInfo) {
        setAvailabilityInfo(response.availabilityInfo);
        setOriginalFormData(data);
        if (response.availabilityInfo.nextAvailableDate) {
          setSuggestedDates(
            calculateSuggestedDates(
              response.availabilityInfo.nextAvailableDate,
              new Date(data.arrivalDate),
              new Date(data.departureDate)
            )
          );
        }
        setShowConflictAlert(true);
      } else {
        toast({
          description:
            response.message || 'Hubo un problema al registrar la reservación.',
          title: 'Error',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        description: 'Error inesperado al procesar la reservación.',
        title: 'Error',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
    // ...
  };

  const handleAcceptSuggestedDates = () => {
    if (suggestedDates && originalFormData) {
      form.reset({
        ...originalFormData,
        arrivalDate: suggestedDates.arrivalDate,
        departureDate: suggestedDates.departureDate
      });
      setShowConflictAlert(false);
      setAvailabilityInfo(null);
      setOriginalFormData(null);
      setSuggestedDates(null);
      toast({
        description:
          'Las fechas han sido cambiadas automáticamente. Puedes enviar la reserva nuevamente.',
        title: 'Fechas actualizadas'
      });
    }
  };

  const handleCancelChange = () => {
    setShowConflictAlert(false);
    setAvailabilityInfo(null);
    setOriginalFormData(null);
    setSuggestedDates(null);
    toast({
      description: 'Puedes modificar las fechas manualmente en el formulario.',
      title: 'Sin cambios'
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
        availabilityInfo={availabilityInfo}
        onAccept={handleAcceptSuggestedDates}
        onCancel={handleCancelChange}
        onOpenChange={setShowConflictAlert}
        _open={showConflictAlert}
        originalFormData={originalFormData}
        suggestedDates={suggestedDates}
      />
    </>
  );
}

export default FormReservation;
