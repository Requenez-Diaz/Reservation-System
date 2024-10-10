import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

interface RoomAvailabilityProps {
  isAvailable: boolean;
}

export function RoomAvailability({ isAvailable }: RoomAvailabilityProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="success" className="w-full sm:w-auto">
          Ver disponibilidad
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl p-6">
        <DialogHeader>
          <DialogTitle>
            {isAvailable ? 'Habitación Disponible' : 'Habitación No Disponible'}
          </DialogTitle>
          <DialogDescription>
            {isAvailable
              ? '¡Esta habitación está disponible para reservar!'
              : 'Lo sentimos, esta habitación no está disponible en este momento.'}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
