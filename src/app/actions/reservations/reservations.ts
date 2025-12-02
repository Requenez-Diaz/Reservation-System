'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

// Se cambió promotionId por promotionsId para que coincida con el schema
export type ReservationData = {
  userId: number;
  rooms: {
    bedroomId: number;
    dateStart: Date;
    dateEnd: Date;
    price: number;
    guestQuantity: number;
    promotionsId?: number; // Opcional
  }[];
};

export async function createReservation(data: ReservationData) {
  try {
    const reservation = await prisma.reservation.create({
      data: {
        userId: data.userId,
        status: 'PENDING',
        isRead: false,
        reservationDetails: {
          create: data.rooms.map((room) => {
            // Construimos el payload de conexión para la promoción
            const promotionPayload = room.promotionsId
              ? { promotionsId: room.promotionsId } // ⭐️ CLAVE: Pasamos el ID escalar directamente
              : {};

            return {
              bedrooms: { connect: { id: room.bedroomId } },

              ...promotionPayload, // Agregamos { promotionsId: X } o {}

              dateStart: room.dateStart,
              dateEnd: room.dateEnd,
              price: room.price,
              guestQuantity: room.guestQuantity,
              status: 'PENDING'
            };
          })
        }
      },
      include: {
        reservationDetails: {
          include: {
            bedrooms: true
          }
        }
      }
    });

    revalidatePath('/booking');

    return {
      success: true,
      reservation,
      message: 'Reserva creada exitosamente'
    };
  } catch (error) {
    console.error('[v0] Error creating reservation:', error);
    return {
      success: false,
      error: 'Error al crear la reserva. Por favor intenta de nuevo.'
    };
  }
}

export async function getOrCreateGuestUser(email: string, username: string) {
  try {
    // Buscar usuario existente por email
    let user = await prisma.user.findUnique({
      where: { email }
    });

    // Si no existe, crear uno nuevo con rol "User"
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          username,
          password: '', // Usuario invitado sin password
          roleName: 'User' // Asegúrate de tener este rol en tu DB
        }
      });
    }

    return { success: true, user };
  } catch (error) {
    console.error('[v0] Error getting/creating user:', error);
    return {
      success: false,
      error: 'Error al procesar el usuario'
    };
  }
}
