// @/app/actions/get-bedrooms.ts
'use server';

import prisma from '@/lib/db';

export const getAllBedrooms = async () => {
  try {
    const bedrooms = await prisma.bedrooms.findMany({
      where: {
        status: true
      },
      include: {
        // Quitamos el filtro exacto de dateStart para que el
        // calendario pueda mostrar disponibilidad real
        ReservationDetails: true,
        galleryImages: {
          select: {
            fileName: true,
            mimeType: true,
            imageContent: true
          }
        },
        Seasons: true,
        TypeBedrooms: true // Relación necesaria para el nombre del tipo
      }
    });

    console.log('Habitaciones obtenidas con éxito');
    return bedrooms;
  } catch (error) {
    console.error('Error al obtener las habitaciones:', error);
    return [];
  }
};
