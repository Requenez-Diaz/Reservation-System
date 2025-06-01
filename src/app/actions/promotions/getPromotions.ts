'use server';

import prisma from '@/lib/db';

export default async function getPromotions() {
  try {
    const getAllPromotions = await prisma.promotions.findMany({
      include: {
        Seasons: true,
        BedroomsPromotions: {
          include: {
            Bedrooms: true,
            Promotions: true
          }
        }
      }
    });

    return { success: true, data: getAllPromotions };
  } catch (error) {
    console.error('Error al obtener promociones', error);
    return [];
  }
}
