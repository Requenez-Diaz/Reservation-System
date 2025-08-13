'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ActiveLink } from '@/components/active-link/ActiveLink';
import UserAccountnav from '@/app/(site)/navbar/usersComponents/UserAccountnav';
import { useState } from 'react'; // Eliminado useEffect y hasMounted
import { Menu, X } from 'lucide-react';
import { useSession } from 'next-auth/react';

const navItems = [
  { path: '/', text: 'Inicio' },
  { path: '/ofertas', text: 'Ofertas' },
  { path: '/habitaciones', text: 'Habitaciones' },
  { path: '/reservaciones', text: 'Reservaciones' }
];

export default function NavbarTwoPass() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  // El componente se renderiza directamente sin la lógica de hasMounted
  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center">
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

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menú para desktop */}
        <div className="hidden md:flex items-center gap-x-7">
          <ul className="flex gap-x-6 text-black">
            {navItems.map((navItem) => (
              <li key={navItem.path}>
                <ActiveLink {...navItem} />
              </li>
            ))}
          </ul>

          <div className="flex gap-x-6">
            {status === 'loading' ? (
              // Esqueleto de carga solo para la parte del usuario
              <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
            ) : session?.user ? (
              <UserAccountnav />
            ) : (
              <Link
                className={buttonVariants({ variant: 'save' })}
                href="/sign-in"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Menú para móviles */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col gap-y-4 text-black">
            {navItems.map((navItem) => (
              <li key={navItem.path}>
                <ActiveLink {...navItem} />
              </li>
            ))}
          </ul>
          <div className="mt-4">
            {status === 'loading' ? (
              // Esqueleto de carga para la parte del usuario en móvil
              <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
            ) : session?.user ? (
              <UserAccountnav />
            ) : (
              <Link
                className={buttonVariants({ variant: 'save' })}
                href="/sign-in"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
