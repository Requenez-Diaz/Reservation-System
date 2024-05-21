'use server';

import prisma from '@/lib/db';
import { hash } from 'bcrypt';

export const saveUsers = async (formData: FormData) => {
  const rawFormUser = {
    email: formData.get('email') as string,
    username: formData.get('username') as string,
    password: formData.get('password') as string,
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  if (!rawFormUser.email || !rawFormUser.username || !rawFormUser.password) {
    return { error: 'Todos los campos son obligatorios.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(rawFormUser.email)) {
    return { error: 'El email no es válido.' };
  }

  if (rawFormUser.password.length < 6) {
    return {
      error: 'La contraseña debe tener al menos 6 caracteres.'
    };
  }

  const hashedPassword = await hash(rawFormUser.password, 10);
  rawFormUser.password = hashedPassword;

  try {
    const user = await prisma.user.create({
      data: {
        email: rawFormUser.email,
        username: rawFormUser.username,
        password: rawFormUser.password,
        role: rawFormUser.role,
        createdAt: rawFormUser.createdAt,
        updatedAt: rawFormUser.updatedAt
      }
    });

    return user;
  } catch (error) {
    console.error('Error saving user:', error);
  }
};
