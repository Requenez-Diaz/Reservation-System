'use client';

import React, { useState } from 'react';
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
import { SelectAdulst } from '../cardsSearchRooms/selectAdusts';
import { SelectChildren } from '../cardsSearchRooms/selectChildren';
import { SelectsBedrooms } from '../cardsSearchRooms/selectBedrooms';

export function SelectsRooms() {
  const [modalOpen, setModalOpen] = useState(false);
  const [childAge, setChildAge] = useState('');
  const [error, setError] = useState('');

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (!childAge) {
  //       setError('La edad del niño es requerida antes del checkout.');
  //     } else {
  //       setModalOpen(false);
  //       setError('');
  //     }
  //   };

  return (
    <div className="">
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-primary-foreground text-black font-bold py-2 px-4 rounded"
            variant="outline"
          >
            Selecciona acompañantes
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Selecciona tu habitación</DialogTitle>
            <DialogDescription>
              Especifica la cantidad de personas que te acompañarán.
            </DialogDescription>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="">
                  Adultos
                </Label>
                <SelectAdulst />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="username">
                  Niños
                </Label>
                <SelectChildren
                //   value={childAge}
                //   onChange={(e) => setChildAge(e.target.value)}
                />
              </div>
              {error && <div className="text-red-500">{error}</div>}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="email">
                  Cantidad de habitaciones
                </Label>
                <SelectsBedrooms />
              </div>
            </div>
            <DialogFooter>
              <Button className="bg-blue-600" type="submit">
                Listo
              </Button>
              <Button variant="destructive" onClick={() => setModalOpen(false)}>
                Cancelar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
