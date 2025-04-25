'use server';

import prisma from '@/lib/db';

export async function getBedrooms() {
  try {
    const bedrooms = await prisma.bedrooms.findMany();

    // Mapear los datos de la base de datos al formato que espera el componente
    const formattedBedrooms = bedrooms.map((bedroom) => ({
      id: bedroom.id,
      type: bedroom.typeBedroom,
      description: bedroom.description || ''
    }));

    console.log('Bedrooms fetched successfully:', formattedBedrooms.length);
    return { success: true, data: formattedBedrooms };
  } catch (error) {
    console.error('Error fetching bedrooms:', error);
    return { success: false, data: [], error: 'Error al obtener habitaciones' };
  }
}
