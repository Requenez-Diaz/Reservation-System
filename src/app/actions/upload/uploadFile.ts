'use server';

import prisma from '@/lib/db';

export const UploadFile = async (userId: number, imageBase64: string) => {
  try {
    // Validate inputs
    if (!userId || !imageBase64) {
      return { success: false, error: 'Missing required parameters' };
    }

    if (!imageBase64.startsWith('data:image/')) {
      return { success: false, error: 'Invalid image format' };
    }

    const approximateSizeInBytes = (imageBase64.length * 3) / 4;
    const maxSizeInBytes = 5 * 1024 * 1024; 

    if (approximateSizeInBytes > maxSizeInBytes) {
      return { success: false, error: 'Image is too large (max 5MB)' };
    }

    // Primero, busca si ya existe una imagen para este usuario
    const existingImage = await prisma.userImage.findFirst({
      where: {
        userId: userId
      }
    });

    if (existingImage) {
      await prisma.userImage.update({
        where: {
          id: existingImage.id
        },
        data: {
          image: imageBase64
        }
      });
    } else {
      // Si no existe, crea una nueva entrada
      await prisma.userImage.create({
        data: {
          userId: userId,
          image: imageBase64
        }
      });
    }

    // También actualiza el campo image en el modelo User (opcional)
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        image: imageBase64
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, error: 'Failed to upload image' };
  }
};
