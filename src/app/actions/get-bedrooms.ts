'use server';

import prisma from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache'; // Importar noStore

export const getAllBedrooms = async () => {
  noStore(); // Esto deshabilita el caché para esta función específica
  try {
    const bedrooms = await prisma.bedrooms.findMany({
      // ... resto de tu código igual
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
