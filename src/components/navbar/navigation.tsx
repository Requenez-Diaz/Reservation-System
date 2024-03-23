import Link from 'next/link';
import { Button } from '../ui/button';

const Navbar = () => {
  // };
  return (
    <nav className="bg-gray-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="https://www.facebook.com/hotelito.madrono">
            <h1
              className="text-green-300 font-extrabold text-2xl md:text-3xl"
              style={{
                fontFamily: 'cursive',
                textShadow: '2px 2px 4px #000000'
              }}
            >
              Hotel Madroño
            </h1>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-x-6 ">
          <ul className="flex gap-x-6 text-white">
            <li>
              <Link href="/" className="text-green-400 font-bold">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/ofertas" className="text-green-400 font-bold">
                Ofertas
              </Link>
            </li>
            <li>
              <Link href="/habitaciones" className="text-green-400 font-bold">
                Habitaciones
              </Link>
            </li>
            <li>
              <Link href="/reservaciones" className="text-green-400 font-bold">
                Reservaciones{' '}
              </Link>
            </li>
          </ul>
          <div className="flex gap-x-6">
            <Button
              variant="ghost"
              className="bg-white-600 text-green-400 border border-green-500"
            >
              <Link href="/sign-in">Iniciar sesión</Link>
            </Button>
            <Button
              variant={'secondary'}
              className="bg-white-600 text-green-400 border border-green-500"
            >
              <Link href="/sign-up">Registrarse</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
