'use server';

import prisma from '@/lib/db';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

export const saveUser = async (formData: FormData) => {
  console.log('saveUser:', formData);

  const email = formData.get('email') as string;
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const role = 'user';
  const createdAt = new Date();
  const updatedAt = new Date();

  console.log({ email, username, password, role, createdAt, updatedAt });

  if (!email || !username || !password) {
    throw new Error('Todos los campos son requeridos.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Email inválido.');
  }

  if (password.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const jwt = require('jsonwebtoken');
  const generateToken = (userId: number) => {
    const payload = {
      userId,
      role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 10 * 7 // 1 week
    };

    const token = jwt.sign(
      payload,
      'secret',
      { algorithm: 'HS256' },
      { expiresIn: '7d' }
    );

    return token;
  };

  const userToken = generateToken(123);
  console.log('userToken:', userToken);

  jwt.verify(userToken, 'secret', (err: any, decoded: any) => {
    if (err) {
      console.error('Error verifying token:', err);
    } else {
      console.log('decoded:', decoded);
    }
  });

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    });

    if (existingUser) {
      throw new Error('El email o el nombre de usuario ya está en uso.');
    }
    console.log('existingUser:', existingUser);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role,
        createdAt,
        updatedAt
      }
    });

    console.log('newUser:', newUser);
    // // Redirect the user if no error occurs
    // redirect('/');

    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
