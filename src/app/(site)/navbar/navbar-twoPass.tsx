// app/(site)/navbar/navbar-twoPass.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { ActiveLink } from '@/components/active-link/ActiveLink';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import UserAccountnav from '@/app/(site)/navbar/usersComponents/UserAccountnav';
import { Session } from 'next-auth';
import { ModeToggle } from '@/components/mode-toggle';

const navItems = [
  { path: '/', text: 'Inicio' },
  { path: '/ofertas', text: 'Ofertas' },
  { path: '/bedrooms', text: 'Habitaciones' },
  { path: '/reservaciones', text: 'Reservaciones' }
];

interface NavbarTwoPassProps {
  session: Session | null;
}

export default function NavbarTwoPass({ session }: NavbarTwoPassProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-slate-900 dark:border-b dark:border-slate-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="https://www.facebook.com/hotelito.madrono">
          <Image
            alt="Hotel Madroño"
            height={55}
            src="/hotel madroño.png"
            width={55}
          />
        </Link>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex items-center gap-x-7">
          <ul className="flex gap-x-6 text-black dark:text-gray-100">
            {navItems.map((navItem) => (
              <li key={navItem.path}>
                <ActiveLink {...navItem} />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-x-6">
            <ModeToggle />
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
          <ul className="flex flex-col gap-y-4 text-black dark:text-gray-100">
            {navItems.map((navItem) => (
              <li key={navItem.path}>
                <ActiveLink {...navItem} />
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between">
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
            <ModeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
