'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export function NotificationsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Preferencias de Notificación</CardTitle>
        <CardDescription>
          Decide cómo y cuándo quieres ser notificado.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Aquí irían los toggles para activar/desactivar correos electrónicos,
          notificaciones push, etc.
        </p>
      </CardContent>
    </Card>
  );
}
