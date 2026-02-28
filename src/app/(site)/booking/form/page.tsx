'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function BookingFormPage() {
  const router = useRouter();
  const { toast } = useToast();

  const { data: session, status } = useSession();

  const [formData, setFormData] = React.useState({
    username: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    comments: ''
  });

  // 🔐 Proteger la ruta
  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (!session) {
      router.push('/sign-in?callbackUrl=/booking/form');
    }
  }, [session, status, router]);

  // ✨ Autocompletar datos
  useEffect(() => {
    if (session?.user) {
      const fullName = session.user.username?.split(' ') || [];
      console.log({ fullName });

      setFormData((prev) => ({
        ...prev,
        username: fullName[0] || '',
        lastName: fullName.slice(1).join(' ') || '',
        email: session.user.email || ''
      }));
    }
  }, [session]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
    ) {
      toast({
        title: 'Campos requeridos',
        description: 'Completa todos los campos obligatorios.',
        variant: 'destructive'
      });
      return;
    }

    localStorage.setItem('bookingCustomerData', JSON.stringify(formData));

    router.push('/booking/summary');
  };

  // ⏳ Loader
  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center dark:bg-slate-900">
        <p className="text-gray-600 dark:text-slate-400">Verificando sesión...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <header className="border-b dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
            Hotel
            <span className="ml-1 text-sm font-normal text-gray-600 dark:text-slate-400">
              HOTEL Madroño
            </span>
          </div>
          <Button variant="ghost" onClick={() => router.back()} className="dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <form onSubmit={handleSubmit}>
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="dark:text-slate-100">Información personal</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="dark:text-slate-300">Nombre *</Label>
                  <Input
                    className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label className="dark:text-slate-300">Apellido *</Label>
                  <Input
                    className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="dark:text-slate-300">Email *</Label>
                  <Input
                    className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500" name="email" value={formData.email} disabled />
                </div>

                <div>
                  <Label>Teléfono *</Label>
                  <Input
                    className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" variant="save">
                  Continuar
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
