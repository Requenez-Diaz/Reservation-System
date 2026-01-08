'use server';

import prisma from '@/lib/db';

export async function getReservationsByUsers(userId: number) {
  try {
    if (!userId) {
      return {
        success: false,
        message: 'ID de usuario requerido'
      };
    }

    // Obtener información del usuario
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        username: true,
        email: true
      }
    });

    console.log({
      user
    });

    if (!user) {
      return {
        success: false,
        message: 'Usuario no encontrado'
      };
    }

    // Obtener reservaciones del usuario
    const reservations = await prisma.reservation.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' }, // Más recientes primero
      select: {
        id: true,
        createdAt: true
      }
    });

    console.log({
      reservations
    });

    return {
      success: true,
      user,
      reservations
    };
  } catch (error) {
    console.error('Error fetching user reservations:', error);
    return {
      success: false,
      message: 'Error al obtener las reservaciones'
    };
  }
}
