'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

import { ArrowLeft, ArrowRight, User, Mail, ShieldCheck } from 'lucide-react';

export default function BookingFormPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session, status } = useSession();

  const [formData, setFormData] = React.useState({
    username: '',
    email: ''
  });

  useEffect(() => {
    if (status === 'loading') {
      return;
    }
    if (!session) {
      router.push('/sign-in?callbackUrl=/booking/form');
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        username: session.user.username || session.user.name || '',
        email: session.user.email || ''
      }));
    }
  }, [session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.email) {
      toast({
        title: 'Campos requeridos',
        description: 'Por favor, completa tu nombre para continuar.',
        variant: 'destructive'
      });
      return;
    }
    localStorage.setItem('bookingCustomerData', JSON.stringify(formData));
    router.push('/booking/summary');
  };

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400 font-sans">
          Verificando sesión...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 pb-20 selection:bg-primary/10 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="group gap-2 text-slate-500 hover:text-primary transition-all"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Volver
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-6 pt-20">
        <form onSubmit={handleSubmit} className="relative">
          {/* Sutil resplandor de fondo */}
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-indigo-500/10 rounded-[2rem] blur-2xl opacity-50"></div>

          <Card className="relative overflow-hidden border border-slate-200/50 bg-white/90 shadow-2xl shadow-slate-200/50 backdrop-blur-sm dark:border-slate-800/50 dark:bg-slate-900/90 dark:shadow-none">
            <CardHeader className="space-y-1 pb-8 text-center border-b border-slate-50 dark:border-slate-800/50">
              <CardTitle className="text-2xl font-extrabold tracking-tight">
                Tus Datos
              </CardTitle>
              <CardDescription className="text-slate-500 font-medium italic">
                Paso 1: Información de contacto
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8 pt-10">
              <div className="grid gap-6">
                {/* Campo de Nombre */}
                <div className="space-y-2.5">
                  <Label
                    htmlFor="username"
                    className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1"
                  >
                    Nombre Completo *
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <Input
                      id="username"
                      name="username"
                      placeholder="Tu nombre completo"
                      className="pl-11 h-12 bg-white/50 dark:bg-slate-950 border-slate-200/60 focus:ring-4 focus:ring-primary/5 transition-all rounded-xl font-medium"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Campo de Email */}
                <div className="space-y-2.5">
                  <Label
                    htmlFor="email"
                    className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1"
                  >
                    Email Registrado
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      name="email"
                      className="pl-11 h-12 bg-slate-50/80 dark:bg-slate-900 border-slate-200/60 cursor-not-allowed opacity-70 rounded-xl"
                      value={formData.email}
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Banner de Seguridad */}
              <div className="flex items-center gap-4 rounded-2xl bg-slate-50 dark:bg-white/5 p-4 border border-slate-100 dark:border-white/10">
                <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />
                <p className="text-[11px] leading-snug text-slate-500 dark:text-slate-400 font-medium">
                  Información protegida. Los datos se guardarán temporalmente
                  para procesar tu reserva.
                </p>
              </div>

              {/* Botón Principal */}
              <div className="space-y-4 pt-2 flex flex-col items-center">
                <Button type="submit" size="lg" variant={'save'}>
                  Siguiente Paso
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <div className="flex justify-center gap-1.5 items-center opacity-40">
                  <div className="h-1.5 w-6 bg-primary rounded-full" />
                  <div className="h-1.5 w-1.5 bg-slate-300 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  );
}
