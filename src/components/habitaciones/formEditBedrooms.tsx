'use client';

import { useState } from "react";
import { updateBedrooms } from "@/app/actions/bedroomsAction";
import { bedroomsTypes } from "../bedroomstype/bedroomsType";
import { bedrooms } from "@prisma/client";

export function FormEditBedrooms({ bedrooms }: { bedrooms?: bedrooms }) {
    const [formData, setFormData] = useState({
        id: bedrooms?.id ?? '',
        typeBedroom: bedrooms?.typeBedroom ?? '',
        description: bedrooms?.description ?? '',
        lowSeasonPrice: bedrooms?.lowSeasonPrice?.toString() ?? '',
        highSeasonPrice: bedrooms?.highSeasonPrice?.toString() ?? '',
        numberBedroom: bedrooms?.numberBedroom?.toString() ?? '',
        status: bedrooms?.status ? '1' : '0',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateBedrooms(new FormData(e.currentTarget as HTMLFormElement));
    };

    return (
        <div className="max-w-md mx-auto mt-5">
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="typeBedroom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tipo de Habitacion
                    </label>
                    <select
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        id="typeBedroom"
                        name="typeBedroom"
                        required
                        value={formData.typeBedroom}
                        onChange={handleInputChange}
                    >
                        {bedroomsTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Descripcion
                    </label>
                    <input
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Descripcion"
                        required
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="lowSeasonPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Precio Temporada Baja
                    </label>
                    <input
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        type="number"
                        id="lowSeasonPrice"
                        name="lowSeasonPrice"
                        placeholder="Precio Temporada Baja"
                        required
                        value={formData.lowSeasonPrice}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="highSeasonPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Precio Temporada Alta
                    </label>
                    <input
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        type="number"
                        id="highSeasonPrice"
                        name="highSeasonPrice"
                        placeholder="Precio Temporada Alta"
                        required
                        value={formData.highSeasonPrice}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Estado
                    </label>
                    <select
                        id="status"
                        name="status"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        value={formData.status}
                        onChange={handleInputChange}
                    >
                        <option value="0">Inactivo</option>
                        <option value="1">Activo</option>
                    </select>
                </div>

                <div className="mb-5">
                    <label htmlFor="numberBedroom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Numero de Habitacion
                    </label>
                    <input
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        type="number"
                        id="numberBedroom"
                        name="numberBedroom"
                        placeholder="Numero de Habitacion"
                        required
                        value={formData.numberBedroom}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Actualizar
                    </button>
                </div>
            </form>
        </div>
    );
}
