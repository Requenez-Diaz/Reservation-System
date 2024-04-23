import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

interface Params {
    params: { id: string }
}

export async function GET(request: Request, { params }: Params) {
    try {
        const bedrooms = await db.bedrooms.findFirst({
            where: {
                id: Number(params.id),
            },
        });
        if (!bedrooms)
            return NextResponse.json({ message: "Habitacion no encontrada" })

        return NextResponse.json(bedrooms);

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status: 500
                }
            )
        }

    }

}

export async function DELETE(request: Request, { params }: Params) {
    try {
        const deleteBedrooms = await db.bedrooms.delete({
            where: {
                id: Number(params.id),
            },
        });

        if (!deleteBedrooms)
            return NextResponse.json({ message: "Habitacion no encontrada" }, {
                status:
                    404
            });

        return NextResponse.json(deleteBedrooms);
    } catch (error) {
        console.log(error)
        if (error instanceof Prisma.PrismaClientKnownRequestError) {

            if (error.code === "P2025") {
                return NextResponse.json(
                    {
                        message: "Habitacion no encontrada"
                    },
                    {
                        status: 404
                    }
                );
            }
            return NextResponse.json(
                {
                    message: error.message
                },
                {
                    status: 500
                }
            )
        }

    }
}

export async function PUT(request: Request, { params }: Params) {
    const { typeBedroom, description, lowSeasonPrice, highSeasonPrice, status, numberBedroom } = await request.json()

   try {
    const updateBedrooms = await db.bedrooms.update({
        where: {
            id: Number(params.id)
        },
        data: {
            typeBedroom,
            description,
            lowSeasonPrice,
            highSeasonPrice,
            status,
            numberBedroom,
        },
    });
    return NextResponse.json(updateBedrooms)
   } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {

        if (error.code === "P2025") {
            return NextResponse.json(
                {
                    message: "Habitacion no encontrada"
                },
                {
                    status: 404
                }
            );
        }
        return NextResponse.json(
            {
                message: error.message
            },
            {
                status: 500
            }
        )
    }
    
   }
}
