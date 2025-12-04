'use server';

import prisma from '@/lib/db';

export async function getReservationById(id: number) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: {
        User: true,
        reservationDetails: {
          include: {
            bedrooms: {
              include: {
                BedroomImages: true
              }
            },
            promotions: true
          }
        }
      }
    });

    if (!reservation) {
      return {
        success: false,
        error: 'Reservación no encontrada'
      };
    }

    return {
      success: true,
      reservation
    };
  } catch (error) {
    console.error('[v0] Error fetching reservation:', error);
    return {
      success: false,
      error: 'Error al obtener la reservación'
    };
  }
}
