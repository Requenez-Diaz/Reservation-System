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
        <DialogContent className="sm:max-w-[700px] sm:h-[600px] sm:m-5  m-0 p-4">
          <DialogHeader>
            <DialogTitle>Puedes ver los detalles de la habitación</DialogTitle>
            <DialogDescription>
              La habitación cuenta con una cama matrimonial, baño privado,
              televisión por cable y aire acondicionado.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center w-full h-full">
            <CarouselDescriptions />
          </div>
          <DialogFooter className="mt-4 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
            <Button className="bg-blue-600 w-full sm:w-auto" type="submit">
              Confirmar
            </Button>
            <Button variant="destructive" className="w-full sm:w-auto">
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
