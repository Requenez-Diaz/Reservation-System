'use server';

import prisma from '@/lib/db';

export async function getUserReservations(userId: number) {
  try {
    const reservations = await prisma.reservation.findMany({
      where: { user_id: userId },
      include: {
        ReservationDetails: {
          include: {
            Bedrooms: {
              include: {
                galleryImages: true,
                TypeBedrooms: true
              }
            },
            Promotions: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return { success: true, reservations };
  } catch (error) {
    console.error(error);
    return { success: false, reservations: [] };
  }
}
