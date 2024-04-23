import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const bedrooms = await db.bedrooms.findMany()
        return NextResponse.json(bedrooms)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status: 500,
                }
            );
        }
    }


}

export async function POST(request: Request) {
    try {
        const { typeBedroom, description, lowSeasonPrice, highSeasonPrice, status, numberBedroom } = await request.json();

        const newBedrooms = await db.bedrooms.create({
            data: {
                typeBedroom,
                description,
                lowSeasonPrice,
                highSeasonPrice,
                status,
                numberBedroom,
            },
        });


        return NextResponse.json(newBedrooms);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status: 500,
                }
            );
        }

    }
}