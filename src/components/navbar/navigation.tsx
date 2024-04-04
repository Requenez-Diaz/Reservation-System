import Link from 'next/link';
import { Button } from '../ui/button';

const Navbar = () => {
  const stylesActive = {
    borderBottom: '2px solid #fff',
    paddingBottom: '5px'
  };

  const stylesText = {
    color: 'black',
    fontWeight: 'bold'
  };

  return (
    <nav className="bg-white opacity-60 p-4">
      <div className="container mx-auto flex justify-between items-center ">
        <div>
          <Link href="https://www.facebook.com/hotelito.madrono">
            <p
              className="text-black font-extrabold text-2xl md:text-3xl"
              style={{
                fontFamily: 'cursive',
                textShadow: '2px 2px 4px #000000'
              }}
            >
              Hotel Madroño
            </p>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-x-6 ">
          <ul className="flex gap-x-6 text-black">
            <li>
              <Link
                href="/"
                className="text-black font-bold hover:text-gray-600"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/ofertas"
                className="text-black font-bold hover:text-gray-600"
              >
                Ofertas
              </Link>
            </li>
            <li>
              <Link
                href="/habitaciones"
                className="text-black  font-bold hover:text-gray-600"
              >
                Habitaciones
              </Link>
            </li>
            <li>
              <Link
                href="/reservaciones"
                className="text-black  font-bold hover:text-gray-600"
              >
                Reservaciones{' '}
              </Link>
            </li>
          </ul>
          <div className="flex gap-x-6">
            <Button
              variant="ghost"
              className="bg-white-600 text-black border border-black hover:bg-slate-400"
            >
              <Link href="/sign-in">Iniciar sesión</Link>
            </Button>
            <Button
              variant={'ghost'}
              className="bg-white-600 text-black border border-black hover:bg-slate-400 "
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
