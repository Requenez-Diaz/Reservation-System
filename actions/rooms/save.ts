import { formaData } from '../../src/lib/utils';
'use server';

export const saveRoom = async (formData: FormData) => {
  console.log('saveRoom:', formData);

  //aqui va el codigo relacionado con la base de datos

  return {
    message: 'success',
    code: 200,
    data: {
      id: 1,
      name: 'Room 1',
      description: 'This is the first room',
      price: 100,
      beds: 2,
      maxGuests: 4,
      photos: [
        'https://images.unsplash.com/photo-1584308971821-9b7f8e8a5f1b',
        'https://images.unsplash.com/photo-1584308971821-9b7f8e8a5f1b',
        'https://images.unsplash.com/photo-1584308971821-9b7f8e8a5f1b',
        'https://images.unsplash.com/photo-1584308971821-9b7f8e8a5f1b'
      ]
    }
  };
};
