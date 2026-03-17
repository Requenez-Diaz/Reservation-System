'use server';

import prisma from '@/lib/db';
import { Status } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface SaveReservationData {
  bedroomsType: string;
  guests: number;
  rooms: number;
  arrivalDate: Date;
  departureDate: Date;
  name: string;
  lastName: string;
}

interface SaveReservationResponse {
  success: boolean;
  message: string;
  showAvailabilityInfo?: boolean;
  availabilityInfo?: {
    availableRooms: number;
    totalRooms: number;
    nextAvailableDate: Date | null;
    conflictingReservations: Array<{
      id: number;
      arrivalDate: Date;
      departureDate: Date;
      rooms: number;
    }>;
  };
}

export const saveReservation = async (
  data: SaveReservationData
): Promise<SaveReservationResponse> => {
  const session = await getServerSession(authOptions);

  const user = session?.user;
  if (!user || !user.email) {
    return {
      success: false,
      message: 'No estás autenticado.'
    };
  }

  const {
    bedroomsType,
    guests,
    rooms,
    arrivalDate: rawArrivalDate,
    departureDate: rawDepartureDate
  } = data;
  const { email } = user;

  // Helper local para extraer YYYY-MM-DD y asegurar la fecha correcta en zona local
  const parseSafeDate = (d: string | Date) => {
    const iso = typeof d === 'string' ? d : new Date(d).toISOString();
    const [y, m, day] = iso.split('T')[0].split('-').map(Number);
    return new Date(y, m - 1, day, 0, 0, 0, 0);
  };

  const arrivalDate = parseSafeDate(rawArrivalDate);
  const departureDate = parseSafeDate(rawDepartureDate);

  try {
    // 1. Obtener habitaciones físicas del tipo solicitado
    const bedrooms = await prisma.bedrooms.findMany({
      where: {
        TypeBedrooms: { nameType: bedroomsType },
        status: true
      },
      select: { id: true, capacity: true }
    });

    if (bedrooms.length === 0) {
      return {
        success: false,
        message: `No hay habitaciones activas del tipo "${bedroomsType}".`
      };
    }

    // 2. Verificar disponibilidad real (excluyendo solapamientos)
    const busyRooms = await prisma.reservationDetails.findMany({
      where: {
        status: { not: Status.CANCELLED },
        Reservation: { status: { not: 'CANCELLED' } }, // El admin a veces solo cancela la cabecera
        // Lógica de solapamiento estándar: (start1 < end2) AND (end1 > start2)
        dateStart: { lt: departureDate },
        dateEnd: { gt: arrivalDate },
        Bedrooms: { TypeBedrooms: { nameType: bedroomsType } }
      },
      select: {
        bedrooms_id: true,
        dateEnd: true,
        id: true,
        dateStart: true
      }
    });

    const busyIds = new Set(busyRooms.map((r) => r.bedrooms_id));
    const availablePhysicalRooms = bedrooms.filter(b => !busyIds.has(b.id));

    if (availablePhysicalRooms.length < rooms) {
      // Calcular la próxima fecha disponible basándose en cuándo se libera alguna habitación
      let nextAvailableDate: Date | null = null;
      if (busyRooms.length > 0) {
        const sortedDates = busyRooms
          .map(r => new Date(r.dateEnd))
          .sort((a, b) => a.getTime() - b.getTime());
        nextAvailableDate = sortedDates[0];
      }

      return {
        success: false,
        message: `Lo sentimos, solo quedan ${availablePhysicalRooms.length} habitaciones disponibles para esas fechas.`,
        showAvailabilityInfo: true,
        availabilityInfo: {
          availableRooms: availablePhysicalRooms.length,
          totalRooms: bedrooms.length,
          nextAvailableDate,
          conflictingReservations: busyRooms.map(r => ({
            id: r.id,
            arrivalDate: r.dateStart,
            departureDate: r.dateEnd,
            rooms: 1 // Cada detalle es 1 habitación
          }))
        }
      };
    }

    // 3. Obtener usuario
    const userRecord = await prisma.user.findUnique({
      where: { email }
    });

    if (!userRecord) {
      return { success: false, message: 'Usuario no encontrado en la base de datos.' };
    }

    // 4. Crear Reserva y sus Detalles
    const selectedRooms = availablePhysicalRooms.slice(0, rooms);

    const newReservation = await prisma.reservation.create({
      data: {
        user_id: userRecord.id,
        status: 'PENDING',
        ReservationDetails: {
          create: selectedRooms.map(room => ({
            bedrooms_id: room.id,
            dateStart: arrivalDate,
            dateEnd: departureDate,
            price: 0, // Se recomienda implementar lógica de precios aquí o pasarla desde el front
            guestQuantity: Math.ceil(guests / rooms),
            status: Status.PENDING
          }))
        }
      }
    });

    // NUEVO: crear la notificación asociada a la reserva
    await prisma.notification.create({
      data: {
        title: 'Nueva Reserva Creada',
        userId: userRecord.id,
        email: userRecord.email,
        userImage: null,
        type: 'CREATED',
        message: `Se ha creado una nueva reserva (ID: ${newReservation.id}) para ${name} ${lastName}.`,
        isRead: false
      }
    });

    revalidatePath('/dashboard/bookings');
    revalidatePath('/habitaciones');
    revalidatePath('/rooms');
    revalidatePath('/reservaciones');

    return {
      success: true,
      message: `La reserva se registró correctamente. ID: ${newReservation.id}`
    };
  } catch (error) {
    console.error('Error al guardar la reserva:', error);
    return {
      success: false,
      message: 'Error inesperado al registrar la reservación.'
    };
  }
};
