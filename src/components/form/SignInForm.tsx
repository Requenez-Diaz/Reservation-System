'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { KeyRound, Mail, LogIn, UserPlus } from 'lucide-react';

const FormSchema = z.object({
  email: z.string().min(1, 'El correo es obligatorio').email('Correo inválido'),
  password: z
    .string()
    .min(1, 'La contraseña es obligatoria')
    .min(8, 'Debe tener al menos 8 caracteres')
});

const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(FormSchema)
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    });

    if (signInData?.error) {
      toast({
        title: 'Error de acceso',
        description:
          'Credenciales incorrectas. Verifica tu correo y contraseña.',
        variant: 'destructive'
      });
      return;
    }

    const isBooking = callbackUrl.includes('booking');

    toast({
      title: '¡Bienvenido!',
      description: isBooking
        ? 'Sesión iniciada. Redirigiendo a tu reserva...'
        : 'Has ingresado correctamente al sistema.'
    });

    router.refresh();
    router.push(callbackUrl);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-orange-100/50 blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      <div className="z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 p-8 text-center text-white">
            <div className="inline-flex p-3 rounded-xl bg-orange-500 mb-4 shadow-lg shadow-orange-500/20">
              <LogIn className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              Bienvenido de nuevo
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              Ingresa tus credenciales para acceder
            </p>
          </div>

          <div className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* EMAIL */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700">
                        Correo Electrónico
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                            placeholder="nombre@ejemplo.com"
                            type="email"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />

                {/* PASSWORD */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="font-bold text-slate-700">
                          Contraseña
                        </FormLabel>
                        {/* OLVIDASTE TU CONTRASEÑA */}
                        <Link
                          href="/forgot-password"
                          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                        >
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                            type="password"
                            placeholder="••••••••"
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
                    'Iniciar Sesión'
                  )}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-500 font-medium">
                      O continúa con
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-slate-600">
                    ¿No tienes una cuenta aún?{' '}
                    <Link
                      className="text-blue-600 font-bold hover:text-blue-700 transition-colors inline-flex items-center gap-1"
                      href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                    >
                      <UserPlus className="h-3 w-3" /> Regístrate aquí
                    </Link>
                  </p>
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
};

export default SignInForm;
