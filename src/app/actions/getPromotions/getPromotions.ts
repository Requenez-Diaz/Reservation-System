'use server';

import prisma from '@/lib/db';

export async function getPromotions() {
  try {
    const promotions = await prisma.promotions.findMany({
      include: {
        // CAMBIO 1: Debe ser "seasons" en minúscula según tu modelo
        seasons: true,
        BedroomsPromotions: {
          include: {
            bedroom: {
              include: {
                // CAMBIO 2: Cargamos galleryImages para tener acceso a la imagen real
                galleryImages: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Serialización segura
    const safeData = JSON.parse(JSON.stringify(promotions));
    return { success: true, data: safeData };
  } catch (error) {
    console.error('Error al obtener promociones:', error);
    return { success: false, data: [] };
  }
}
