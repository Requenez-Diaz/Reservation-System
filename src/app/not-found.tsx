import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen bg-gray-900 flex flex-col justify-center items-center text-white text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-2">Página No Encontrada</h2>
      <p className="mb-6">
        Lo sentimos, no pudimos encontrar el recurso solicitado.
      </p>
    </div>
  );
}
