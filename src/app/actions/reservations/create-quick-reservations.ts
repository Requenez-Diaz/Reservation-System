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

    const bedroomIdNumber = Number.parseInt(data.bedroomId);
    const bedroom = await prisma.bedrooms.findUnique({
      where: { id: bedroomIdNumber }
    });

    if (!bedroom) {
      throw new Error('Habitación no encontrada');
    }

    const diffInTime = data.dateEnd.getTime() - data.dateStart.getTime();
    const nights = Math.max(1, Math.ceil(diffInTime / (1000 * 60 * 60 * 24)));
    const totalPrice = bedroom.lowSeasonPrice * nights;

    let defaultPromotion = await prisma.promotions.findFirst({
      where: { codePromotions: 'NO_PROMOTION' }
    });

    if (!defaultPromotion) {
      const season = await prisma.seasons.findFirst();
      if (!season) {
        throw new Error(
          'No hay temporadas disponibles para asignar a la promoción'
        );
      }

      defaultPromotion = await prisma.promotions.create({
        data: {
          codePromotions: 'NO_PROMOTION',
          porcentageDescuent: 0,
          dateStart: new Date(2000, 0, 1),
          dateEnd: new Date(2099, 11, 31),
          description: 'Sin promoción aplicada',
          updatedAt: new Date(),
          seasonId: season.id
        }
      });
    }

    const reservation = await prisma.reservation.create({
      data: {
        User: {
          connect: { id: user.id }
        },
        status: 'PENDING',
        isRead: false,

        ReservationDetails: {
          create: {
            dateStart: data.dateStart,
            dateEnd: data.dateEnd,
            price: totalPrice,
            guestQuantity: data.guests,
            status: 'PENDING',

            Bedrooms: {
              connect: { id: bedroomIdNumber }
            },
            Promotions: {
              connect: { id: defaultPromotion.id }
            }
          }
        }
      },
      include: {
        ReservationDetails: {
          include: {
            Bedrooms: true,
            Promotions: true
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
