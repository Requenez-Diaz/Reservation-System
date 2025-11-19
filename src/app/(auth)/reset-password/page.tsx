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

        // Redirigir al login después de 2 segundos
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full p-8 border border-gray-300 rounded-md text-center">
          <p className="text-muted-foreground">Validando token...</p>
        </div>
      </div>
    );
  }

  if (!token || !isValidToken) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full p-8 border border-gray-300 rounded-md text-center">
          <h2 className="text-2xl font-bold mb-4">Enlace inválido</h2>
          <p className="text-muted-foreground mb-6">
            El enlace de recuperación no es válido o ha expirado.
          </p>
          <Link href="/forgot-password">
            {/* CORRECCIÓN 2: Props de Button ordenadas */}
            <Button className="w-full">Solicitar nuevo enlace</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full p-8 border border-gray-300 rounded-md text-center">
          <div className="mb-6">
            <svg
              // CORRECCIÓN 3: Props de SVG ordenadas
              className="mx-auto h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                // CORRECCIÓN 4: Props de path ordenadas
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">¡Contraseña actualizada!</h2>
          <p className="text-muted-foreground mb-6">
            Tu contraseña ha sido restablecida exitosamente. Serás redirigido al
            inicio de sesión...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Form {...form}>
        <form
          // CORRECCIÓN 5: Props de form ordenadas
          className="max-w-md w-full p-8 border border-gray-300 rounded-md"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Nueva contraseña</h2>
            <p className="text-muted-foreground text-sm">
              Ingresa tu nueva contraseña para restablecer tu cuenta.
            </p>
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nueva contraseña</FormLabel>
                <FormControl className="relative">
                  <div className="relative">
                    <Input
                      // CORRECCIÓN 6: Props de Input ordenadas
                      className="w-full rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      placeholder="Ingresa tu nueva contraseña"
                      type="password"
                      {...field}
                    />
                    <span className="absolute right-4 top-4">
                      <svg
                        // CORRECCIÓN 7: Props de SVG ordenadas
                        className="fill-current"
                        fill="none"
                        height="22"
                        viewBox="0 0 22 22"
                        width="22"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill=""
                          />
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Confirmar contraseña</FormLabel>
                <FormControl className="relative">
                  <div className="relative">
                    <Input
                      // CORRECCIÓN 8: Props de Input ordenadas
                      className="w-full rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      placeholder="Confirma tu nueva contraseña"
                      type="password"
                      {...field}
                    />
                    <span className="absolute right-4 top-4">
                      <svg
                        // CORRECCIÓN 9: Props de SVG ordenadas
                        className="fill-current"
                        fill="none"
                        height="22"
                        viewBox="0 0 22 22"
                        width="22"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill=""
                          />
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
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
              // CORRECCIÓN 10: Props de Button ordenadas
              className="w-full"
              disabled={form.formState.isSubmitting}
              type="submit"
              variant={'save'}
            >
              {form.formState.isSubmitting
                ? 'Actualizando...'
                : 'Restablecer contraseña'}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <Link
              // CORRECCIÓN 11: Props de Link ordenadas
              className="text-sm text-blue-700 hover:underline"
              href="/sign-in"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
