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
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { requestPasswordReset } from '@/app/actions/recovery-password/recovery-password';

const FormSchema = z.object({
  email: z.string().min(1, 'El email es requerido').email('Email inválido')
});

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const result = await requestPasswordReset(values.email);

      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: 'Email enviado',
          description: result.message
        });
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Hubo un problema al enviar el email. Intenta de nuevo.',
        variant: 'destructive'
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full p-8 border border-gray-300 rounded-md text-center">
          <div className="mb-6">
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Email enviado</h2>
          <p className="text-muted-foreground mb-6">
            Hemos enviado un enlace de recuperación a tu correo electrónico. Por
            favor revisa tu bandeja de entrada y sigue las instrucciones.
          </p>
          <Link href="/sign-in">
            <Button variant={'success'} className="w-full">
              Volver al inicio de sesión
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Form {...form}>
        <form
          className="max-w-md w-full p-8 border border-gray-300 rounded-md"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Recuperar contraseña</h2>
            <p className="text-muted-foreground text-sm">
              Ingresa tu email y te enviaremos un enlace para restablecer tu
              contraseña.
            </p>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl className="relative">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      className="w-full rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      {...field}
                    />
                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-6">
            <Button
              className="w-full"
              disabled={form.formState.isSubmitting}
              type="submit"
              variant={'save'}
            >
              {form.formState.isSubmitting
                ? 'Enviando...'
                : 'Enviar enlace de recuperación'}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/sign-in"
              className="text-sm text-blue-700 hover:underline"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
