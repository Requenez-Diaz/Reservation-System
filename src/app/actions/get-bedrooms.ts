'use server';

import prisma from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache'; // Importar noStore

export const getAllBedrooms = async () => {
  noStore();
  try {
    const bedrooms = await prisma.bedroom.findMany({
      // ... resto de tu código igual
      include: {
        ReservationDetails: {
          include: {
            Reservation: {
              select: {
                status: true
              }
            }
          }
        },
        galleryImages: {
          select: {
            id: true,
            fileName: true,
            mimeType: true,
            imageContent: true
          },
          orderBy: {
            createdAt: 'asc'
          }
        },
        Season: true,
        TypeBedrooms: true
      }
    });

    return bedrooms;
  } catch (error) {
    console.error('Error al obtener las habitaciones:', error);
    return [];
  }
};
