import Link from 'next/link';
import { Button } from '../ui/button';

const Navbar = () => {
  const stylesActive = {
    borderBottom: '2px solid #fff',
    paddingBottom: '5px'
  };

  return (
    <nav className="bg-orange-500 p-4">
      <div className="container mx-auto flex justify-between items-center ">
        <div>
          <Link href="https://www.facebook.com/hotelito.madrono">
            <p
              className="text-white font-extrabold text-2xl md:text-3xl"
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
          <ul className="flex gap-x-6 text-white">
            <li>
              <Link href="/" className="text-white font-bold">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/ofertas" className="text-white font-bold">
                Ofertas
              </Link>
            </li>
            <li>
              <Link href="/habitaciones" className="text-white  font-bold">
                Habitaciones
              </Link>
            </li>
            <li>
              <Link href="/reservaciones" className="text-white  font-bold">
                Reservaciones{' '}
              </Link>
            </li>
          </ul>
          <div className="flex gap-x-6">
            <Button
              variant="ghost"
              className="bg-white-600 text-white border border-white"
            >
              <Link href="/sign-in">Iniciar sesión</Link>
            </Button>
            <Button
              variant={'ghost'}
              className="bg-white-600 text-white border border-white"
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
