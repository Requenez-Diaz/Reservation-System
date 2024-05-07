import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import * as z from 'zod';
import prisma from '@/lib/db';

// Define a schema for input validation
const userShema = z.object({
  username: z.string().min(1, 'Username is required').max(100),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userShema.parse(body);

    console.log(body, email, username, password);

    // Check if email already exists
    const existingUserByEmail = await prisma.users.findUnique({
      where: { email: email }
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: 'el email ya existe' },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUserByUsername = await prisma.users.findUnique({
      where: { username: username }
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: 'Nombre de usuario ya existe' },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: 'USER'
      }
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: 'Usuario creado con éxito' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: '¡Algo salió mal!' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const data = await prisma.users.findMany();
  NextResponse.json({ message: 'GET request' });
  return NextResponse.json(data, { status: 200 });
}
