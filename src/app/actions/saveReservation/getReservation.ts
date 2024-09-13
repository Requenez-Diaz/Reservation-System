'use server';

import prisma from '@/lib/db';

export const getReservations = async () => {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('reservations:', reservations);
    return reservations;
  } catch (error) {
    console.error('Error al obtener las reservas', error);
    return [];
  }
};
