'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import prisma from '@/lib/db';
import { randomUUID } from 'crypto';

const ForgotPasswordSchema = z.object({
  email: z.string().email('Email inválido')
});

const ResetPasswordSchema = z.object({
  token: z.string().min(1, 'Token es requerido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
});

// Configuración SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendPasswordResetEmail({
  to,
  resetUrl,
  userName
}: {
  to: string;
  resetUrl: string;
  userName?: string;
}) {
  const html = `
    <h2>Hola ${userName || 'usuario'},</h2>
    <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
    <a href="${resetUrl}" style="color: blue;">${resetUrl}</a>
    <p>Este enlace expirará en 1 hora.</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: 'Restablece tu contraseña',
      html
    });

    return { success: true };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { success: false, error };
  }
}

export async function requestPasswordReset(email: string) {
  try {
    const validatedData = ForgotPasswordSchema.parse({ email });

    const user = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });

    if (!user) {
      return {
        success: false,
        message: 'Este correo no está registrado en el sistema.'
      };
    }

    // Eliminar tokens anteriores usados
    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
        used: true
      }
    });

    //Eliminar tokens no usados
    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
        used: false
      }
    });

    // Generar nuevo token
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt
      }
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

    const emailResult = await sendPasswordResetEmail({
      to: user.email,
      resetUrl,
      userName: user.username || undefined
    });

    if (emailResult.success) {
      return {
        success: true,
        message: 'Te hemos enviado un enlace de recuperación a tu correo.'
      };
    }

    return {
      success: false,
      message: 'Hubo un error al enviar el email. Intenta de nuevo más tarde.'
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
      message: 'Hubo un error al procesar tu solicitud. Intenta de nuevo.'
    };
  }
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    const validatedData = ResetPasswordSchema.parse({
      token,
      password: newPassword
    });

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

    if (resetToken.used) {
      return {
        success: false,
        message: 'Este token ya ha sido utilizado.'
      };
    }

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

    await prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { used: true }
    });

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
