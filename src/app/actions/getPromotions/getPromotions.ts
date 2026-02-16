'use server';

import prisma from '@/lib/db';

export async function getPromotions() {
  try {
    const promotions = await prisma.promotions.findMany({
      include: {
        Seasons: true,
        BedroomsPromotions: {
          include: {
            Bedrooms: true // Aquí viene la imagen: Bedrooms.image
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Serialización para evitar errores de objetos Date en Next.js
    const safeData = JSON.parse(JSON.stringify(promotions));
    return { success: true, data: safeData };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, data: [] };
  }
}
