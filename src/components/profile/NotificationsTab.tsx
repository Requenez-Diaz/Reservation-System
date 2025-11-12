'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export function NotificationsTab() {
  return (
    <div className="space-y-6">
      <Card className="shadow-md border-blue-100">
        <CardHeader>
          <CardTitle className="text-blue-700 text-xl font-semibold">
            Tus notificaciones recientes
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
