import Link from 'next/link';
import { Button } from '../ui/button';

const Navbar = () => {
  return (
    <nav className="bg-blue-950 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1
            className="text-white font-extrabold text-2xl md:text-3xl"
            style={{ fontFamily: 'cursive', textShadow: '2px 2px 4px #000000' }}
          >
            Hotel Madroño
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-x-6">
          <ul className="flex gap-x-6 text-white">
            <li>
              <Link href="/">Inicio</Link>
            </li>
            <li>
              <Link href="/ofertas">Oferta</Link>
            </li>
            <li>
              <Link href="/habitaciones">Habitaciones</Link>
            </li>
            <li>
              <Link href="/reservaciones">Reservaciones </Link>
            </li>
            <li>
              <Link href="/aboutUs">Acerca de nosotro</Link>
            </li>
          </ul>
          <div className="flex gap-x-6">
            <Button variant="ghost" className="bg-blue-600 text-white">
              Registrarse
            </Button>
            <Button variant={'secondary'} className="bg-blue-600 text-white">
              Acceder
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
