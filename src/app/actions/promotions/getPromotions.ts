'use server';

import prisma from '@/lib/db';

export async function getPromotions() {
  try {
    const now = new Date();

    const promotions = await prisma.promotions.findMany({
      where: {
        // Si quieres ver TODO para probar, comenta estas 3 líneas:
        dateEnd: {
          gte: now
        }
      },
      include: {
        Seasons: true,
        BedroomsPromotions: {
          include: {
            Bedrooms: true
            // Quitamos "Promotions: true" aquí porque es redundante
            // y puede causar una carga circular innecesaria
          }
        }
      }
    });

    console.log('Promociones encontradas:', promotions.length);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(promotions)) // Evita errores de serialización de fechas en Next.js
    };
  } catch (error) {
    console.error('Error detallado:', error);
    return { success: false, error: 'Error fetching promotions', data: [] };
  }
}
