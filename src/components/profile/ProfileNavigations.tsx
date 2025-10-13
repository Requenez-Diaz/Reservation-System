'use client';

import type React from 'react';
import { User, KeyRound, Bell, LogOut, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { signOut } from 'next-auth/react';

export type SettingsTab = 'general' | 'security' | 'avatar' | 'notifications';

interface ProfileNavigationProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export function ProfileNavigation({
  activeTab,
  onTabChange
}: ProfileNavigationProps) {
  const primaryOrange = 'text-orange-700';
  const activeBgGradient = 'bg-gradient-to-r from-orange-100/70 to-white/70';
  const hoverBg = 'hover:bg-orange-50';
  const textMuted = 'text-orange-800/80';
  const textActive = 'text-orange-800';

  const NavLink: React.FC<{
    tab: SettingsTab;
    icon: React.ReactNode;
    label: string;
  }> = ({ tab, icon, label }) => (
    <button
      type="button"
      className={`flex items-center gap-3 rounded-xl px-4 py-2 text-base transition-all duration-200 ${hoverBg} ${
        activeTab === tab
          ? `${activeBgGradient} font-bold ${textActive} shadow-sm border border-orange-200`
          : `${textMuted}`
      }`}
      onClick={() => onTabChange(tab)}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="w-full md:w-64">
      <h2
        className={`text-3xl font-extrabold mb-2 tracking-tight ${primaryOrange}`}
      >
        Configuración
      </h2>
      <p className="text-sm text-black mb-6">
        Ajusta tu cuenta y preferencias.
      </p>

      <nav className="flex flex-col gap-1 p-3 border-2 border-orange-200 rounded-xl bg-white shadow-lg">
        {/* Enlaces de Navegación */}
        <NavLink
          tab="general"
          icon={<User className="h-5 w-5" />}
          label="General"
        />
        <NavLink
          tab="avatar"
          icon={<ImageIcon className="h-5 w-5" />}
          label="Foto de Perfil"
        />
        <NavLink
          tab="security"
          icon={<KeyRound className="h-5 w-5" />}
          label="Seguridad"
        />
        <NavLink
          tab="notifications"
          icon={<Bell className="h-5 w-5" />}
          label="Notificaciones"
        />

        <Separator className="my-2 bg-orange-200" />

        {/* Botón de Cerrar Sesión: Mantiene el rojo destructivo para UX */}
        <Button
          variant="ghost"
          className="justify-start text-red-600 hover:text-white hover:bg-red-500/90 rounded-xl transition-colors duration-200"
          onClick={() => signOut()}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Cerrar Sesión
        </Button>
      </nav>
    </div>
  );
}
