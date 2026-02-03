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

// Esquema de validación
const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have at least 8 characters')
});

const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  /**
   * 🔑 LÓGICA DE REDIRECCIÓN:
   * Si en la URL existe un callbackUrl (ej. porque el middleware protegió una ruta), úsalo.
   * Si no existe (login directo), manda al Home ('/').
   */
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
      redirect: false // Evitamos redirección automática para manejar el Toast y el refresh
    });

    if (signInData?.error) {
      toast({
        title: 'Error',
        description: 'Credenciales incorrectas',
        variant: 'destructive'
      });
      return;
    }

    // Personalizamos el mensaje según el destino
    const isBooking = callbackUrl.includes('booking');

    toast({
      title: 'Sesión iniciada',
      description: isBooking
        ? 'Redirigiendo a tu reserva...'
        : 'Bienvenido de nuevo'
    });

    // Forzamos actualización de la sesión y redirigimos
    router.refresh();
    router.push(callbackUrl);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Form {...form}>
        <form
          className="max-w-md w-full p-4 border border-gray-300 rounded-md"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold mb-6 text-center">
            Iniciar Sesión
          </h1>

          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="correo@ejemplo.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PASSWORD */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mb-5 mt-6">
            <Button className="w-full" type="submit">
              Iniciar sesión
            </Button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link
                className="text-blue-700 hover:underline"
                href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              >
                Regístrate
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
