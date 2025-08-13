'use server';

import prisma from '@/lib/db';

export async function getPromotions() {
  try {
    const promotions = await prisma.promotions.findMany({
      include: {
        Seasons: true,
        BedroomsPromotions: {
          include: {
            Bedrooms: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return { success: true, data: promotions };
  } catch (error) {
    console.error('Error al obtener promociones:', error);
    return { success: false, error: 'Error al obtener promociones' };
  }
}

export async function getPromotion(id: number) {
  try {
    const promotion = await prisma.promotions.findUnique({
      where: { id },
      include: {
        Seasons: true,
        BedroomsPromotions: {
          include: {
            Bedrooms: true
          }
        }
      }
    });

    console.log('Promotion fetched:', promotion);

    if (!promotion) {
      return { success: false, error: 'Promoción no encontrada' };
    }

    return { success: true, data: promotion };
  } catch (error) {
    console.error('Error al obtener promoción:', error);
    return { success: false, error: 'Error al obtener promoción' };
  }
}
