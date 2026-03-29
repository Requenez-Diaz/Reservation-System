'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { differenceInDays, startOfDay } from 'date-fns';

export type QuickReservationData = {
  clientEmail: string;
  clientName: string;
  clientPhone: string;
  bedroomId: string | number;
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

    // 2. Obtener Habitación y Temporada
    const bedroomIdNumber = Number(data.bedroomId);
    const bedroom = await prisma.bedroom.findUnique({
      where: { id: bedroomIdNumber },
      include: { Season: true }
    });

    if (!bedroom) {
      return { success: false, error: 'Habitación no encontrada.' };
    }
    const start = startOfDay(new Date(data.dateStart));
    const end = startOfDay(new Date(data.dateEnd));

    const overlappingReservation = await prisma.reservationDetails.findFirst({
      where: {
        bedrooms_id: bedroomIdNumber,
        status: { in: ['CONFIRMED', 'PENDING'] },
        OR: [
          {
            dateStart: { lte: start },
            dateEnd: { gt: start }
          },
          {
            dateStart: { lt: end },
            dateEnd: { gte: end }
          },
          {
            dateStart: { gte: start },
            dateEnd: { lte: end }
          }
        ]
      }
    });

    if (overlappingReservation) {
      return {
        success: false,
        error:
          'La habitación ya está reservada para estas fechas. Por favor elige otras fechas.'
      };
    }

    // 4. Cálculos de Estancia
    const nights = Math.max(1, differenceInDays(end, start));

    // --- CÁLCULO DE PRECIO DINÁMICO ---
    const now = new Date();
    const season = bedroom.Season;

    let isHighSeason = false;
    if (season && season.dateStart && season.dateEnd) {
      const sStart = new Date(season.dateStart);
      const sEnd = new Date(season.dateEnd);
      isHighSeason =
        now >= sStart &&
        now <= sEnd &&
        season.nameSeason.toUpperCase() === 'ALTA';
    }

    const pricePerNight = isHighSeason
      ? bedroom.highSeasonPrice
      : bedroom.lowSeasonPrice;
    const totalPrice = pricePerNight * nights;

    let defaultPromotion = await prisma.promotions.findFirst({
      where: { codePromotions: 'NO_PROMOTION' }
    });

    if (!defaultPromotion) {
      const anySeason = await prisma.season.findFirst();
      if (!anySeason) {
        return {
          success: false,
          error: 'Configuración de temporadas incompleta en el sistema.'
        };
      }

      defaultPromotion = await prisma.promotions.create({
        data: {
          codePromotions: 'NO_PROMOTION',
          porcentageDescuent: 0,
          dateStart: new Date(2000, 0, 1),
          dateEnd: new Date(2099, 11, 31),
          description: 'Sin promoción aplicada',
          updatedAt: new Date(),
          seasonId: anySeason.id
        }
      });
    }

    const reservation = await prisma.reservation.create({
      data: {
        user_id: user.id,
        status: 'PENDING',
        isRead: false,
        ReservationDetails: {
          create: {
            dateStart: start,
            dateEnd: end,
            price: totalPrice,
            guestQuantity: data.guests,
            status: 'PENDING',
            bedrooms_id: bedroomIdNumber,
            promotion_id: defaultPromotion.id
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
      message: `Reserva creada exitosamente por ${nights} noche(s).`
    };
  } catch (error) {
    console.error('Error al crear la reserva rápida:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error interno al procesar la reserva.'
    };
  }
}
