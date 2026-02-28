'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { calculateDuration } from '@/app/actions/saveReservation/calculateDuration';

// --- DEFINICIONES DE TIPOS (Asegúrate de que estas coincidan con NotificationsTab) ---

interface User {
  image?: string;
  username?: string;
  email?: string;
}

interface NotificationReservation {
  id: string | number;
  arrivalDate: string;
  departureDate: string;
  bedroomsType: string;
  status: string;
  rooms: number;
  guests: number;
  // Estas propiedades son cruciales para la compatibilidad con SelectedReservation:
  formattedArrivalDate: string;
  formattedDepartureDate: string;
}

// El tipo que el componente NotificationsTab pasa al modal
interface SelectedReservation extends NotificationReservation {
  User: User;
}

// --- PROPS CORREGIDOS ---

interface ReservationDetailModalProps {
  // Ahora espera el tipo SelectedReservation, que es el tipo real del estado en el padre
  reservation: SelectedReservation;
  selectedReservation: SelectedReservation | null;
  // CORRECCIÓN: El setter debe manejar SelectedReservation o null
  setSelectedReservation: (_res: SelectedReservation | null) => void;
}

// --- COMPONENTE ---

export default function ReservationDetailModal({
  reservation,
  selectedReservation,
  setSelectedReservation
}: ReservationDetailModalProps) {
  const router = useRouter();
  const nights = calculateDuration(
    reservation.arrivalDate,
    reservation.departureDate
  );

  return (
    <Dialog
      onOpenChange={(open) => !open && setSelectedReservation(null)}
      open={selectedReservation?.id === reservation.id}
    >
      <DialogContent className="w-full max-w-[95vw] sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 shadow-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-slate-100">
            <Bell className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            Detalle de Reservación
          </DialogTitle>
          <DialogDescription className="mt-1 text-gray-500 dark:text-slate-400 text-sm">
            Información completa de la reservación seleccionada.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex items-center gap-5">
          {reservation.User?.image ? (
            <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-blue-200 shadow-sm">
              <Image
                alt={reservation.User.username ?? 'Usuario'}
                className="object-cover"
                fill
                src={reservation.User.image}
              />
            </div>
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Bell className="h-8 w-8" />
            </div>
          )}

          <div className="flex flex-col">
            <p className="font-semibold text-gray-800 dark:text-slate-100 text-lg leading-tight">
              {reservation.User?.username ?? 'Usuario desconocido'}
            </p>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
              {reservation.User?.email ?? 'Sin correo'}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Habitación', value: reservation.bedroomsType },
            { label: 'Estado', value: reservation.status },
            { label: 'Noches', value: nights },
            { label: 'Habitaciones', value: reservation.rooms },
            { label: 'Huéspedes', value: reservation.guests },
            // Usamos las propiedades formateadas que ya vienen en SelectedReservation
            {
              label: 'Llegada',
              value: reservation.formattedArrivalDate
            },
            {
              label: 'Salida',
              value: reservation.formattedDepartureDate
            }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 p-4 rounded-xl shadow-inner transition-colors duration-150"
            >
              <p className="text-gray-600 dark:text-slate-400 text-sm">{item.label}</p>
              <p className="font-semibold text-gray-800 dark:text-slate-100">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
          <DialogClose asChild>
            <Button
              className="border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              variant="outline"
            >
              Cerrar
            </Button>
          </DialogClose>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-5"
            onClick={() => router.push('/reservaciones')}
          >
            Ir a Reservaciones
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
