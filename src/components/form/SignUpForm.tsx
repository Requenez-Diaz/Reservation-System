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
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useToast } from '../ui/use-toast';
import { saveUsers } from '@/app/actions/users/saveUsers';
import { signIn } from 'next-auth/react';
import {
  Mail,
  UserIcon,
  Eye,
  EyeOff,
  KeyRound,
  UserPlus,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';

const FormSchema = z
  .object({
    username: z.string().min(1, 'El usuario es requerido').max(100),
    email: z
      .string()
      .min(1, 'El email es requerido')
      .email('Email es invalido'),
    password: z
      .string()
      .min(1, 'La contraseña es requerida')
      .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z
      .string()
      .min(1, 'La confirmación de la contraseña es requerida')
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden'
  });

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(FormSchema)
  });

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    try {
      const formDataObj = new FormData();
      formDataObj.append('username', formData.username);
      formDataObj.append('email', formData.email);
      formDataObj.append('password', formData.password);
      formDataObj.append('confirmPassword', formData.confirmPassword);

      const user = await saveUsers(formDataObj);

      if (user) {
        const callbackUrl = localStorage.getItem('authCallbackUrl');

        if (callbackUrl) {
          toast({
            description: 'Por favor inicia sesión con tus nuevas credenciales.',
            title: 'Usuario registrado con éxito',
            variant: 'default'
          });
          router.push('/sign-in');
        } else {
          const signInResult = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false
          });

          if (signInResult?.error) {
            toast({
              description:
                'No se pudo iniciar sesión automáticamente. Por favor, inténtelo manualmente.',
              title: 'Error de autenticación',
              variant: 'destructive'
            });
          } else {
            toast({
              description: 'Será redirigido al panel de control.',
              title: 'Usuario registrado con éxito',
              variant: 'default'
            });
            router.push('/');
          }
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'Email already exists') {
        toast({
          description: 'Este correo electrónico ya está registrado.',
          title: 'Error de registro',
          variant: 'destructive'
        });
      } else {
        toast({
          description: 'Ocurrió un error inesperado al registrar el usuario.',
          title: 'Error de registro',
          variant: 'destructive'
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      {/* Fondo con blur decorativo */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-orange-100/50 blur-3xl" />
      </div>

      <div className="z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header con Logo */}
          <div className="bg-slate-900 pt-8 pb-6 text-center text-white">
            <div className="flex justify-center mb-4">
              <div className="bg-white p-2 rounded-full shadow-lg">
                <Image
                  alt="Logo Hotel Madroño"
                  height={80}
                  src={'/hotel madroño.png'}
                  width={80}
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              Crea tu cuenta
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Únete a nuestra comunidad hoy
            </p>
          </div>

          <div className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* USERNAME */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                        Nombre de usuario
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                            placeholder="Tu apodo favorito"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />

                {/* EMAIL */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                            placeholder="correo@ejemplo.com"
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
                      <FormLabel className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                        Contraseña
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                            placeholder="Mínimo 8 caracteres"
                            type={showPassword ? 'text' : 'password'}
                            {...field}
                          />
                          <button
                            className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                            type="button"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />

                {/* CONFIRM PASSWORD */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                        Confirmar Contraseña
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                            placeholder="Repite tu contraseña"
                            type={showPassword ? 'text' : 'password'}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 shadow-md shadow-blue-600/10 transition-all active:scale-[0.98] mt-4"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" /> Registrarse
                    </span>
                  )}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-400 font-bold">
                      o también
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-slate-600">
                    ¿Ya tienes una cuenta?{' '}
                    <Link
                      className="text-blue-600 font-bold hover:text-blue-700 transition-colors inline-flex items-center gap-1"
                      href="/sign-in"
                    >
                      Inicia sesión aquí <ArrowRight className="h-3 w-3" />
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <p className="text-center text-slate-400 text-xs mt-8 font-medium uppercase tracking-widest">
          Hotel Madroño — Nicaragua 2026
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
