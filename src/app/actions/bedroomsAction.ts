'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "../../lib/db";


const BedroomsSchema = z.object({
    typeBedroom: z.string().min(5,),
    description: z.string().min(10,),
    lowSeasonPrice: z.number().min(3,),
    highSeasonPrice: z.number().min(3,),
    status: z.enum(["0", "1"],),
    numberBedroom: z.number().min(2,),
});

export const saveBedrooms = async (prevSave: any, formData: FormData) => {
    const data = {
        typeBedroom: formData.get('typeBedroom') as string,
        description: formData.get('description') as string,
        lowSeasonPrice: Number(formData.get('lowSeasonPrice')),
        highSeasonPrice: Number(formData.get('highSeasonPrice')),
        numberBedroom: Number(formData.get('numberBedroom')),
        status: formData.get('status') as "0" | "1",
    };

    const validateFields = BedroomsSchema.safeParse(data);


    if (!validateFields.success) {
        return {
            Error: validateFields.error.flatten().fieldErrors,
        };
    }

    try {
        await db.bedrooms.create({ data: { ...data, status: data.status === "1" } });
        console.log("Success");
    } catch (error) {
        return {
            message: "Error al guardar la habitacion",
        };
    }

    revalidatePath("/bedrooms");
    redirect("/bedrooms");

};

export const getBedrooms = async () => {
    try {
        const bedrooms = await db.bedrooms.findMany();
        return bedrooms;
    } catch (error) {
        console.error("Error al obtener las habitaciones", error);
        return [];
    }
};

export const getBedroomsById = async (id: Number) => {
    try {
        const bedrooms = await db.bedrooms.findUnique({
            where: { id: Number(id) }
        });
        return bedrooms;
    } catch (error) {
        throw new Error("Error al obtener la habitacion");
    }
};

export const updateBedrooms = async (
    id: Number,
    prevSate: any,
    formData: FormData
) => {
    const data = {
        typeBedroom: formData.get('typeBedroom') as string,
        description: formData.get('description') as string,
        lowSeasonPrice: Number(formData.get('lowSeasonPrice')),
        highSeasonPrice: Number(formData.get('highSeasonPrice')),
        numberBedroom: Number(formData.get('numberBedroom')),
        status: formData.get('status') as "0" | "1",
    };

    const validateFields = BedroomsSchema.safeParse(data);

    if (!validateFields.success) {
        console.log('Validation failed', validateFields.error.flatten().fieldErrors);
        return {
            Error: validateFields.error.flatten().fieldErrors,
        };
    }

    try {
        console.log('Updating bedroom with id', id, 'and data', validateFields.data);
        await db.bedrooms.update({
            data: {
                typeBedroom: validateFields.data.typeBedroom,
                description: validateFields.data.description,
                lowSeasonPrice: validateFields.data.lowSeasonPrice,
                highSeasonPrice: validateFields.data.highSeasonPrice,
                numberBedroom: validateFields.data.numberBedroom,
                status: validateFields.data.status === "1",
            },
            where: { id: Number(id)},
        });
        console.log('Update successful');
    } catch (error) {
        return {
            message: "Error al actualizar la habitacion",
        };        
    }

    revalidatePath("/bedrooms");
    redirect("/bedrooms");

};

export const deleteBedrooms = async (id: Number) => {
    try {
        await db.bedrooms.delete({
            where: { id: Number(id) }
        });
        revalidatePath("/bedrooms");
        redirect("/bedrooms");
    } catch (error) {
        return { message: "Error al eliminar la habitacion"}
    }

};