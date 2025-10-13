'use server';

import { getServerSession } from 'next-auth';
import prisma from '@/lib/db';
import { authOptions } from '@/lib/auth';
import * as bcrypt from 'bcryptjs'; // Importamos bcrypt

interface PasswordChangeResult {
  success: boolean;
  error?: string;
}

/**
 * Cambia la contraseña del usuario actual.
 * @param currentPassword La contraseña actual del usuario.
 * @param newPassword La nueva contraseña que se desea establecer.
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<PasswordChangeResult> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return { success: false, error: 'No autorizado: Sesión no encontrada.' };
    }

    const userId = Number(session.user.id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true }
    });

    if (!user) {
      return { success: false, error: 'Usuario no encontrado.' };
    }

    if (!user.password) {
      return {
        success: false,
        error:
          'Tu cuenta no tiene una contraseña local establecida. Debes usar el método de inicio de sesión original.'
      };
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return { success: false, error: 'La contraseña actual es incorrecta.' };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    return { success: true };
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    return {
      success: false,
      error: 'Error interno al procesar el cambio de contraseña.'
    };
  }
}
