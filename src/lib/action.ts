'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "./db";

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

export const obtenerHabitaciones = async () => {
    try {
        const habitaciones = await db.bedrooms.findMany();
        return habitaciones;
    } catch (error) {
        console.error("Error al obtener las habitaciones", error);
        return [];
    }
};