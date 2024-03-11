'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { LucideEyeOff } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SignUpForms = () => {
  const formSchema = z.object({
    name: z.string().min(15),
    lastName: z.string().min(15),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md w-full p-4 border border-gray-300 rounded-md"
        >
          <div className="flex items-center justify-center content-center top-2 ">
            <Image src={'/next.svg'} height={120} width={120} alt="image" />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
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
                  <Input placeholder="" {...field} />
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
                  <Input type="password" placeholder="" {...field} />
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
                <FormLabel>Confirmar contraseña</FormLabel>
                <FormControl className="relative">
                  <div className="flex items-center">
                    <Input type="password" placeholder="" {...field}></Input>
                    {/* <LucideEyeOff className="ml-2" /> */}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-blue-600 mt-2 justify-center content-center min-w-min text-white"
          >
            Iniciar sesión
          </Button>
          <div className="flex items-center mt-4">
            <div className="flex-grow border-b border-gray-300"></div>
            <div className="mx-4">or</div>
            <div className="flex-grow border-b border-gray-300"></div>
          </div>
          <p className="text-center mt-4">
            Si no tienes una cuenta, regístrate&nbsp;
            <span className="text-blue-600">aquí</span>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForms;
