import { getServerSession } from 'next-auth/next';

import { ReservationsClient } from './reservations-client';
import { getReservationsByUsers } from '@/app/actions/saveReservation/getReservationByUsers';
import { authOptions } from '@/lib/auth';

export default async function ReservationsServer() {
  console.log('🚀 ReservationsServer: Iniciando renderizado...');

  try {
    // Paso 1: Obtener sesión
    console.log('📋 Obteniendo sesión...');
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      console.log('❌ No hay sesión de usuario');
      return (
        <div className="flex flex-col min-h-screen justify-center items-center p-6 bg-gray-100">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md text-center">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              No autenticado
            </h2>
            <p className="text-red-600">
              Debes iniciar sesión para ver tus reservaciones.
            </p>
          </div>
        </div>
      );
    }

    console.log('✅ Sesión encontrada para usuario:', session.user.id);

    // Paso 2: Validar y convertir ID
    const userId = Number(session.user.id);

    if (isNaN(userId) || userId <= 0) {
      console.log('❌ ID de usuario inválido:', session.user.id);
      return (
        <div className="flex flex-col min-h-screen justify-center items-center p-6 bg-gray-100">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md text-center">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              Error de usuario
            </h2>
            <p className="text-red-600">
              ID de usuario inválido: {session.user.id}
            </p>
          </div>
        </div>
      );
    }

    console.log('✅ ID de usuario válido:', userId);

    // Paso 3: Obtener datos
    console.log('📊 Obteniendo reservaciones...');
    const result = await getReservationsByUsers(userId);

    console.log('📊 Resultado obtenido:', {
      success: result.success,
      hasUser: !!result.user,
      reservationsCount: result.reservations?.length || 0
    });

    // Paso 4: Manejar errores
    if (!result.success) {
      console.log('❌ Error en la consulta:', result.message);
      return (
        <div className="flex flex-col min-h-screen justify-center items-center p-6 bg-gray-100">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md text-center">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              Error al cargar datos
            </h2>
            <p className="text-red-600">
              {result.message || 'Error desconocido'}
            </p>
          </div>
        </div>
      );
    }

    // Paso 5: Validar usuario
    if (!result.user) {
      console.log('❌ No se encontró información del usuario');
      return (
        <div className="flex flex-col min-h-screen justify-center items-center p-6 bg-gray-100">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md text-center">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">
              Usuario no encontrado
            </h2>
            <p className="text-yellow-600">
              No se pudo cargar la información del usuario.
            </p>
          </div>
        </div>
      );
    }

    // Paso 6: Manejar caso sin reservaciones
    if (!result.reservations || result.reservations.length === 0) {
      console.log('ℹ️ No hay reservaciones para mostrar');
      return (
        <div className="flex flex-col min-h-screen justify-center items-center p-6 bg-gray-100">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md text-center">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              No hay reservas
            </h2>
            <p className="text-blue-600 mb-4">
              Aún no tienes reservaciones realizadas.
            </p>
            <div className="text-sm text-blue-500">
              <p>Usuario: {result.user.username}</p>
              <p>Email: {result.user.email}</p>
            </div>
          </div>
        </div>
      );
    }

    // Paso 7: Renderizar componente cliente
    console.log('✅ Renderizando componente cliente con datos');
    return (
      <ReservationsClient
        reservations={result.reservations}
        user={result.user}
      />
    );
  } catch (error) {
    console.error('💥 Error crítico en ReservationsServer:', error);

    return (
      <div className="flex flex-col min-h-screen justify-center items-center p-6 bg-gray-100">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Error del servidor
          </h2>
          <p className="text-red-600 mb-2">
            {error instanceof Error ? error.message : 'Error desconocido'}
          </p>
          <details className="text-xs text-red-500 mt-2">
            <summary className="cursor-pointer">Detalles técnicos</summary>
            <pre className="mt-2 text-left overflow-auto">
              {error instanceof Error ? error.stack : String(error)}
            </pre>
          </details>
        </div>
      </div>
    );
  }
}
