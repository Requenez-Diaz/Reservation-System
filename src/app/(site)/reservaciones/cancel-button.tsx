'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cancelReservation } from '@/app/actions/reservations/reservations';
import { useToast } from '@/components/ui/use-toast';
import { XCircle, Loader2 } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';

interface CancelButtonProps {
    reservationId: number;
}

export function CancelButton({ reservationId }: CancelButtonProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const { toast } = useToast();

    const handleCancel = async () => {
        setIsLoading(true);
        try {
            const result = await cancelReservation(reservationId);
            if (result.success) {
                toast({
                    title: 'Reservación cancelada',
                    description: result.message
                });
            } else {
                toast({
                    title: 'Error',
                    description: result.error,
                    variant: 'destructive'
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'No se pudo cancelar la reservación.',
                variant: 'destructive'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-full gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-bold"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <XCircle className="h-4 w-4" />
                    )}
                    Cancelar Reservación
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción cancelará tu reservación y liberará la habitación para
                        otros usuarios. Esta acción no se puede deshacer de forma directa.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cerrar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        {isLoading ? 'Cancelando...' : 'Sí, cancelar reservación'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
