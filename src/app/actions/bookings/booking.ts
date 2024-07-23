'use server';

import prisma from '@/lib/db';
import { BookingsDetails } from '@prisma/client';

export const saveBookings = async (formData: FormData) => {
  try {
    const rawFormBooking = Object.fromEntries(formData);
    console.log('rawFormBooking:', rawFormBooking);
    const { status, bookingsDetails, bookingsServices, userId } =
      rawFormBooking;

    // Convertir userId a número
    const userIdNumber =
      typeof userId === 'string' ? parseInt(userId) : undefined;

    const booking = await prisma.bookings.create({
      data: {
        status: status as BookingsDetails['status'],
        created_at: new Date(),
        bookingsDetails: bookingsDetails
          ? JSON.parse(String(bookingsDetails))
          : {},
        bookingsServices: bookingsServices
          ? JSON.parse(String(bookingsServices))
          : {},
        user: {
          connect: {
            id: userIdNumber
          }
        }
      }
    });

    return booking;
  } catch (error) {
    console.error('Error saving booking:', error);
    throw error;
  }
};
