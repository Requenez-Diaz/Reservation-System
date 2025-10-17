import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import FormReservation from '../forms/formReservation';

interface AddReservationProps {
  selectedBedroomType?: string;
}

export function AddReservation({ selectedBedroomType }: AddReservationProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-500 hover:bg-blue-600">
          Reservar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader>
          <DialogTitle>Selecciona tu habitación</DialogTitle>
          <DialogDescription>
            Completa la información a continuación para reservar tu habitación.
          </DialogDescription>
        </DialogHeader>
        <FormReservation selectedBedroomType={selectedBedroomType} />
      </DialogContent>
    </Dialog>
  );
}
