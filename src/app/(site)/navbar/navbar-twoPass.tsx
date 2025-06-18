'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ActiveLink } from '@/components/active-link/ActiveLink';
import UserAccountnav from '@/app/(site)/navbar/usersComponents/UserAccountnav';
import { useState, useEffect } from 'react';
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
  const [hasMounted, setHasMounted] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Primera pasada: renderizado consistente servidor/cliente
  if (!hasMounted) {
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

          <button className="md:hidden" disabled>
            <Menu size={24} />
          </button>

          <div className="hidden md:flex items-center gap-x-7">
            <ul className="flex gap-x-6 text-black">
              {navItems.map((navItem) => (
                <li key={navItem.path}>
                  <span className="text-gray-500">{navItem.text}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-x-6">
              <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Segunda pasada: renderizado completo con funcionalidad
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
              <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
            ) : session?.user ? (
              <UserAccountnav />
            ) : (
              <Link
                className={buttonVariants({ variant: 'blue' })}
                href="/sign-in"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
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
              <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
            ) : session?.user ? (
              <UserAccountnav />
            ) : (
              <Link
                className={buttonVariants({ variant: 'blue' })}
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
