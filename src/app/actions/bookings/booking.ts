'use server';

import prisma from "@/lib/db";
import { BookingsStatus } from "@prisma/client";

export const bookingsForms = async (request: FormData) => {
  console.log('saveRoom:', request);

  // Aquí va el código relacionado con la base de datos

  const newBooking = await prisma.bookings.create({
    data: {
      clientId: Number((request.get('clientId') as string)),
      status: request.get('status') as BookingsStatus,
    }
  });
};