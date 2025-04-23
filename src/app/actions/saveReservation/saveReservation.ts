'use server';

import prisma from '@/lib/db';
import { Status } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const saveReservation = async (data: {
    bedroomsType: string;
    guests: number;
    rooms: number;
    arrivalDate: Date;
    departureDate: Date;
}) => {
    const session = await getServerSession(authOptions);
    console.log('====================================');
    console.log('Session:', session);
    console.log('====================================');
    const user = session?.user;

    if (!user || !user.email) {
        return {
            success: false,
            message: 'No estás autenticado.'
        };
    }

    const { name, email } = user;
    const lastName = user.name ? user.name.split(' ').slice(1).join(' ') : '';

    const { bedroomsType, guests, rooms, arrivalDate, departureDate } = data;

    const roomLimits: { [key: string]: number } = {
        'Habitación con abanico': 4,
        'Con aire acondicionado': 2,
        'Doble con abanico': 8,
        'Doble con aire acondicionado': 12
    };

    try {
        const existingReservations = await prisma.reservation.count({
            where: {
                bedroomsType: bedroomsType,
                arrivalDate: {
                    lte: departureDate
                },
                departureDate: {
                    gte: arrivalDate
                }
            }
        });

        if (existingReservations + rooms > roomLimits[bedroomsType]) {
            console.log(
                `No hay suficientes habitaciones disponibles del tipo ${bedroomsType}.`
            );
            return {
                success: false,
                message: `No hay suficientes habitaciones disponibles del tipo ${bedroomsType}.`
            };
        }

        await prisma.reservation.create({
            data: {
                name: name || '',
                lastName,
                email,
                bedroomsType,
                guests,
                rooms,
                arrivalDate,
                departureDate,
                status: Status.PENDING,
                User: {
                    connect: {
                        email: email
                    }
                }
            }
        });

        revalidatePath('/dashboard/bookings');

        return {
            success: true,
            message: 'La reserva se registró correctamente.'
        };
    } catch (error) {
        console.error('Error al guardar la reserva:', error);
        return {
            success: false,
            message: 'Error al guardar la reserva.'
        };
    }
};
