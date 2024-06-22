'use client';

import { createBedrooms } from "@/app/actions/bedroomsAction";
import { Button, buttonVariants } from '../ui/button';
import Link from "next/link";
import { useRouter } from "next/router";

import { bedroomsTypes } from "../bedrooms/bedroomstype/bedroomsType";



export function RegisterBedrooms() {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // const router = useRouter();
        event.preventDefault();
        await createBedrooms(new FormData(event.currentTarget));

        // router.push('/bedrooms');

    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="max-w-md mx-auto mt-5">
                <h1 className="text-2xl text-center mb-2">Registrar Habitacion</h1>

                <div className="mb-5">
                    <label form="typeBedroom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tipo de Habitacion
                    </label>
                    <select className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        id="typeBedroom"
                        name="typeBedroom"
                        required
                    >
                        {bedroomsTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-5">
                    <label form="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Descripcion
                    </label>
                    <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Descripcion"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label form="lowSeasonPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Precio Temporada Baja
                    </label>
                    <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        type="number"
                        id="lowSeasonPrice"
                        name="lowSeasonPrice"
                        placeholder="Precio Temporada Baja"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label form="highSeasonPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Precio Temporada Alta
                    </label>
                    <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        type="number"
                        id="highSeasonPrice"
                        name="highSeasonPrice"
                        placeholder="Precio Temporada Alta"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label form="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Estado
                    </label>
                    <select id="status" name="status" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                        <option value="0">Inactivo</option>
                        <option value="1">Activo</option>
                    </select>
                </div>

                <div className="mb-5">
                    <label form="numberBedroom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Numero de Habitacion
                    </label>
                    <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        type="number"
                        id="numberBedroom"
                        name="numberBedroom"
                        placeholder="Numero de Habitacion"
                        required
                    />
                </div>

                <div className="flex justify-center">
                    {/* <Link href="/bedrooms" className={buttonVariants({ variant: "secondary" })}>
                        Cancel
                    </Link> */}
                    <Button type='submit'>
                        Registrar Habitacion
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default RegisterBedrooms;
