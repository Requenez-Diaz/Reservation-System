'use server';

import prisma from '@/lib/db';

export async function getPromotions() {
  try {
    const promotions = await prisma.promotions.findMany({
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
    console.log('Promotions:', promotions);
    return { success: true, data: promotions };
  } catch (error) {
    throw new Error('Error fetching promotions');
    return [];
  }
}
