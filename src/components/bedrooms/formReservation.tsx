'use client';

import { saveBookings } from '@/app/actions/bookings/booking';
import { bedroomsTypes } from '@/components/bedroomstype/bedroomsType';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function FormReservation() {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const arrivalDate = formData.get('arrivalDate') as string;
        const departureDate = formData.get('departureDate') as string;

        if (new Date(arrivalDate) >= new Date(departureDate)) {
            alert('La fecha de salida debe ser posterior a la fecha de llegada.');
            return;
        }

        await saveBookings(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="guests">
                    Personas
                </Label>
                <Input
                    className="col-span-3"
                    id="guests"
                    name="guests"
                    type="number"
                    min="1"
                    placeholder="Número de personas"
                    required
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="rooms">
                    Habitaciones
                </Label>
                <Input
                    className="col-span-3"
                    id="rooms"
                    name="rooms"
                    type="number"
                    min="1"
                    placeholder="Cantidad de habitaciones"
                    required
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="roomType">
                    Tipo de habitación
                </Label>
                <select
                    className="col-span-3 border border-gray-300 rounded-lg p-2"
                    id="roomType"
                    name="roomType"
                    required
                >
                    <option value="" disabled>
                        Selecciona el tipo de habitación
                    </option>
                    {bedroomsTypes.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="arrivalDate">
                    Llegada
                </Label>
                <Input
                    className="col-span-3"
                    id="arrivalDate"
                    name="arrivalDate"
                    type="date"
                    required
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="departureDate">
                    Salida
                </Label>
                <Input
                    className="col-span-3"
                    id="departureDate"
                    name="departureDate"
                    type="date"
                    required
                />
            </div>
            <DialogFooter className="flex flex-wrap justify-between pt-4 gap-4">
                <DialogClose>
                    <Button variant="destructive" type="button">
                        Cancelar
                    </Button>
                </DialogClose>
                <DialogClose>
                    <Button variant="success" type="button">
                        Reservar
                    </Button>
                </DialogClose>
            </DialogFooter>
        </form>
    );
}
