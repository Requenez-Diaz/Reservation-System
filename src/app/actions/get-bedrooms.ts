'use server';

import prisma from '@/lib/db';

export const getAllBedrooms = async () => {
  try {
    const bedrooms = await prisma.bedrooms.findMany({
      where: {
        status: true
      },
      include: {
        ReservationDetails: {
          where: {
            dateStart: new Date()
          }
        },

        galleryImages: {
          select: {
            fileName: true,
            mimeType: true,
            imageContent: true
          }
        },
        Seasons: true,
        TypeBedrooms: true
      }
    });

    console.log('Habitaciones obtenidas con éxito');
    return bedrooms;
  } catch (error) {
    console.error('Error al obtener las habitaciones:', error);
    return [];
  }
};
