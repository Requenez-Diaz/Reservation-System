'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { sendPasswordResetEmail } from '@/lib/email';
import prisma from '@/lib/db';

const ForgotPasswordSchema = z.object({
  email: z.string().email('Email inválido')
});

const ResetPasswordSchema = z.object({
  token: z.string().min(1, 'Token es requerido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
});

export async function requestPasswordReset(email: string) {
  try {
    // Validar el email
    const validatedData = ForgotPasswordSchema.parse({ email });

    const user = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });
    if (!user) {
      console.log(validatedData.email);
      return {
        success: true,
        message:
          'Si el email existe en nuestro sistema, recibirás un enlace de recuperación.'
      };
    }

    // Generar un token único
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    // Guardar el token en la base de datos
    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt
      }
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/reset-password?token=${token}`;

    const emailResult = await sendPasswordResetEmail({
      to: user.email,
      resetUrl,
      userName: user.username || undefined
    });

    if (!emailResult.success) {
      return {
        success: true,
        message:
          'Si el email existe en nuestro sistema, recibirás un enlace de recuperación.'
      };
    } else {
      return {
        success: false,
        message: 'Hubo un error al enviar el email. Intenta de nuevo más tarde.'
      };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message
      };
    }

    return {
      success: false,
      message: 'Hubo un error al procesar tu solicitud. Intenta de nuevo.'
    };
  }
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    // Validar los datos
    const validatedData = ResetPasswordSchema.parse({
      token,
      password: newPassword
    });

    // Buscar el token en la base de datos
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token: validatedData.token },
      include: { User: true }
    });

    if (!resetToken) {
      return {
        success: false,
        message: 'El token de recuperación no es válido o ha expirado.'
      };
    }

    // Verificar si el token ya fue usado
    if (resetToken.used) {
      return {
        success: false,
        message: 'Este token ya ha sido utilizado.'
      };
    }

    // Verificar si el token ha expirado
    if (new Date() > resetToken.expiresAt) {
      await prisma.passwordResetToken.delete({
        where: { id: resetToken.id }
      });
      return {
        success: false,
        message: 'El token de recuperación ha expirado. Solicita uno nuevo.'
      };
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword }
    });

    // Marcar el token como usado
    await prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { used: true }
    });

    console.log(resetToken.User.email);

    return {
      success: true,
      message: 'Tu contraseña ha sido actualizada exitosamente.'
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message
      };
    }
    return {
      success: false,
      message: 'Hubo un error al actualizar tu contraseña. Intenta de nuevo.'
    };
  }
}

export async function validateResetToken(token: string) {
  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { User: true }
    });

    if (!resetToken) {
      return {
        valid: false,
        message: 'El token no es válido.'
      };
    }

    if (resetToken.used) {
      return {
        valid: false,
        message: 'Este token ya ha sido utilizado.'
      };
    }

    if (new Date() > resetToken.expiresAt) {
      await prisma.passwordResetToken.delete({
        where: { id: resetToken.id }
      });
      return {
        valid: false,
        message: 'El token ha expirado.'
      };
    }

    return {
      valid: true,
      email: resetToken.User.email
    };
  } catch (error) {
    return {
      valid: false,
      message: 'Error al validar el token.'
    };
  }
}
