"use server";

import prisma from "@/lib/db";

interface Bedroom {
  id: number;
  typeBedroom: string;
  description: string;
  lowSeasonPrice: number;
  highSeasonPrice: number;
  status: boolean;
  numberBedroom: number;
  seasonsId: number;
}

export const getAllBedrooms = async (): Promise<Bedroom[]> => {
  try {
    const bedrooms = await prisma.bedrooms.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return bedrooms;
  } catch (error) {
    console.error("Error getting bedrooms:", error);
    return [];
  }
};
