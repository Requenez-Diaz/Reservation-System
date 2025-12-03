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
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useToast } from '../ui/use-toast';
import { saveUsers } from '@/app/actions/users/saveUsers';
import { signIn } from 'next-auth/react';
import { Mail, UserIcon, Eye, EyeOff, KeyRound } from 'lucide-react'; // 'Lock' eliminado (Línea 22)
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
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
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
        if (user) {
          toast({
            description: 'Cuenta creada exitosamente. Por favor inicia sesión.',
            title: 'Usuario registrado',
            variant: 'default'
          });

          // Redirigir al login, pasando el callbackUrl
          const signInUrl = `/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`;
          router.push(signInUrl);
        }
      }
    } catch (error: unknown) {
      // CORREGIDO: Usar unknown en lugar de any
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
    <div className="flex justify-center items-center h-screen">
      <Form {...form}>
        <form
          className="max-w-md w-full p-4 border border-gray-300 rounded-md"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex items-center justify-center content-center top-2">
            <Image
              alt="image" // CORREGIDO (Línea 115)
              height={120}
              src={'/hotel madroño.png'}
              width={120}
            />
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de usuario</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      className="w-full rounded-lg border border-stroke bg-gray-100 py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" // CORREGIDO (Línea 120)
                      placeholder="Ingrese su nombre de usuario"
                      {...field}
                    />
                    <UserIcon
                      className="absolute right-4 text-gray-500"
                      size={20} // CORREGIDO (Línea 122)
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      className="w-full rounded-lg border border-stroke bg-gray-100 py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      placeholder="Ingrese su correo electrónico"
                      {...field}
                    />
                    <Mail
                      className="absolute right-4 text-gray-500"
                      size={20}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      className="w-full rounded-lg border border-stroke bg-gray-100 py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      placeholder="Ingrese su contraseña"
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                    />
                    <button
                      className="absolute right-4 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Contraseña</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      className="w-full rounded-lg border border-stroke bg-gray-100 py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" // CORREGIDO (Línea 228)
                      placeholder="Repite tu contraseña"
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                    />
                    <KeyRound
                      className="absolute right-4 text-gray-500"
                      size={20}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mb-5 mt-4">
            <Button className="w-full" type="submit" variant="save">
              Registrarse
            </Button>
          </div>

          <div className="flex items-center mt-4">
            <div className="flex-grow border-b border-gray-300"></div>
            <div className="mx-4">o</div>
            <div className="flex-grow border-b border-gray-300"></div>
          </div>

          <div className="mt-6 text-center">
            <p>
              ¿Ya tienes una cuenta?{' '}
              <Link
                className="text-blue-400"
                href={callbackUrl !== '/' ? `/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/sign-in"}
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
