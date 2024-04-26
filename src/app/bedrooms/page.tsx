'use client';

import Link from 'next/link';
import TableData from '@/components/tabledata';
import { useEffect, useState } from 'react';
import { getBedrooms } from '@/lib/action';

const Page = () => {
    const [data, setData] = useState<{ id: number; typeBedroom: string; description: string; lowSeasonPrice: number; highSeasonPrice: number; status: boolean; numberBedroom: number; }[]>([]);

    useEffect(() => {
        getBedrooms()
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
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Registrar Habitación
                        </button>
                    </Link>
                </div>
                <TableData data={data} />
            </div>
        </div>
    );
};

export default Page;
