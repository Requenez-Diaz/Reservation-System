import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formaData = (dateStr: string) => {
  const data = new Date(dateStr);
  console.log(data);
  const formatter = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
  return formatter.format(data);
};

/**
 * Obtiene las iniciales de un nombre
 * @param name Nombre completo
 * @returns Iniciales (máximo 2 caracteres)
 */
export function getInitials(name: string): string {
  if (!name || name.trim() === '') {
    return 'U'; // Usuario por defecto si no hay nombre
  }

  // Dividir el nombre por espacios y obtener las iniciales
  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    // Si solo hay una palabra, tomar la primera letra
    return parts[0].charAt(0).toUpperCase();
  }

  // Si hay múltiples palabras, tomar la primera letra de la primera y última palabra
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}
