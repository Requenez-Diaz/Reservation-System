'use client';

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
import { type ReservationFormValues } from '../types/reservationSchema';

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

interface ConflictAlertDialogProps {
  onOpenChange: (open: boolean) => void;
  availabilityInfo: AvailabilityInfo | null;
  originalFormData: ReservationFormValues | null;
  suggestedDates: { arrivalDate: string; departureDate: string } | null;
  onAccept: () => void;
  onCancel: () => void;
  open: boolean;
}

export function ConflictAlertDialog({
  onOpenChange,
  availabilityInfo,
  originalFormData,
  suggestedDates,
  onAccept,
  onCancel,
  open
}: ConflictAlertDialogProps) {
  const formatDateDisplay = (dateString: string) =>
    new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-amber-700">
            <AlertTriangle className="h-5 w-5" />
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
                  {/* Info de habitaciones */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="space-y-1 text-sm">
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
                      <div className="mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">
                          Fechas disponibles:
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-green-700">Nueva llegada:</span>
                          <span className="font-semibold text-green-800">
                            {formatDateDisplay(suggestedDates.arrivalDate)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">Nueva salida:</span>
                          <span className="font-semibold text-green-800">
                            {formatDateDisplay(suggestedDates.departureDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reservaciones actuales */}
                  {availabilityInfo.conflictingReservations.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">
                          Reservaciones actuales:
                        </span>
                      </div>
                      <div className="max-h-20 space-y-1 overflow-y-auto">
                        {availabilityInfo.conflictingReservations
                          .slice(0, 2)
                          .map((reservation) => (
                            <div
                              key={reservation.id}
                              className="rounded bg-white p-2 text-xs text-blue-700"
                            >
                              <div className="flex justify-between">
                                <span>
                                  {new Date(
                                    reservation.arrivalDate
                                  ).toLocaleDateString('es-ES', {
                                    day: '2-digit',
                                    month: '2-digit'
                                  })}
                                  {' - '}
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
          <AlertDialogCancel onClick={onCancel}>
            No, modificar manualmente
          </AlertDialogCancel>
          {suggestedDates && (
            <AlertDialogAction
              onClick={onAccept}
              className="bg-green-600 hover:bg-green-700"
            >
              Sí, cambiar fechas
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
