'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';

/**
 * CREAR TESTIMONIAL
 */
export const createTestimonial = async (formData: FormData) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Debes iniciar sesión para publicar un testimonio'
      };
    }

    const userId = session.user.id;

    const name = formData.get('name') as string;
    const rating = formData.get('rating') as string;
    const comment = formData.get('comment') as string;
    const location = formData.get('location') as string;

    if (!name || !rating || !comment || !location) {
      return { success: false, error: 'Todos los campos son obligatorios' };
    }

    const ratingNumber = Number.parseInt(rating, 10);
    if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
      return {
        success: false,
        error: 'La calificación debe ser un número entre 1 y 5'
      };
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name: name.trim(),
        rating: ratingNumber,
        comment: comment.trim(),
        location: location.trim(),
        avatar: session.user.image || '/placeholder.svg?height=40&width=40',
        isApproved: false,
        updatedAt: new Date(),
        User: {
          // Convertimos a Number explícitamente para evitar el error de tipado
          connect: { id: Number(userId) }
        }
      },
      include: {
        User: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      }
    });

    revalidatePath('/testimonials');

    return {
      success: true,
      testimonial,
      message: 'Testimonio enviado exitosamente. Pendiente de aprobación.'
    };
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error inesperado'
    };
  }
};

/**
 * OBTENER HABITACIONES
 */
export const getBedrooms = async () => {
  try {
    const bedrooms = await prisma.bedroom.findMany({
      select: {
        id: true,
        TypeBedrooms: true,
        description: true,
        numberBedroom: true
      },
      orderBy: { numberBedroom: 'asc' }
    });

    return { success: true, bedrooms };
  } catch (error) {
    console.error('Error fetching bedrooms:', error);
    return { success: false, error: 'Error al obtener habitaciones' };
  }
};

/**
 * OBTENER USUARIO ACTUAL
 */
export const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: 'Usuario no autenticado' };
    }

    const userId = session.user.id;

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { id: true, username: true, email: true, image: true }
    });

    if (!user) {
      return { success: false, error: 'Usuario no encontrado' };
    }

    return { success: true, user };
  } catch (error) {
    console.error('Error fetching current user:', error);
    return { success: false, error: 'Error al obtener datos del usuario' };
  }
};

/**
 * OBTENER TESTIMONIALES APROBADOS
 */
export const getTestimonials = async (limit?: number) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' },
      ...(limit && { take: limit }),
      include: {
        User: {
          select: {
            id: true,
            username: true,
            email: true,
            image: true
          }
        }
      }
    });

    return { success: true, testimonials };
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return { success: false, error: 'Error al obtener testimoniales' };
  }
};

/**
 * OBTENER TESTIMONIALES DE UN USUARIO (CORREGIDO SIN ANY)
 */
export const getTestimonialsByUser = async (userId: string | number) => {
  try {
    // Definimos el ID de forma segura para TypeScript
    const parsedId =
      typeof userId === 'string' ? Number.parseInt(userId, 10) : userId;

    if (isNaN(parsedId)) {
      throw new Error('El ID de usuario proporcionado no es un número válido');
    }

    const testimonials = await prisma.testimonial.findMany({
      where: {
        userId: parsedId
      },
      orderBy: { createdAt: 'desc' },
      include: {
        User: { select: { id: true, username: true, email: true, image: true } }
      }
    });

    return { success: true, testimonials };
  } catch (error) {
    console.error('Error fetching user testimonials:', error);
    return {
      success: false,
      error: 'Error al obtener testimoniales del usuario'
    };
  }
};
