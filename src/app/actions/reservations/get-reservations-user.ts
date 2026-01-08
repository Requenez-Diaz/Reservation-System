'use server';

import prisma from '@/lib/db';

export async function getUserReservations(userId: number) {
  try {
    const reservations = await prisma.reservation.findMany({
      where: { userId },
      include: {
        reservationDetails: {
          include: {
            bedrooms: true,
            promotions: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('reservations', { reservations });

    return {
      success: true,
      reservations
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      reservations: []
    };
  }
}
