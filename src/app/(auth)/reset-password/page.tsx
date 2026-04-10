'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  resetPassword,
  validateResetToken
} from '@/app/actions/recovery-password/recovery-password';
import { KeyRound, LogIn, ArrowLeft, CheckCircle } from 'lucide-react';

const FormSchema = z
  .object({
    password: z
      .string()
      .min(1, 'La contraseña es requerida')
      .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z.string().min(1, 'Confirma tu contraseña')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
  });

export default function ResetPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(FormSchema)
  });

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setIsValidToken(false);
        return;
      }

      const result = await validateResetToken(token);
      setIsValidToken(result.valid);

      if (!result.valid) {
        toast({
          description: result.message,
          title: 'Token inválido',
          variant: 'destructive'
        });
      }
    };

    checkToken();
  }, [token, toast]);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    if (!token) {
      return;
    }

    try {
      const result = await resetPassword(token, values.password);

      if (result.success) {
        setIsSubmitted(true);
        toast({
          description: result.message,
          title: 'Contraseña actualizada'
        });

        setTimeout(() => {
          router.push('/sign-in');
        }, 2000);
      } else {
        toast({
          description: result.message,
          title: 'Error',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        description:
          'Hubo un problema al actualizar tu contraseña. Intenta de nuevo.',
        title: 'Error',
        variant: 'destructive'
      });
    }
  };

  if (isValidToken === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-orange-600 mx-auto" />
          <p className="text-slate-500 dark:text-slate-400 mt-4">
            Validando token...
          </p>
        </div>
      </div>
    );
  }

  if (!token || !isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-orange-100/50 dark:bg-orange-900/10 blur-3xl" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 dark:bg-blue-900/10 blur-3xl" />
        </div>

        <div className="z-10 w-full max-w-md">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="bg-red-600 p-8 text-center text-white">
              <div className="inline-flex p-3 rounded-xl bg-red-700 mb-4 shadow-lg shadow-red-500/20">
                <KeyRound className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-black tracking-tight">
                Enlace inválido
              </h1>
              <p className="text-red-200 text-sm mt-2">
                El enlace de recuperación no es válido o ha expirado
              </p>
            </div>

            <div className="p-8 text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Solicita un nuevo enlace para restablecer tu contraseña
              </p>
              <Link href="/forgot-password">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11">
                  Solicitar nuevo enlace
                </Button>
              </Link>
              <div className="mt-4">
                <Link
                  href="/sign-in"
                  className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Volver al inicio de sesión
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-orange-100/50 dark:bg-orange-900/10 blur-3xl" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 dark:bg-blue-900/10 blur-3xl" />
        </div>

        <div className="z-10 w-full max-w-md">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="bg-emerald-600 p-8 text-center text-white">
              <div className="inline-flex p-3 rounded-xl bg-emerald-700 mb-4 shadow-lg shadow-emerald-500/20">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-black tracking-tight">
                ¡Contraseña actualizada!
              </h1>
              <p className="text-emerald-200 text-sm mt-2">
                Tu contraseña ha sido restablecida exitosamente
              </p>
            </div>

            <div className="p-8 text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Serás redirigido al inicio de sesión...
              </p>
              <Link href="/sign-in">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11">
                  Ir al inicio de sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-orange-100/50 dark:bg-orange-900/10 blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 dark:bg-blue-900/10 blur-3xl" />
      </div>

      <div className="z-10 w-full max-w-md">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="bg-slate-900 p-8 text-center text-white">
            <div className="inline-flex p-3 rounded-xl bg-orange-500 mb-4 shadow-lg shadow-orange-500/20">
              <LogIn className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              Nueva contraseña
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              Ingresa tu nueva contraseña para restablecer tu cuenta
            </p>
          </div>

          <div className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700 dark:text-slate-300">
                        Nueva contraseña
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 transition-all"
                            placeholder="••••••••"
                            type="password"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700 dark:text-slate-300">
                        Confirmar contraseña
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 transition-all"
                            placeholder="••••••••"
                            type="password"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 shadow-md shadow-orange-600/10 transition-all active:scale-[0.98]"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    'Restablecer contraseña'
                  )}
                </Button>

                <div className="text-center">
                  <Link
                    href="/sign-in"
                    className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" /> Volver al inicio de sesión
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <p className="text-center text-slate-400 text-xs mt-8 font-medium uppercase tracking-widest">
          Sistema de Reservas © 2026
        </p>
      </div>
    </div>
  );
}
