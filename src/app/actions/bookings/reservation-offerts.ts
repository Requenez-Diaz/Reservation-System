'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

type ActionState = {
  success: boolean;
  message: string;
  reservationId?: number;
  errors?: Record<string, string>;
};

function stripTime(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function diffNights(checkIn: Date, checkOut: Date) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const start = stripTime(checkIn).getTime();
  const end = stripTime(checkOut).getTime();
  return Math.max(0, Math.round((end - start) / msPerDay));
}

export async function createReservationForPromotion(
  _prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  try {
    const promotionId = Number(formData.get('promotionId'));
    const bedroomId = Number(formData.get('bedroomId'));
    const guestName = String(formData.get('guestName') || '').trim();
    const name = guestName.split(' ')[0] || '';
    const lastName = guestName.split(' ').slice(1).join(' ') || '';
    const email = String(formData.get('guestEmail') || '').trim();
    const arrivalDateStr = String(formData.get('checkIn') || '');
    const departureDateStr = String(formData.get('checkOut') || '');
    const guests = Number(formData.get('guests')) || 0;
    const rooms = Number(formData.get('rooms')) || 0;
    const userId = Number(formData.get('userId'));

    if (!promotionId || isNaN(promotionId)) {
      return { success: false, message: 'ID de promoción inválido.' };
    }

    if (!bedroomId || isNaN(bedroomId)) {
      return { success: false, message: 'ID de habitación inválido.' };
    }

    if (!name || !email) {
      return { success: false, message: 'Nombre y email son requeridos.' };
    }

    if (!arrivalDateStr || !departureDateStr) {
      return { success: false, message: 'Las fechas son requeridas.' };
    }

    if (!userId || isNaN(userId)) {
      return { success: false, message: 'Debe iniciar sesión para reservar.' };
    }

    if (guests <= 0 || rooms <= 0) {
      return {
        success: false,
        message: 'Número de huéspedes y habitaciones debe ser mayor a 0.'
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return {
        success: false,
        message: 'Usuario no encontrado. Por favor, inicie sesión nuevamente.'
      };
    }

    const arrivalDate = new Date(arrivalDateStr);
    const departureDate = new Date(departureDateStr);

    if (isNaN(arrivalDate.getTime()) || isNaN(departureDate.getTime())) {
      return { success: false, message: 'Fechas inválidas.' };
    }

    if (stripTime(departureDate) <= stripTime(arrivalDate)) {
      return {
        success: false,
        message: 'La fecha de salida debe ser posterior a la fecha de entrada.'
      };
    }

    const promotion = await prisma.promotions.findUnique({
      where: { id: promotionId },
      include: {
        BedroomsPromotion: true
      }
    });

    if (!promotion) {
      return { success: false, message: 'Promoción no encontrada.' };
    }

    const promoStart = stripTime(new Date(promotion.dateStart));
    const promoEnd = stripTime(new Date(promotion.dateEnd));
    const checkInStripped = stripTime(arrivalDate);
    const checkOutStripped = stripTime(departureDate);

    if (checkInStripped < promoStart || checkOutStripped > promoEnd) {
      return {
        success: false,
        message: `Las fechas deben estar entre ${promoStart.toLocaleDateString()} y ${promoEnd.toLocaleDateString()}.`
      };
    }

    const isBedroomInPromotion = promotion.BedroomsPromotion.some(
      (bp) => bp.bedroomId === bedroomId
    );

    if (!isBedroomInPromotion) {
      return {
        success: false,
        message:
          'La habitación seleccionada no está disponible en esta promoción.'
      };
    }

    const nights = diffNights(arrivalDate, departureDate);
    if (nights < 1) {
      return {
        success: false,
        message: 'La reserva debe ser de al menos 1 noche.'
      };
    }

    const bedroom = await prisma.bedroom.findUnique({
      where: { id: bedroomId }
    });

    if (!bedroom) {
      return {
        success: false,
        message: 'Habitación no encontrada.'
      };
    }

    const reservation = await prisma.reservation.create({
      data: {
        name,
        lastName,
        email,
        bedroomsType: bedroom.typeBedroom,
        guests,
        rooms,
        arrivalDate,
        departureDate,
        status: 'PENDING',
        userId,
        promotionId
      }
    });

    revalidatePath('/dashboard/offerts');
    revalidatePath(`/dashboard/offerts/${promotionId}`);

    return {
      success: true,
      message: 'Reserva creada exitosamente.',
      reservationId: reservation.id
    };
  } catch (error) {
    console.error('[ERROR] Error al crear reserva:', error);

    if (error instanceof Error) {
      return {
        success: false,
        message: `Error al crear la reserva: ${error.message}`
      };
    }

    return {
      success: false,
      message:
        'Error inesperado al crear la reserva. Por favor, intente nuevamente.'
    };
  }
}
