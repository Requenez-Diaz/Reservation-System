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

export async function cancelReservation(reservationId: number) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: { ReservationDetails: true }
    });

    if (!reservation) {
      throw new Error('Reservación no encontrada');
    }

    if (reservation.status !== 'PENDING') {
      throw new Error('Solo se pueden cancelar reservaciones pendientes');
    }

    // Actualizamos tanto la reservación como sus detalles a CANCELLED
    await prisma.$transaction([
      prisma.reservation.update({
        where: { id: reservationId },
        data: { status: 'CANCELLED' }
      }),
      prisma.reservationDetails.updateMany({
        where: { reservation_id: reservationId },
        data: { status: 'CANCELLED' }
      })
    ]);

    revalidatePath('/reservaciones');
    revalidatePath('/habitaciones');

    return {
      success: true,
      message: 'Reservación cancelada exitosamente'
    };
  } catch (error) {
    console.error('Error al cancelar reservación:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Error al cancelar reservación'
    };
  }
}
