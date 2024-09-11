'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteReservation } from "@/app/actions/saveReservation/deleteReservation";

export function DeleteReservation({ reservationId }: { reservationId: number }) {
    const { toast } = useToast();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        await deleteReservation(formData);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">
                    Cancelar Reservación
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-full">
                <DialogHeader>
                    <DialogTitle>Cancelar reservación</DialogTitle>
                    <DialogDescription>
                        ¿Está seguro de que desea cancelar la reservación?
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <input type="hidden" name="reservationId" value={String(reservationId)} />
                    <DialogFooter className="flex flex-col sm:flex-row justify-center mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="success" className="mb-2 sm:mb-0 sm:mr-4">
                                No
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            variant="destructive"
                            className="sm:ml-4"
                            onClick={() => {
                                toast({
                                    title: "Reservación eliminada.",
                                    description: "La reservación se ha eliminado correctamente.",
                                });
                            }}
                        >
                            Sí
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}