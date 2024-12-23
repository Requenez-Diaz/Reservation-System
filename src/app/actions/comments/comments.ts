'use server';

import prisma from '@/lib/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';
import { Prisma } from '@prisma/client';

export const createComment = async (formData: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    console.log('Session:', session);

    if (!session || !session.user || !session.user.id) {
      console.log('Authentication failed:', { session });
      throw new Error('User not authenticated');
    }

    const userId = session.user.id;
    console.log('User ID:', userId);

    const rating = formData.get('rating');
    const comments = formData.get('comment');
    const content = formData.get('content');
    const bedroomsId = formData.get('bedroomId');

    if (!rating || !comments || !content) {
      throw new Error('Missing required fields');
    }

    const commentData: Prisma.CommentsCreateInput = {
      comments: comments as string,
      content: content as string,
      rating: parseInt(rating as string),
      User: {
        connect: {
          id: parseInt(userId)
        }
      }
    };

    if (bedroomsId) {
      commentData.Bedrooms = {
        connect: {
          id: parseInt(bedroomsId as string)
        }
      };
    }

    const comment = await prisma.comments.create({
      data: commentData,
      include: {
        User: true,
        Bedrooms: true
      }
    });

    console.log('Created comment:', comment);

    return { success: true, comment };
  } catch (error) {
    console.error('Error creating comment:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma error code:', error.code);
      console.error('Prisma error message:', error.message);
    }
    return { success: false, error: (error as Error).message };
  }
};
