'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function PreferencesTab() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDarkMode = theme === 'dark';

  return (
    <Card className="shadow-md border-blue-100 dark:border-slate-700 dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="text-blue-700 text-xl font-semibold">
          Preferencias
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 text-gray-700 dark:text-gray-300">
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode">Modo oscuro</Label>
          <Switch
            id="dark-mode"
            checked={isDarkMode}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Ajusta tus preferencias de apariencia y notificaciones.
        </p>
      </CardContent>
    </Card>
  );
}
