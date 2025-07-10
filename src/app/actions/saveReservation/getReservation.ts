'use server';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth/next';

export async function getReservationById(reservationId: number) {
  console.log('🔍 getReservationById llamado con ID:', reservationId);

  try {
    // Obtener la sesión del usuario
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      console.log('❌ No hay sesión de usuario');
      return {
        success: false,
        message: 'No estás autenticado'
      };
    }

    console.log('✅ Usuario autenticado:', session.user.id);

    // Validar el ID de reservación
    if (!reservationId || isNaN(reservationId)) {
      console.log('❌ ID de reservación inválido:', reservationId);
      return {
        success: false,
        message: 'ID de reservación inválido'
      };
    }

    // Buscar la reservación en la base de datos
    console.log('📊 Buscando reservación en la base de datos...');
    const reservation = await prisma.reservation.findUnique({
      where: {
        id: reservationId,
        userId: Number(session.user.id) // Solo permitir acceso a reservaciones propias
      },
      select: {
        id: true,
        arrivalDate: true,
        departureDate: true,
        rooms: true,
        bedroomsType: true,
        guests: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!reservation) {
      console.log('❌ Reservación no encontrada');
      return {
        success: false,
        message:
          'Reservación no encontrada o no tienes permisos para acceder a ella'
      };
    }

    console.log('✅ Reservación encontrada:', {
      id: reservation.id,
      bedroomsType: reservation.bedroomsType,
      status: reservation.status
    });

    return {
      success: true,
      reservation: {
        id: reservation.id,
        arrivalDate: reservation.arrivalDate,
        departureDate: reservation.departureDate,
        rooms: reservation.rooms,
        bedroomsType: reservation.bedroomsType,
        guests: reservation.guests,
        status: reservation.status
      }
    };
  } catch (error) {
    console.error('💥 Error en getReservationById:', error);
    return {
      success: false,
      message: 'Error al obtener la reservación'
    };
  }
}
