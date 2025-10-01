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
    name,
    lastName,
    bedroomsType,
    guests,
    rooms,
    arrivalDate,
    departureDate
  } = data;
  const { email } = user;

  try {
    const getBedroomInfo = async (bedroomType: string) => {
      const bedrooms = await prisma.bedrooms.findMany({
        where: {
          typeBedroom: bedroomType,
          status: true
        },
        select: {
          id: true,
          typeBedroom: true,
          capacity: true,
          numberBedroom: true,
          status: true
        }
      });

      if (bedrooms.length === 0) {
        return null;
      }

      const totalRooms = bedrooms.reduce(
        (sum, bedroom) => sum + bedroom.capacity,
        0
      );

      return {
        bedrooms,
        totalRooms
      };
    };

    const bedroomInfo = await getBedroomInfo(bedroomsType);

    if (!bedroomInfo) {
      return {
        success: false,
        message: `No se encontraron habitaciones del tipo "${bedroomsType}" o están inactivas.`
      };
    }

    // Función para obtener información detallada de disponibilidad
    const getAvailabilityInfo = async (startDate: Date, endDate: Date) => {
      const conflictingReservations = await prisma.reservation.findMany({
        where: {
          bedroomsType: bedroomsType,
          status: {
            not: Status.CANCELLED
          },
          OR: [
            {
              arrivalDate: { lte: startDate },
              departureDate: { gt: startDate }
            },
            {
              arrivalDate: { gte: startDate, lt: endDate }
            },
            {
              departureDate: { gt: startDate, lte: endDate }
            },
            {
              arrivalDate: { lte: startDate },
              departureDate: { gte: endDate }
            }
          ]
        },
        select: {
          id: true,
          rooms: true,
          arrivalDate: true,
          departureDate: true,
          name: true,
          email: true
        },
        orderBy: {
          departureDate: 'asc'
        }
      });

      const totalOccupiedRooms = conflictingReservations.reduce(
        (sum, reservation) => sum + reservation.rooms,
        0
      );
      const availableRooms = bedroomInfo.totalRooms - totalOccupiedRooms;

      let nextAvailableDate: Date | null = null;

      if (availableRooms < rooms && conflictingReservations.length > 0) {
        const sortedByDeparture = conflictingReservations.sort(
          (a, b) => a.departureDate.getTime() - b.departureDate.getTime()
        );

        let currentOccupied = totalOccupiedRooms;
        for (const reservation of sortedByDeparture) {
          currentOccupied -= reservation.rooms;
          const potentialAvailable = bedroomInfo.totalRooms - currentOccupied;

          if (potentialAvailable >= rooms) {
            nextAvailableDate = reservation.departureDate;
            break;
          }
        }
      }
      return {
        availableRooms,
        totalRooms: bedroomInfo.totalRooms,
        nextAvailableDate,
        conflictingReservations: conflictingReservations.map((res) => ({
          id: res.id,
          arrivalDate: res.arrivalDate,
          departureDate: res.departureDate,
          rooms: res.rooms
        }))
      };
    };

    const availabilityInfo = await getAvailabilityInfo(
      arrivalDate,
      departureDate
    );

    if (availabilityInfo.availableRooms < rooms) {
      return {
        success: false,
        message: `No hay suficientes habitaciones disponibles del tipo "${bedroomsType}" para las fechas seleccionadas.`,
        showAvailabilityInfo: true,
        availabilityInfo
      };
    }
    const newReservation = await prisma.reservation.create({
      data: {
        name,
        lastName,
        email,
        bedroomsType,
        guests,
        rooms,
        arrivalDate: arrivalDate,
        departureDate: departureDate,
        status: Status.PENDING,
        User: {
          connect: {
            email: email
          }
        }
      }
    });

    revalidatePath('/dashboard/bookings');

    return {
      success: true,
      message: `La reserva se registró correctamente. ID de reservación: ${newReservation.id}`
    };
  } catch (error) {
    console.error('💥 Error al guardar la reserva:', error);
    return {
      success: false,
      message: 'Error al guardar la reserva.'
    };
  }
};
