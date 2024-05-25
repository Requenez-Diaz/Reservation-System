import prisma from '@/lib/db';
import Link from 'next/link';
import { DeleteBedrooms } from '../form/bedrooms/buttonDeleteBedrooms';

async function TableBedrooms() {
    const bedrooms = await prisma.bedrooms.findMany();

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="table table-zebra">
                <thead className="tex-sm text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="py-3 px-6">#</th>
                        <th className="py-3 px-6">typeBedroom</th>
                        <th className="py-3 px-6">description</th>
                        <th className="py-3 px-6">lowSeasonPrice</th>
                        <th className="py-3 px-6">highSeasonPrice</th>
                        <th className="py-3 px-6">status</th>
                        <th className="py-3 px-6">numberBedroom</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bedrooms.map((bedrooms, index) => (
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={index}>
                            <td className="py-3 px-6">{index + 1}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{bedrooms.typeBedroom}</td>
                            <td className="py-3 px-6">{bedrooms.description}</td>
                            <td className="py-3 px-6">{bedrooms.lowSeasonPrice}</td>
                            <td className="py-3 px-6">{bedrooms.highSeasonPrice}</td>
                            <td className="py-3 px-6">{bedrooms.status}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{bedrooms.numberBedroom}</td>
                            <td className="py-3 px-6 flex justify-center">
                                <Link href={`/bedrooms/edit/${bedrooms.id}`}
                                    className="btn btn-primary"
                                >
                                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                        Editar
                                    </button>
                                </Link>
                                <DeleteBedrooms bedroomsId={bedrooms.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default TableBedrooms;