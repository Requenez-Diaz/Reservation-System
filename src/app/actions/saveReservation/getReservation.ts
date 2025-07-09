'use server';

import prisma from '@/lib/db';
import { getServerSession } from 'next-auth/next';

export const getReservations = async () => {
  try {
    const session = await getServerSession();
    const userEmail = session?.user?.email;

    if (!userEmail) {
      throw new Error('No estás autenticado.');
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail }
    });

    if (!user) {
      throw new Error('Usuario no encontrado.');
    }

    const reservations = await prisma.reservation.findMany({
      where: {
        email: userEmail
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('reservations:', reservations);
    return { user, reservations };
  } catch (error) {
    console.error('Error al obtener las reservas', error);
    return { user: null, reservations: [] };
  }
};
