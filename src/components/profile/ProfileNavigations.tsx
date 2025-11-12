'use client';

import type React from 'react';
import {
  Bell,
  HelpCircle,
  ImageIcon,
  KeyRound,
  LogOut,
  Palette,
  User
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

  // 🔹 Componente interno NavLink corregido y limpio
  const NavLink: React.FC<{
    tab: SettingsTab;
    icon: React.ReactNode;
    label: string;
  }> = ({ tab, icon, label }) => (
    <button
      className={`flex items-center gap-3 rounded-lg px-4 py-2 text-base transition-all duration-200 ${hoverBg} ${
        activeTab === tab
          ? `${activeBg} font-semibold ${textActive} shadow-sm`
          : `${textMuted}`
      }`}
      onClick={() => onTabChange(tab)}
      type="button"
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="w-full md:w-64">
      <h2 className={`mb-2 text-3xl font-bold tracking-tight ${accentText}`}>
        Configuración
      </h2>
      <p className="mb-6 text-sm text-gray-700">
        Ajusta tu cuenta y preferencias.
      </p>

      <nav className="flex flex-col gap-1 rounded-xl bg-white p-3 shadow-md">
        <NavLink
          icon={<User className="h-5 w-5" />}
          label="General"
          tab="general"
        />
        <NavLink
          icon={<ImageIcon className="h-5 w-5" />}
          label="Foto de Perfil"
          tab="avatar"
        />
        <NavLink
          icon={<KeyRound className="h-5 w-5" />}
          label="Seguridad"
          tab="security"
        />
        <NavLink
          icon={<Bell className="h-5 w-5" />}
          label="Notificaciones"
          tab="notifications"
        />
        <NavLink
          icon={<Palette className="h-5 w-5" />}
          label="Preferencias"
          tab="preferences"
        />
        <NavLink
          icon={<HelpCircle className="h-5 w-5" />}
          label="Soporte"
          tab="support"
        />

        <Separator className="my-2 bg-gray-200" />

        <Button
          className="rounded-lg justify-start text-gray-600 transition-colors duration-200 hover:bg-red-500/90 hover:text-white"
          onClick={() => signOut()}
          variant="ghost"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Cerrar Sesión
        </Button>
      </nav>
    </div>
  );
}
