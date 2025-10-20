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
              aria-hidden="true"
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
            <Button variant="success" className="w-full">
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
          aria-label="Formulario de recuperación de contraseña"
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
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-6">
            <Button
              className="w-full flex items-center justify-center gap-2"
              disabled={form.formState.isSubmitting}
              type="submit"
              variant="save"
            >
              {form.formState.isSubmitting && (
                <div className="w-4 h-4 border-2 border-white border-t-blue-600 rounded-full animate-spin" />
              )}
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
