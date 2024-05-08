'use server';

import { db } from '@/lib/db';

export const bookingsForms = async (request: FormData) => {
  console.log('saveRoom:', request);

  //aqui va el codigo relacionado con la base de datos

  db.bookings('bookings').add({
    
  });
};
