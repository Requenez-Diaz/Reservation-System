'use client';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import Icon from '@/components/ui/icons/icons';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";
import { Reservation } from '@prisma/client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { updateReservation } from '@/app/actions/saveReservation';
import { bedroomsTypes } from '../bedroomstype/bedroomsType';
import { ReservationFormValues, ReservationSchema } from './reservationSchema';

export function FormEditReservation({ reservation }: { reservation: Reservation | null }) {
    const { toast } = useToast();

    const form = useForm<ReservationFormValues>({
        resolver: zodResolver(ReservationSchema),
        defaultValues: {
            guests: reservation?.guests ?? 1,
            rooms: reservation?.rooms ?? 1,
            bedroomsType: reservation?.bedroomsType ?? "",
            arrivalDate: reservation?.arrivalDate.toISOString().split('T')[0] ?? "",
            departureDate: reservation?.departureDate.toISOString().split('T')[0] ?? "",
        },
    });

    const handleSubmit = async (data: ReservationFormValues) => {
        if (!reservation) {
            return toast({
                title: "Error",
                description: "No se encontró la reservación"
            });
        }

        const formData = {
            reservationId: reservation.id.toString(),
            guests: data.guests.toString(),
            rooms: data.rooms.toString(),
            bedroomsType: data.bedroomsType,
            arrivalDate: data.arrivalDate,
            departureDate: data.departureDate,
        };

        const response = await updateReservation(formData);
        if (response?.success) {
            toast({
                title: "Reservación actualizada.",
                description: "La reservación se actualizó correctamente."
            });
        } else {
            toast({
                title: "Error",
                description: response?.message || "Error al actualizar la reservación."
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="guests"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Huéspedes</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" min="1" placeholder="Número de personas" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rooms"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Habitaciones</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" min="1" placeholder="Cantidad de habitaciones" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="bedroomsType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo de habitación</FormLabel>
                            <FormControl>
                                <select {...field} className="border border-gray-300 rounded-lg p-2 w-full">
                                    <option value="" disabled>Selecciona el tipo de habitación</option>
                                    {bedroomsTypes.map((type, index) => (
                                        <option key={index} value={type}>{type}</option>
                                    ))}
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="arrivalDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha de llegada</FormLabel>
                                <FormControl>
                                    <Input {...field} type="date" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="departureDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha de salida</FormLabel>
                                <FormControl>
                                    <Input {...field} type="date" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <DialogFooter className="flex flex-wrap justify-between pt-4 gap-4">
                    <DialogClose asChild>
                        <Button type="button" variant="success">
                            <Icon action='undo' className="mr-2" />
                            Cancelar
                        </Button>
                    </DialogClose>

                    <Button type="submit" variant="update">
                        <Icon action='save' className="mr-2" />
                        Actualizar
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}

export default FormEditReservation;
