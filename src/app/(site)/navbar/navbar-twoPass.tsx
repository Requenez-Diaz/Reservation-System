// app/(site)/navbar/navbar-twoPass.tsx
'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ActiveLink } from '@/components/active-link/ActiveLink';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import UserAccountnav from '@/app/(site)/navbar/usersComponents/UserAccountnav';
import { Session } from 'next-auth';

const navItems = [
  { path: '/', text: 'Inicio' },
  { path: '/ofertas', text: 'Ofertas' },
  { path: '/habitaciones', text: 'Habitaciones' },
  { path: '/reservaciones', text: 'Reservaciones' }
];

interface NavbarTwoPass {
  session: Session | null;
}

export default function NavbarTwoPass({ session }: NavbarTwoPass) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            {session ? (
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
            {session ? (
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
