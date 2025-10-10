'use server';

import { getServerSession } from 'next-auth';
import prisma from '@/lib/db';
import { authOptions } from '@/lib/auth';

export interface ProfileData {
  username: string;
  email: string;
}

interface ProfileActionResult {
  success: boolean;
  data?: ProfileData;
  error?: string;
}

export async function getProfileData(): Promise<ProfileActionResult> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return {
        success: false,
        error: 'No autorizado: Sesión no encontrada.'
      };
    }

    const userId = Number(session.user.id);

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        username: true,
        email: true
      }
    });

    if (!user) {
      return {
        success: false,
        error: 'Usuario no encontrado.'
      };
    }

    return {
      success: true,
      data: {
        username: user.username || '',
        email: user.email || ''
      }
    };
  } catch (error) {
    console.error('Error al obtener datos del perfil:', error);
    return {
      success: false,
      error: 'Error interno al obtener datos del perfil.'
    };
  }
}

export async function updateProfileData(
  data: ProfileData
): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return { success: false, error: 'No autorizado: Sesión no encontrada.' };
    }

    const userId = Number(session.user.id);

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        username: data.username,
        email: data.email
      }
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'Error interno al actualizar datos del perfil.'
    };
  }
}
