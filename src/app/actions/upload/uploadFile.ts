'use server';

import prisma from '@/lib/db';

export const UploadFile = async (userId: number, imageBase64: string) => {
  try {
    await prisma.userImage.upsert({
      where: {
        id: userId
      },
      update: {
        image: imageBase64
      },
      create: {
        userId: userId,
        image: imageBase64
      }
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to upload image' };
  }
};
