'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

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
        user_id: data.userId,
        status: 'PENDING',
        isRead: false,
        ReservationDetails: {
          create: data.rooms.map((room) => {
            const promotionPayload = room.promotionsId
              ? { promotionsId: room.promotionsId }
              : {};

            return {
              Bedrooms: { connect: { id: room.bedroomId } },

              ...promotionPayload,

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
        ReservationDetails: {
          include: {
            Bedrooms: true
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
    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          username,
          password: '',
          roleName: 'User'
        }
      });
    }

    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error: 'Error al procesar el usuario'
    };
  }
}
