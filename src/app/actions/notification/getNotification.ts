'use server';

import prisma from '@/lib/db';

export const getConfirmedNotifications = async (userId: number) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId,
        type: 'CONFIRMED',
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        message: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            image: true,
          },
        },
        reservation: {
          select: {
            id: true,
            bedroomsType: true,
            arrivalDate: true,
            departureDate: true,
            guests: true,
            rooms: true,
            status: true,
            User: {
              select: {
                username: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return { success: true, notifications };
  } catch (error) {
    return { success: false, message: 'Error al obtener notificaciones', notifications: [] };
  }
};
