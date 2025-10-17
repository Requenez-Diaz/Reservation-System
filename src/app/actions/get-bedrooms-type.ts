'use server';

import prisma from '@/lib/db';

/**
 * Obtiene el tipo de habitación por ID
 * @param bedroomId - ID de la habitación
 * @returns El tipo de habitación o null si no existe
 */
export const getBedroomTypeById = async (bedroomId: number) => {
  try {
    const bedroom = await prisma.bedrooms.findUnique({
      where: {
        id: bedroomId,
        status: true
      },
      select: {
        typeBedroom: true
      }
    });

    return bedroom?.typeBedroom || null;
  } catch (error) {
    console.error('Error al obtener el tipo de habitación:', error);
    return null;
  }
};

/**
 * Obtiene información completa de una habitación por su tipo
 * @param bedroomType - Tipo de habitación (ej: "Suite", "Doble")
 * @returns La primera habitación que coincida con ese tipo
 */
export const getBedroomByType = async (bedroomType: string) => {
  try {
    const bedroom = await prisma.bedrooms.findFirst({
      where: {
        typeBedroom: bedroomType,
        status: true
      }
    });

    return bedroom;
  } catch (error) {
    console.error('Error al obtener la habitación por tipo:', error);
    return null;
  }
};
