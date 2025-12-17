'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export type QuickReservationData = {
  clientEmail: string;
  clientName: string;
  clientPhone: string;
  bedroomId: string;
  dateStart: Date;
  dateEnd: Date;
  guests: number;
};

export async function createQuickReservation(data: QuickReservationData) {
  try {
    // 1. Buscar o crear usuario guest
    let user = await prisma.user.findUnique({
      where: { email: data.clientEmail }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: data.clientEmail,
          username: data.clientName,
          password: '',
          roleName: 'User'
        }
      });
    }

    // 2. Buscar la habitación para obtener el precio
    const bedroom = await prisma.bedrooms.findUnique({
      where: { id: Number.parseInt(data.bedroomId) }
    });

    if (!bedroom) {
      throw new Error('Habitación no encontrada');
    }

    // 3. Calcular precio (usar temporada baja por defecto)
    const nights = Math.ceil(
      (data.dateEnd.getTime() - data.dateStart.getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const totalPrice = bedroom.lowSeasonPrice * nights;

    let defaultPromotion = await prisma.promotions.findFirst({
      where: { codePromotions: 'NO_PROMOTION' }
    });

    if (!defaultPromotion) {
      const season = await prisma.seasons.findFirst();
      if (!season) {
        throw new Error('No hay temporadas disponibles');
      }

      defaultPromotion = await prisma.promotions.create({
        data: {
          codePromotions: 'NO_PROMOTION',
          porcentageDescuent: 0,
          dateStart: new Date(),
          dateEnd: new Date(2099, 11, 31),
          description: 'Sin promoción aplicada',
          updatedAt: new Date(),
          seasonId: season.id
        }
      });
    }

    // 5. Crear la reserva
    const reservation = await prisma.reservation.create({
      data: {
        userId: user.id,
        status: 'PENDING',
        isRead: false,
        reservationDetails: {
          create: {
            bedrooms: {
              connect: { id: Number.parseInt(data.bedroomId) }
            },
            promotions: {
              connect: { id: defaultPromotion.id }
            },
            dateStart: data.dateStart,
            dateEnd: data.dateEnd,
            price: totalPrice,
            guestQuantity: data.guests,
            status: 'PENDING'
          }
        }
      },
      include: {
        reservationDetails: {
          include: {
            bedrooms: true,
            promotions: true
          }
        }
      }
    });

    revalidatePath('/reservaciones');
    revalidatePath('/habitaciones');

    return {
      success: true,
      reservation,
      message: 'Reserva creada exitosamente'
    };
  } catch (error) {
    console.error('Error creating quick reservation:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Error al crear la reserva'
    };
  }
}
