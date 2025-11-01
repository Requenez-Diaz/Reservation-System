'use server';

import prisma from '@/lib/db';
import type { BedroomImages } from '@prisma/client';

interface GetGalleryImagesResponse {
  success: boolean;
  data?: BedroomImages[];
  error?: string;
}

export const getGalleryImages = async (
  bedroomId: number
): Promise<GetGalleryImagesResponse> => {
  try {
    if (isNaN(bedroomId)) {
      return { success: false, error: 'ID de habitación no válido.' };
    }

    const images = await prisma.bedroomImages.findMany({
      where: { bedroomId: bedroomId },
      orderBy: { createdAt: 'asc' }
    });

    return { success: true, data: images };
  } catch (error) {
    console.error('Error al obtener las imágenes de la galería:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error desconocido al obtener las imágenes.'
    };
  }
};
