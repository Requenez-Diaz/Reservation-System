'use client';

import { useFormState } from 'react-dom';
import { saveBedrooms } from '@/app/actions/bedroomsAction';
import { bedroomsTypes } from '../bedrooms/bedroomstype/bedroomsType';

const RegisterBedrooms = () => {
  const [state, formAction] = useFormState(saveBedrooms, null);

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Registrar Habitacion</h1>

      <form action={formAction} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            form="typeBedroom"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tipo de Habitacion
          </label>
          <select
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">
              {state?.Error?.typeBedroom}
            </p>
          </div>
        </div>

        <div className="mb-5">
          <label
            form="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Descripcion
          </label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="text"
            id="description"
            name="description"
            placeholder="Descripcion"
            required
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">
              {state?.Error?.description}
            </p>
          </div>
        </div>

        <div className="mb-5">
          <label
            form="lowSeasonPrice"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Precio de Habitación
          </label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="number"
            id="lowSeasonPrice"
            name="lowSeasonPrice"
            placeholder="Precio Temporada Baja"
            required
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">
              {state?.Error?.lowSeasonPrice}
            </p>
          </div>
        </div>

        <div className="mb-5">
          <label
            form="status"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Estado
          </label>
          <select
            id="status"
            name="status"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          >
            <option value="0">Inactivo</option>
            <option value="1">Activo</option>
          </select>
        </div>

        <div className="bm-5">
          <label
            form="numberBedroom"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Numero de Habitacion
          </label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="number"
            id="numberBedroom"
            name="numberBedroom"
            placeholder="Numero de Habitacion"
            required
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">
              {state?.Error?.numberBedroom}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Registrar Habitacion
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterBedrooms;
