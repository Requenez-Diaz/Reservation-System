'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';

export const createTestimonial = async (formData: FormData) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      throw new Error('Usuario no autenticado');
    }

    const userId = session.user.id;

    const name = formData.get('name') as string;
    const rating = formData.get('rating') as string;
    const comment = formData.get('comment') as string;
    const location = formData.get('location') as string;

    const missingFields: string[] = [];
    if (!name) {
      missingFields.push('name');
    }
    if (!rating) {
      missingFields.push('rating');
    }
    if (!comment) {
      missingFields.push('comment');
    }
    if (!location) {
      missingFields.push('location');
    }

    if (missingFields.length > 0) {
      throw new Error(
        `Campos requeridos faltantes: ${missingFields.join(', ')}`
      );
    }

    const ratingNumber = Number.parseInt(rating);
    if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
      throw new Error('La calificación debe ser un número entre 1 y 5');
    }

    const testimonial = await prisma.testimonials.create({
      data: {
        name: name.trim(),
        rating: ratingNumber,
        comment: comment.trim(),
        location: location.trim(),
        avatar: '/placeholder.svg?height=40&width=40',
        isApproved: false,
        User: {
          connect: { id: Number.parseInt(userId) }
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
      message: 'Testimonial creado exitosamente'
    };
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
};

// Función para obtener habitaciones
export const getBedrooms = async () => {
  try {
    const bedrooms = await prisma.bedrooms.findMany({
      select: { id: true, typeBedroom: true, description: true },
      orderBy: { typeBedroom: 'asc' }
    });

    return { success: true, bedrooms };
  } catch (error) {
    console.error('Error fetching bedrooms:', error);
    return { success: false, error: 'Error al obtener habitaciones' };
  }
};

// Función para obtener el usuario actual
export const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return { success: false, error: 'Usuario no autenticado' };
    }

    const user = await prisma.user.findUnique({
      where: { id: Number.parseInt(session.user.id) },
      select: { id: true, username: true, email: true }
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

// Obtener testimoniales
export const getTestimonials = async (limit?: number) => {
  try {
    const testimonials = await prisma.testimonials.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' },
      ...(limit && { take: limit }),
      include: { User: { select: { id: true, username: true, email: true } } }
    });

    return { success: true, testimonials };
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return { success: false, error: 'Error al obtener testimoniales' };
  }
};

// Obtener testimoniales de un usuario específico
export const getTestimonialsByUser = async (userId: number) => {
  try {
    const testimonials = await prisma.testimonials.findMany({
      where: { userId, isApproved: true },
      orderBy: { createdAt: 'desc' },
      include: { User: { select: { id: true, username: true, email: true } } }
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
