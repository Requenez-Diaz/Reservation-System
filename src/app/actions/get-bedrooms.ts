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
        ReservationDetails: true,
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

    return bedrooms;
  } catch (error) {
    console.error('Error al obtener las habitaciones:', error);
    return [];
  }
};
