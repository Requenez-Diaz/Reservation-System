'use client';

import { useFormState } from "react-dom";
import { saveBedrooms } from "@/lib/action";

const CreateBedroomsPage = () => {
    const [state, formAction] = useFormState(saveBedrooms, null);

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
                    />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        <p className="mt-2 text-sm text-red-500">{state?.Error?.typeBedroom}</p>
                    </div>

                    <label htmlFor="description">Descripcion</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Descripcion"
                        className="input"
                        required
                    />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        <p className="mt-2 text-sm text-red-500">{state?.Error?.description}</p>
                    </div>

                    <label htmlFor="lowSeasonPrice">Precio Temporada Baja</label>
                    <input
                        type="number"
                        id="lowSeasonPrice"
                        name="lowSeasonPrice"
                        placeholder="Precio Temporada Baja"
                        className="input"
                        required
                    />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        <p className="mt-2 text-sm text-red-500">{state?.Error?.lowSeasonPrice}</p>
                    </div>

                    <label htmlFor="highSeasonPrice">Precio Temporada Alta</label>
                    <input
                        type="number"
                        id="highSeasonPrice"
                        name="highSeasonPrice"
                        placeholder="Precio Temporada Alta"
                        className="input"
                        required
                    />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        <p className="mt-2 text-sm text-red-500">{state?.Error?.highSeasonPrice}</p>
                    </div>

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
                    />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        <p className="mt-2 text-sm text-red-500">{state?.Error?.numberBedroom}</p>
                    </div>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBedroomsPage;