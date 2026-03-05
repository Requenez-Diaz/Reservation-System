'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { differenceInDays, startOfDay } from 'date-fns';

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
      where: { id: bedroomIdNumber },
      include: { Seasons: true } // Incluimos la temporada para saber el precio real
    });

    if (!bedroom) {
      throw new Error('Habitación no encontrada');
    }

    // --- VERIFICACIÓN DE DISPONIBILIDAD ---
    const start = startOfDay(new Date(data.dateStart));
    const end = startOfDay(new Date(data.dateEnd));

    const overlappingReservation = await prisma.reservationDetails.findFirst({
      where: {
        bedrooms_id: bedroomIdNumber,
        status: { in: ['CONFIRMED', 'PENDING'] },
        OR: [
          {
            dateStart: { lte: start },
            dateEnd: { gte: start }
          },
          {
            dateStart: { lte: end },
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
      throw new Error(
        'La habitación ya está reservada para estas fechas. Por favor elige otras fechas.'
      );
    }

    // Usamos differenceInDays para obtener noches exactas (ej: entrada 10, salida 12 = 2 noches)
    const nights = Math.max(1, differenceInDays(end, start));

    // --- CORRECCIÓN DE PRECIO DINÁMICO ---
    const now = new Date();
    const season = bedroom.Seasons;

    // Verificamos si estamos en la temporada asignada a la habitación
    const isHighSeason =
      season &&
      now >= new Date(season.dateStart) &&
      now <= new Date(season.dateEnd) &&
      season.nameSeason.toLowerCase().includes('alta');

    const pricePerNight = isHighSeason
      ? bedroom.highSeasonPrice
      : bedroom.lowSeasonPrice;
    const totalPrice = pricePerNight * nights;

    // --- MANEJO DE PROMOCIÓN ---
    let defaultPromotion = await prisma.promotions.findFirst({
      where: { codePromotions: 'NO_PROMOTION' }
    });

    if (!defaultPromotion) {
      const anySeason = await prisma.seasons.findFirst();
      if (!anySeason) {
        throw new Error('No hay temporadas disponibles');
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
        User: { connect: { id: user.id } },
        status: 'PENDING',
        isRead: false,
        ReservationDetails: {
          create: {
            dateStart: start,
            dateEnd: end,
            price: totalPrice,
            guestQuantity: data.guests,
            status: 'PENDING',
            Bedrooms: { connect: { id: bedroomIdNumber } },
            Promotions: { connect: { id: defaultPromotion.id } }
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
      message: `Reserva creada por ${nights} noche(s). Total: $${totalPrice}`
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
