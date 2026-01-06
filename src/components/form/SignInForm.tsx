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

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters')
});

const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  // 🔑 LEER callbackUrl O FORZAR booking/form
  const callbackUrl = searchParams.get('callbackUrl') || '/booking/form';

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
        title: 'Error',
        description: 'Credenciales incorrectas',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Sesión iniciada',
      description: 'Redirigiendo a tu reserva...'
    });

    router.refresh();
    router.push(callbackUrl); // ✅ SIEMPRE booking/form
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Form {...form}>
        <form
          className="max-w-md w-full p-4 border border-gray-300 rounded-md"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mb-5 mt-4">
            <Button className="w-full" type="submit" variant="save">
              Iniciar sesión
            </Button>
          </div>

          <div className="mt-4 text-center">
            <p>
              ¿No tienes cuenta?{' '}
              <Link
                className="text-blue-700"
                href={`/sign-up?callbackUrl=${callbackUrl}`}
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
