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
        },
        BedroomImages: {
          select: {
            fileName: true,
            mimeType: true,
            imageContent: true
          }
        }
      }
    });
    // bedrooms.forEach((bedroom) => {
    //   console.log('imagen de la habitacion ', bedroom.image);
    // });

    console.log('Habitaciónes obtenidas', { bedrooms });
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
      },
      include: {
        bookingsDetails: true,
        BedroomImages: true
      }
    });
    console.log('Habitaciónes obtenidas por id', { bedroom });
    return bedroom;
  } catch (error) {
    console.error('Error al obtener la habitación', error);

    return null;
  }
};
