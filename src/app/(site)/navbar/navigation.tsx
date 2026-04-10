'use client';

import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import UserAccountnav from '@/app/(site)/navbar/usersComponents/UserAccountnav';
import { useState, useEffect } from 'react';
import { Menu, X, Bed, Calendar, Home, Tag } from 'lucide-react';
import { useSession } from 'next-auth/react';

const navItems = [
  { path: '/', text: 'Inicio', icon: Home },
  { path: '/ofertas', text: 'Ofertas', icon: Tag },
  { path: '/bedrooms', text: 'Habitaciones', icon: Bed },
  { path: '/reservaciones', text: 'Reservas', icon: Calendar }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800'
            : 'bg-white dark:bg-slate-950'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image
                  alt="Hotel Madroño"
                  src="/hotel madroño.png"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="hidden sm:block text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                HOTEL MADROÑO
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    {item.text}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              {status === 'loading' ? (
                <div className="w-32 h-10 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
              ) : session?.user ? (
                <UserAccountnav />
              ) : (
                <Link
                  className={buttonVariants({
                    variant: 'save',
                    className: 'font-bold shadow-md shadow-orange-600/20'
                  })}
                  href="/sign-in"
                >
                  Iniciar sesión
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menú"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-slate-700 dark:text-slate-300" />
              ) : (
                <Menu className="h-6 w-6 text-slate-700 dark:text-slate-300" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Content */}
          <div className="absolute top-16 left-0 right-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl animate-in slide-in-from-top-2">
            <div className="container mx-auto px-4 py-6 space-y-4">
              {/* Nav Items */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                  Navegación
                </p>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      {item.text}
                    </Link>
                  );
                })}
              </div>

              {/* Auth Section */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                  Cuenta
                </p>
                {status === 'loading' ? (
                  <div className="w-full h-12 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
                ) : session?.user ? (
                  <div onClick={() => setIsMenuOpen(false)}>
                    <UserAccountnav />
                  </div>
                ) : (
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    className={buttonVariants({
                      variant: 'save',
                      className: 'w-full font-bold text-base py-6'
                    })}
                    href="/sign-in"
                  >
                    Iniciar sesión
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
