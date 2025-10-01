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
import { Mail, UserIcon, Eye, Lock, EyeOff, KeyRound } from 'lucide-react';
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
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
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
        const signInResult = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password
        });

        if (signInResult?.error) {
          toast({
            title: 'Error de autenticación',
            description:
              'No se pudo iniciar sesión automáticamente. Por favor, inténtelo manualmente.',
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Usuario registrado con éxito',
            description: 'Será redirigido al panel de control.',
            variant: 'default'
          });
          router.push('/');
        }
      }
    } catch (error: any) {
      if (error.message === 'Email already exists') {
        toast({
          title: 'Error de registro',
          description: 'Este correo electrónico ya está registrado.',
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Error de registro',
          description: 'Ocurrió un error inesperado al registrar el usuario.',
          variant: 'destructive'
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md w-full p-4 border border-gray-300 rounded-md"
        >
          <div className="flex items-center justify-center content-center top-2">
            <Image src={'/next.svg'} height={120} width={120} alt="image" />
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
                      placeholder="Ingrese su nombre de usuario"
                      {...field}
                      className="w-full rounded-lg border border-stroke bg-gray-100 py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <UserIcon
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      placeholder="Ingrese su correo electrónico"
                      {...field}
                      className="w-full rounded-lg border border-stroke bg-gray-100 py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Ingrese su contraseña"
                      {...field}
                      className="w-full rounded-lg border border-stroke bg-gray-100 py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-gray-500"
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
                      placeholder="Repite tu contraseña"
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      className="w-full rounded-lg border border-stroke bg-gray-100 py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
            <Button type="submit" className="w-full" variant="save">
              Registrarse
            </Button>
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
            onClick={() => signIn('google')}
          >
            <span>
              <Image src="/google.svg" width={20} height={20} alt="Google" />
            </span>
            Iniciar sesión con Google
          </button>

          <div className="flex items-center mt-4">
            <div className="flex-grow border-b border-gray-300"></div>
            <div className="mx-4">o</div>
            <div className="flex-grow border-b border-gray-300"></div>
          </div>

          <div className="mt-6 text-center">
            <p>
              ¿Ya tienes una cuenta?{' '}
              <Link href="/sign-in" className="text-blue-400">
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
