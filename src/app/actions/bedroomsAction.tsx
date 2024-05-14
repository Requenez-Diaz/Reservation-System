'use server';

import prisma from '@/lib/db';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBedrooms(formData: FormData) {
  const typeBedroom = formData.get('typeBedroom')?.toString();
  const description = formData.get('description')?.toString();
  const lowSeasonPrice = Number(formData.get('lowSeasonPrice'));
  const highSeasonPrice = Number(formData.get('highSeasonPrice'));
  const numberBedroom = Number(formData.get('numberBedroom'));
  const seasons = formData.get('seasons')?.toString();
  const active = formData.get('status') === '1';

  // if (!typeBedroom || !description || !lowSeasonPrice || !highSeasonPrice || !numberBedroom || !seasons) {
  //   return;
  // }

  try {
    const newBedroom = await prisma.bedrooms.create({
      data: {
        typeBedroom: typeBedroom ?? '',
        description: description ?? '',
        lowSeasonPrice: lowSeasonPrice,
        highSeasonPrice: highSeasonPrice,
        numberBedroom: numberBedroom,
        status: active,
        seasons: {
          create: {
            nameSeason: seasons ?? '',
            dateStart: new Date(),
            dateEnd: new Date()
          }
        }
      }
    });    

    redirect('/bedrooms');
    
  } catch (error) {
    console.log("Error creating bedroom:", error);
  }
  
}


export async function updateBedrooms(formData: FormData) {
  const id = formData.get('id')?.toString();
  const typeBedroom = formData.get('typeBedroom')?.toString();
  const description = formData.get('description')?.toString();
  const lowSeasonPrice = Number(formData.get('lowSeasonPrice'));
  const highSeasonPrice = Number(formData.get('highSeasonPrice'));
  const numberBedroom = Number(formData.get('numberBedroom'));
  const seasons = formData.get('seasons')?.toString();
  const active = formData.get('status') === '1';

  if (!id || !typeBedroom || !description || !lowSeasonPrice || !highSeasonPrice || !numberBedroom || !seasons) {
    return;
  }

  await prisma.bedrooms.update({
    where: {
      id: parseInt(id)
    },
    data: {
      typeBedroom: typeBedroom,
      description: description,
      lowSeasonPrice: lowSeasonPrice,
      highSeasonPrice: highSeasonPrice,
      numberBedroom: numberBedroom,
      status: active,
      seasons: {
        update: {
          nameSeason: seasons,
          dateStart: new Date(),
          dateEnd: new Date()
        }
      }
    }
  });
  revalidatePath('/bedrooms');
  redirect('/bedrooms');
}

export async function deleteBedrooms(formData: FormData) {
  const bedroomsId = formData.get('id')?.toString();
  if (!bedroomsId) {
    return;
  }
  await prisma.bedrooms.delete({
    where: {
      id: parseInt(bedroomsId)
    },
  });
  revalidatePath('/bedrooms');
}