import { bookingsForms } from '@/app/actions/bookings/booking';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { CarouselDescriptions } from './CarrouselDescriptions';

export async function ModalDescriptions() {
  return (
    <form>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded"
            variant="outline"
          >
            Ver disponibilidad
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Podes ver los detalles de la habitacion</DialogTitle>
            <DialogDescription>
            
              La habitacion cuenta con una cama matrimonial, baño privado,
              television por cable y aire acondicionado.
            </DialogDescription>
          </DialogHeader>
          <div>
            <CarouselDescriptions />
          </div>
          <DialogFooter>
            <Button className="bg-blue-600" type="submit">
              Confirmar
            </Button>
            <Button variant="destructive">Cancelar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
