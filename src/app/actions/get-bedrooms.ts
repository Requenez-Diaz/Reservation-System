'use server';

import prisma from '@/lib/db';

export const getAllBedrooms = async () => {
  try {
    const bedrooms = await prisma.bedrooms.findMany({
      where: {
        status: true
      },
      include: {
        bookingsDetails: {
          where: {
            dateStart: new Date()
          }
        }
      }
    });
    console.log('Habitaciones', bedrooms);
    return bedrooms;
  } catch (error) {
    console.error('Error al obtener las habitaciones', error);

    return [];
  }
};

export const getBedroomsById = async (id: number) => {
  try {
    const bedroom = await prisma.bedrooms.findUnique({
      where: {
        id
      }
    });
    console.log('Habitaciónes obtenidas por id', { bedroom });
    return bedroom;
  } catch (error) {
    console.error('Error al obtener la habitación', error);

    return null;
  }
};
