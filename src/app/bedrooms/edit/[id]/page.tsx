import { FormEditBedrooms } from '@/components/habitaciones/formEditBedrooms';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';


export default async function BedroomsPageEdit({ params }: {
    params: {
        id: string;
    }
}) {
    const bedrooms = await prisma.bedrooms.findFirst({
        where: {
            id: Number(params.id)
        }
    })

    if (!bedrooms) {
        redirect('/bedrooms');
    }

    return (
        <div className="max-w-md mx-auto mt-5">
            <h1 className="text-2xl text-center mb-2">Actualizar Habitaciones</h1>
            <FormEditBedrooms bedrooms={bedrooms} />
        </div>
    );

}


