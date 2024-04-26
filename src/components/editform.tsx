'use client';

import { updateBedrooms } from "@/lib/action";
import { useFormState } from "react-dom";
import { bedrooms } from "@prisma/client";

const UpdateForm = ({ bedrooms }: { bedrooms: bedrooms }) => {
    const UpdateBedroomsWithId = updateBedrooms.bind(null, bedrooms.id);
    const [state, formAction] = useFormState(UpdateBedroomsWithId, null);

    return (
        <div className="max-w-md mx-auto mt-5">
            <h1 className="text-2xl text-center mb-2">Agregar Habitacion</h1>
            <div>
                <form action={formAction} className="flex flex-col gap-2">
                    <label htmlFor="typeBedroom">Tipo de Habitacion</label>
                    <input
                        type="text"
                        id="typeBedroom"
                        name="typeBedroom"
                        placeholder="Tipo de Habitacion"
                        className="input"
                        required
                        defaultValue={bedrooms.typeBedroom}
                    />

                    <label htmlFor="description">Descripcion</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Descripcion"
                        className="input"
                        required
                        defaultValue={bedrooms.description}
                    />

                    <label htmlFor="lowSeasonPrice">Precio Temporada Baja</label>
                    <input
                        type="number"
                        id="lowSeasonPrice"
                        name="lowSeasonPrice"
                        placeholder="Precio Temporada Baja"
                        className="input"
                        required
                        defaultValue={bedrooms.lowSeasonPrice}
                    />

                    <label htmlFor="highSeasonPrice">Precio Temporada Alta</label>
                    <input
                        type="number"
                        id="highSeasonPrice"
                        name="highSeasonPrice"
                        placeholder="Precio Temporada Alta"
                        className="input"
                        required
                        defaultValue={bedrooms.highSeasonPrice}
                    />

                    <label htmlFor="status">Estado</label>
                    <select id="status" name="status" className="input">
                        <option value="0">Inactivo</option>
                        <option value="1">Activo</option>
                    </select>

                    <label htmlFor="numberBedroom">Numero de Habitacion</label>
                    <input
                        type="number"
                        id="numberBedroom"
                        name="numberBedroom"
                        placeholder="Numero de Habitacion"
                        className="input"
                        required
                        defaultValue={bedrooms.numberBedroom}
                    />
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Actualizar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateForm;
