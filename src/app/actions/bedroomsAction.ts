'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const saveBedrooms = async (formData: FormData) => {
  console.log('saveBedrooms', saveBedrooms);

  const typeBedroom = formData.get('typeBedroom') as string;
  const description = formData.get('description') as string;
  const lowSeasonPrice = Number(formData.get('lowSeasonPrice'));
  const highSeasonPrice = Number(formData.get('highSeasonPrice'));
  const numberBedroom = Number(formData.get('numberBedroom'));
  const seasons = formData.get('seasons') as string;
  const active = formData.get('status') === '1';

  try {
    const newBedroom = await prisma.bedrooms.create({
      data: {
        typeBedroom,
        description,
        lowSeasonPrice,
        highSeasonPrice,
        numberBedroom,
        status: active,
        seasons: {
          create: {
            nameSeason: seasons,
            dateStart: new Date(),
            dateEnd: new Date()
          }
        }
      }
    });

    console.log('Success');
  } catch (error) {
    return {
      message: 'Error al guardar la habitacion'
    };
  }

  revalidatePath('/bedrooms');
  redirect('/bedrooms');
};

export const getBedrooms = async () => {
  try {
    const bedrooms = await prisma.bedrooms.findMany();
    return bedrooms;
  } catch (error) {
    console.error('Error al obtener las habitaciones', error);
    return [];
  }
};

export const getBedroomsById = async (id: Number) => {
  try {
    const bedrooms = await prisma.bedrooms.findUnique({
      where: { id: Number(id) }
    });
    return bedrooms;
  } catch (error) {
    throw new Error('Error al obtener la habitacion');
  }
};

export const updateBedrooms = async (formData: FormData) => {
  const data = {
    typeBedroom: formData.get('typeBedroom') as string,
    description: formData.get('description') as string,
    lowSeasonPrice: Number(formData.get('lowSeasonPrice')),
    numberBedroom: Number(formData.get('numberBedroom')),
    status: formData.get('status') as '0' | '1'
  };

  try {
  } catch (error) {
    return {
      message: 'Error al actualizar la habitacion'
    };
  }

  revalidatePath('/bedrooms');
  redirect('/bedrooms');
};

export const deleteBedrooms = async (id: Number) => {
  try {
    await prisma.bedrooms.delete({
      where: { id: Number(id) }
    });
    revalidatePath('/bedrooms');
    redirect('/bedrooms');
  } catch (error) {
    return { message: 'Error al eliminar la habitacion' };
  }
};
