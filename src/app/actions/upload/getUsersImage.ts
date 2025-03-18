'use server';

import { getServerSession } from 'next-auth';
import prisma from '@/lib/db';
import { authOptions } from '@/lib/auth';

export async function getUserImage() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return {
        success: false,
        error: 'No autorizado'
      };
    }

    const userId = Number(session.user.id);

    const userImage = await prisma.userImage.findFirst({
      where: {
        userId: userId
      },
      orderBy: {
        id: 'desc'
      }
    });

    if (!userImage?.image) {
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        },
        select: {
          image: true
        }
      });

      if (user?.image) {
        return {
          success: true,
          image: user.image
        };
      }

      return {
        success: false,
        error: 'No se encontró ninguna imagen para este usuario'
      };
    }

    return {
      success: true,
      image: userImage.image
    };
  } catch (error) {
    console.error('Error al obtener la imagen del usuario:', error);
    return {
      success: false,
      error: 'Error al obtener la imagen del usuario'
    };
  }
}

export async function getUserImageById(userId: number) {
  try {
    if (!userId) {
      return {
        success: false,
        error: 'ID de usuario no proporcionado'
      };
    }

    const userImage = await prisma.userImage.findFirst({
      where: {
        userId: userId
      },
      orderBy: {
        id: 'desc'
      }
    });

    if (!userImage?.image) {
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        },
        select: {
          image: true
        }
      });

      if (user?.image) {
        return {
          success: true,
          image: user.image
        };
      }

      return {
        success: false,
        error: 'No se encontró ninguna imagen para este usuario'
      };
    }

    return {
      success: true,
      image: userImage.image
    };
  } catch (error) {
    console.error('Error al obtener la imagen del usuario:', error);
    return {
      success: false,
      error: 'Error al obtener la imagen del usuario'
    };
  }
}
