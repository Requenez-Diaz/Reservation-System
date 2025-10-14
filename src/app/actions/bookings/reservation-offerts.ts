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
  console.log('[v0] createReservationForPromotion iniciado');

  try {
    const promotionId = Number(formData.get('promotionId'));
    const bedroomId = Number(formData.get('bedroomId'));
    const name = String(formData.get('guestName') || '').split(' ')[0] || '';
    const lastName =
      String(formData.get('guestName') || '')
        .split(' ')
        .slice(1)
        .join(' ') || '';
    const email = String(formData.get('guestEmail') || '');
    const arrivalDateStr = String(formData.get('checkIn') || '');
    const departureDateStr = String(formData.get('checkOut') || '');
    const guests = Number(formData.get('guests')) || 0;
    const rooms = Number(formData.get('rooms')) || 0;
    const userId = Number(formData.get('userId'));

    console.log('[v0] Datos recibidos:', {
      promotionId,
      bedroomId,
      name,
      lastName,
      email,
      arrivalDateStr,
      departureDateStr,
      userId
    });

    if (
      !promotionId ||
      !bedroomId ||
      !name ||
      !email ||
      !arrivalDateStr ||
      !departureDateStr
    ) {
      return { success: false, message: 'Datos incompletos para la reserva.' };
    }

    if (!userId || isNaN(userId)) {
      return { success: false, message: 'Debe seleccionar un usuario válido.' };
    }

    // 2. Verificar que el usuario existe
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    if (!user) {
      return { success: false, message: 'Usuario seleccionado no encontrado.' };
    }

    // 3. Validar las fechas
    const arrivalDate = new Date(arrivalDateStr);
    const departureDate = new Date(departureDateStr);

    if (
      !(arrivalDate instanceof Date) ||
      isNaN(arrivalDate.getTime()) ||
      !(departureDate instanceof Date) ||
      isNaN(departureDate.getTime())
    ) {
      return { success: false, message: 'Fechas inválidas.' };
    }

    if (stripTime(departureDate) <= stripTime(arrivalDate)) {
      return {
        success: false,
        message: 'La fecha de salida debe ser posterior a la fecha de entrada.'
      };
    }

    // 4. Obtener la promoción y verificar las fechas
    const promotion = await prisma.promotions.findUnique({
      where: { id: promotionId },
      include: {
        BedroomsPromotions: true
      }
    });

    if (!promotion) {
      return { success: false, message: 'Promoción no encontrada.' };
    }

    const promoStart = new Date(promotion.dateStart);
    const promoEnd = new Date(promotion.dateEnd);

    if (
      stripTime(arrivalDate) < stripTime(promoStart) ||
      stripTime(departureDate) > stripTime(promoEnd)
    ) {
      return {
        success: false,
        message:
          'Las fechas de la reserva deben estar dentro del rango de la promoción.'
      };
    }

    // 5. Verificar que el bedroomId está en la promoción
    const isBedroomInPromotion = promotion.BedroomsPromotions.some(
      (bp) => bp.bedroomId === bedroomId
    );

    if (!isBedroomInPromotion) {
      return {
        success: false,
        message: 'La habitación seleccionada no está asociada a esta promoción.'
      };
    }

    const nights = diffNights(arrivalDate, departureDate);
    if (nights <= 0) {
      return {
        success: false,
        message: 'La reserva debe ser de al menos 3 noche.'
      };
    }

    // 6. Obtener el tipo de habitación para la reserva
    const bedroom = await prisma.bedrooms.findUnique({
      where: { id: bedroomId }
    });

    if (!bedroom) {
      return {
        success: false,
        message: 'Habitación seleccionada no encontrada.'
      };
    }

    // 7. Crear la reserva
    console.log('[v0] Creando reserva en la base de datos...');
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

    console.log('[v0] Reserva creada exitosamente con ID:', reservation.id);

    // 8. Revalidar rutas (no afecta el éxito de la reserva si falla)
    try {
      console.log('[v0] Revalidando rutas...');
      revalidatePath('/dashboard/offerts');
      revalidatePath(`/dashboard/offerts/${promotionId}`);
      console.log('[v0] Rutas revalidadas exitosamente');
    } catch (revalidateError) {
      console.error('[v0] Error al revalidar rutas:', revalidateError);
      // No afecta el resultado, la reserva ya fue creada
    }

    console.log('[v0] Retornando éxito');
    return {
      success: true,
      message: 'Reserva creada exitosamente.',
      reservationId: reservation.id
    };
  } catch (error) {
    console.error('[v0] Error capturado en catch principal:', error);
    console.error(
      '[v0] Stack trace:',
      error instanceof Error ? error.stack : 'No stack available'
    );
    return { success: false, message: 'Error al crear la reserva.' };
  }
}
