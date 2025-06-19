'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import dynamic from 'next/dynamic';

// Importar componentes que dependen de la sesión de forma dinámica
const DynamicActiveLink = dynamic(
  () =>
    import('@/components/active-link/ActiveLink').then((mod) => ({
      default: mod.ActiveLink
    })),
  {
    ssr: false,
    loading: () => <span className="text-gray-400">Cargando...</span>
  }
);

const DynamicUserAccountnav = dynamic(
  () => import('@/app/(site)/navbar/usersComponents/UserAccountnav'),
  {
    ssr: false,
    loading: () => (
      <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
    )
  }
);

const DynamicAuthSection = dynamic(() => import('./auth-sections'), {
  ssr: false,
  loading: () => (
    <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
  )
});

const navItems = [
  { path: '/', text: 'Inicio' },
  { path: '/ofertas', text: 'Ofertas' },
  { path: '/habitaciones', text: 'Habitaciones' },
  { path: '/reservaciones', text: 'Reservaciones' }
];

export default function NavbarDynamic() {
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
                <DynamicActiveLink {...navItem} />
              </li>
            ))}
          </ul>

          <div className="flex gap-x-6">
            <DynamicAuthSection />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col gap-y-4 text-black">
            {navItems.map((navItem) => (
              <li key={navItem.path}>
                <DynamicActiveLink {...navItem} />
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <DynamicAuthSection />
          </div>
        </div>
      )}
    </nav>
  );
}
