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
    role: z.enum(['USER', 'ADMIN'])
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
      role: formData.get('role')
    });
    const hashedPassword = await hash(rawFormUser.password, 10);

    const user = await prisma.user.create({
      data: {
        email: rawFormUser.email,
        username: rawFormUser.username,
        password: hashedPassword,
        roleId: rawFormUser.role === 'ADMIN' ? 1 : 2
      }
    });

    return user;
  } catch (error) {
    console.error('Error saving user:', error);
  }
};
