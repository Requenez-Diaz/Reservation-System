'use client';

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

export function DialogModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Reservar</Button>
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
            <Label htmlFor="name" className="text-right">
              Personas
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Cantidad
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Fecha de llegada
            </Label>
            <Input
              id="email"
              value="
            2022-10-10"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-blue-600">
            Confirmar
          </Button>
          <Button variant="destructive">Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
