import Link from "next/link"

const Bedrooms = ({ data }: { data: any[] }) => {

    return (
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
                {data.map((bedrooms, index) => (
                    <tr key={index}>
                        <td className="py-3 px-6">{index + 1}</td>
                        <td className="py-3 px-6">{bedrooms.typeBedroom}</td>
                        <td className="py-3 px-6">{bedrooms.description}</td>
                        <td className="py-3 px-6">{bedrooms.lowSeasonPrice}</td>
                        <td className="py-3 px-6">{bedrooms.highSeasonPrice}</td>
                        <td className="py-3 px-6">{bedrooms.status}</td>
                        <td className="py-3 px-6">{bedrooms.numberBedroom}</td>
                        <td className="py-3 px-6 flex justify-center">
                            <Link href={`/bedrooms/edit/${bedrooms.id}`}
                                className="btn btn-primary"
                            >
                                Editar
                            </Link>
                            <button className="btn btn-danger">Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>

    )
}

export default Bedrooms