"use server";

import prisma from "@/lib/db";
import { Status } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

export const saveReservation = async (data: {
    name: string;
    lastName: string;
    email: string;
    bedroomsType: string;
    guests: number;
    rooms: number;
    arrivalDate: Date;
    departureDate: Date;
}) => {
    const session = await getServerSession();
    const userEmail = session?.user?.email;

    if (!userEmail) {
        return {
            success: false,
            message: "No estás autenticado.",
        };
    }

    const { name, lastName, bedroomsType, guests, rooms, arrivalDate, departureDate } = data;

    const roomLimits: { [key: string]: number } = {
        'Habitación con abanico': 4,
        'Con aire acondicionado': 2,
        'Doble con abanico': 8,
        'Doble con aire acondicionado': 12,
    };

    try {
        const existingReservations = await prisma.reservation.count({
            where: {
                bedroomsType: bedroomsType,
                arrivalDate: {
                    lte: departureDate,
                },
                departureDate: {
                    gte: arrivalDate,
                },
            },
        });

        if (existingReservations + rooms > roomLimits[bedroomsType]) {
            console.log(`No hay suficientes habitaciones disponibles del tipo ${bedroomsType}.`);
            return {
                success: false,
                message: `No hay suficientes habitaciones disponibles del tipo ${bedroomsType}.`,
            };
        }

        const user = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        if (!user) {
            return {
                success: false,
                message: "Usuario no encontrado.",
            };
        }

        await prisma.reservation.create({
            data: {
                name,
                lastName,
                email: userEmail,
                bedroomsType,
                guests,
                rooms,
                arrivalDate,
                departureDate,
                status: Status.PENDING,
                userId: user.id,
            },
        });

        revalidatePath("/dashboard/bookings");

        return {
            success: true,
            message: "La reserva se registró correctamente.",
        };
    } catch (error) {
        console.error("Error al guardar la reserva:", error);
        return {
            success: false,
            message: "Error al guardar la reserva.",
        };
    }
}