'use client';

import Link from 'next/link';
import TableData from '@/components/tabledata';
import { useEffect, useState } from 'react';
import { obtenerHabitaciones } from '@/lib/action';

const Page = () => {
    const [data, setData] = useState<{ id: number; typeBedroom: string; description: string; lowSeasonPrice: number; highSeasonPrice: number; status: boolean; numberBedroom: number; }[]>([]);

    useEffect(() => {
        obtenerHabitaciones()
            .then(habitaciones => setData(habitaciones));

    }, []);

    return (
        <div className='w-screen py-2 flex justify-center flex-col items-center'>
            <div className='flex items-center justify-between gap-1 mb-5'>
                <h1 className='tex-4xl font-bold'>Registar Habitaciones</h1>
            </div>
            <div className='overflow-x-auto'>
                <div className='mb-2 w-full text-right'>
                    <Link href="/bedrooms/create"
                        className='btn btn-primary'
                    >
                        Crear Habitación
                    </Link>
                </div>
                <TableData data={data} />
            </div>
        </div>
    );
};

export default Page;
