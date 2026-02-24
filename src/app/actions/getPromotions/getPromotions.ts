'use server';

import prisma from '@/lib/db';

export async function getPromotions() {
  try {
    const promotions = await prisma.promotions.findMany({
      include: {
        seasons: true,
        BedroomsPromotions: {
          include: {
            bedroom: {
              include: {
                galleryImages: true,
                TypeBedrooms: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const safeData = JSON.parse(JSON.stringify(promotions));
    return { success: true, data: safeData };
  } catch (error) {
    console.error('Error al obtener promociones:', error);
    return { success: false, data: [] };
  }
}
