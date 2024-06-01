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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@nextui-org/react';

export async function SelectRoomModal() {
  return (
    <form action={bookingsForms}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded"
            variant="outline"
          >
            Reservar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Selecciona tu habitacion</DialogTitle>
            <DialogDescription>
              Por favor, selecciona la habitacion que deseas reservar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="name">
                Personas
              </Label>
              <Input className="col-span-3" id="name" type="text" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="username">
                Cantidad
              </Label>
              <Input className="col-span-3" id="username" type="number" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="email">
                Fecha de llegada
              </Label>
              <Input className="col-span-3" id="email" type="date" />
            </div>
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
