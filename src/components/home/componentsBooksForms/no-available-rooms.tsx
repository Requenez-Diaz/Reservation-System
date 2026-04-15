'use client';

import { SearchX } from 'lucide-react';
import Link from 'next/link';

export function NoAvailableRooms() {
  return (
    <div className="flex flex-col items-center text-center px-4 mt-8">
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-8 max-w-md">
        <SearchX className="h-16 w-16 mx-auto mb-4 text-amber-600 dark:text-amber-400" />
        <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-200 mb-2">
          No hay habitaciones disponibles
        </h2>
        <p className="text-amber-700 dark:text-amber-300 mb-6">
          Lo sentimos, no encontramos habitaciones disponibles para las fechas
          seleccionadas. Por favor, intenta con otras fechas.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
        >
          Volver a buscar
        </Link>
      </div>
    </div>
  );
}
