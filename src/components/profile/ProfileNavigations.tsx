'use client';

import type React from 'react';
import {
  User,
  KeyRound,
  Bell,
  LogOut,
  ImageIcon,
  Palette,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { signOut } from 'next-auth/react';

export type SettingsTab =
  | 'general'
  | 'security'
  | 'avatar'
  | 'notifications'
  | 'preferences'
  | 'support';

interface ProfileNavigationProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export function ProfileNavigation({
  activeTab,
  onTabChange
}: ProfileNavigationProps) {
  const accentText = 'text-blue-700';
  const activeBg = 'bg-blue-50';
  const hoverBg = 'hover:bg-blue-100';
  const textMuted = 'text-gray-600';
  const textActive = 'text-blue-800';

  const NavLink: React.FC<{
    _tab: SettingsTab;
    icon: React.ReactNode;
    label: string;
  }> = ({ _tab, icon, label }) => (
    <button
      className={`flex items-center gap-3 rounded-lg px-4 py-2 text-base transition-all duration-200 ${hoverBg} ${
        activeTab === _tab // Usamos _tab
          ? `${activeBg} font-semibold ${textActive} shadow-sm`
          : `${textMuted}`
      }`}
      onClick={() => onTabChange(_tab)} // Usamos _tab
      type="button"
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="w-full md:w-64">
      <h2 className={`text-3xl font-bold mb-2 tracking-tight ${accentText}`}>
        Configuración
      </h2>
      <p className="text-sm text-gray-700 mb-6">
        Ajusta tu cuenta y preferencias.
      </p>

      <nav className="flex flex-col gap-1 p-3 rounded-xl bg-white shadow-md">
        <NavLink
          _tab="general" // CORREGIDO (Línea 72)
          icon={<User className="h-5 w-5" />}
          label="General"
        />
        <NavLink
          _tab="avatar" // CORREGIDO (Línea 77)
          icon={<ImageIcon className="h-5 w-5" />}
          label="Foto de Perfil"
        />
        <NavLink
          _tab="security" // CORREGIDO (Línea 82)
          icon={<KeyRound className="h-5 w-5" />}
          label="Seguridad"
        />
        <NavLink
          _tab="notifications" // CORREGIDO (Línea 87)
          icon={<Bell className="h-5 w-5" />}
          label="Notificaciones"
        />
        <NavLink
          _tab="preferences" // CORREGIDO (Línea 92)
          icon={<Palette className="h-5 w-5" />}
          label="Preferencias"
        />
        <NavLink
          _tab="support" // CORREGIDO (Línea 97)
          icon={<HelpCircle className="h-5 w-5" />}
          label="Soporte"
        />

        <Separator className="my-2 bg-gray-200" />

        <Button
          className="justify-start text-gray-600 hover:text-white hover:bg-red-500/90 rounded-lg transition-colors duration-200"
          onClick={() => signOut()}
          variant="ghost"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Cerrar Sesión
        </Button>
      </nav>
    </div>
  );
}
