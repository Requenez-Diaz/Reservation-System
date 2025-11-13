'use server';

import prisma from '@/lib/db';

export const getAllComments = async () => {
  try {
    const comments = await prisma.comments.findMany({
      include: {
        User: true,
        Bedrooms: true
      }
    });

    console.log('Comentarios', comments);

    return comments;
  } catch (error) {
    console.error('Error al obtener los comentarios', error);

    return [];
  }
};
