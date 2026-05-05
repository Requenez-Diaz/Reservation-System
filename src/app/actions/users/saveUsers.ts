'use server';

import prisma from '@/lib/db';
import { hash } from 'bcrypt';
import { z } from 'zod';

const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email')
      .refine((email) => email === email.toLowerCase(), {
        message: 'El email no debe contener mayúsculas',
        path: ['email']
      }),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
    role: z.enum(['User', 'Admin'])
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match'
  });

export const saveUsers = async (formData: FormData) => {
  try {
    const rawFormUser = FormSchema.parse({
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      role: 'User'
    });
    const hashedPassword = await hash(rawFormUser.password, 10);

    // Validate if the email or username exists
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [
          { email: rawFormUser.email },
          { username: rawFormUser.username }
        ]
      }
    });

    if (userExists) {
      if (userExists.email === rawFormUser.email) {
        throw new Error('Email already exists');
      }
      if (userExists.username === rawFormUser.username) {
        throw new Error('Username already exists');
      }
    }

    const user = await prisma.user.create({
      data: {
        email: rawFormUser.email,
        username: rawFormUser.username,
        password: hashedPassword,
        roleName: 'User',
        updatedAt: new Date()
      }
    });

    return user;
    } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { error: message };
  }
};

export async function getUsers(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true
      }
    });

    if (!user) {
      return { success: false, error: 'Usuario no encontrado' };
    }

    console.log({ user }, 'user Getting');
    return { success: true, data: user };
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return { success: false, error: 'Error al obtener usuario' };
  }
}
