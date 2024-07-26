'use server';

import prisma from '@/lib/db';
import { hash } from 'bcrypt';

import { NextResponse } from 'next/server';

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
    password: z.string().min(8, 'Password must have at least 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
    roleId: z.number().int()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],

    message: 'Passwords do not match'
  });

export const saveUsers = async (formData: FormData) => {
  const users = FormSchema.parse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    roleId: formData.get('roleId')
  });

  try {
    const createdUser = await prisma.user.create({
      data: {
        username: users.username,
        email: users.email,
        password: await hash(users.password, 10),
        roleId: users.roleId
      }
    });

    console;
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'User registration failed' },
      { status: 500 }
    );
  }
};
