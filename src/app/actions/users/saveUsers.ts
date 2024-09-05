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
      confirmPassword: formData.get('confirmPassword')
    });

    console.log('rawFormUser:', rawFormUser);
    const hashedPassword = await hash(rawFormUser.password, 10);

    // Verificar si el rol "User" existe
    const userRole = await prisma.role.findUnique({
      where: {
        roleName: 'User' // Asegúrate de que este nombre coincida con el que tienes en la base de datos
      }
    });

    if (!userRole) {
      throw new Error('Role "User" does not exist in the database.');
    }

    const user = await prisma.user.create({
      data: {
        email: rawFormUser.email,
        username: rawFormUser.username,
        password: hashedPassword,
        roleName: userRole.roleName // Asigna el roleName correspondiente al rol "User"
      }
    });

    return user;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error; // Vuelve a lanzar el error para manejarlo más arriba si es necesario
  }
};
