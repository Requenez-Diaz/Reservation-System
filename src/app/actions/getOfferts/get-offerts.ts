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

    const sanitizedData = JSON.parse(JSON.stringify(promotions));

    console.log('Promociones encontradas:', sanitizedData.length);
    return { success: true, data: sanitizedData };
  } catch (error) {
    console.error('Error al obtener promociones:', error);
    return { success: false, error: 'Error al obtener promociones', data: [] };
  }
}

export async function getPromotion(id: number) {
  if (!id) {
    return { success: false, error: 'ID no válido' };
  }

  try {
    const promotion = await prisma.promotions.findUnique({
      where: { id: Number(id) },
      include: {
        Seasons: true,
        BedroomsPromotions: {
          include: {
            Bedrooms: true
          }
        }
      }
    });

    if (!promotion) {
      return { success: false, error: 'Promoción no encontrada' };
    }

    const sanitizedPromotion = JSON.parse(JSON.stringify(promotion));
    return { success: true, data: sanitizedPromotion };
  } catch (error) {
    console.error('Error al obtener promoción:', error);
    return { success: false, error: 'Error al obtener promoción' };
  }
}
