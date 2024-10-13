'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Edit2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProfileTypes } from './types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

const profileSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  phone: z.string().min(10, { message: 'Número de teléfono inválido' })
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: ProfileTypes
  });

  const onSubmit = (data: ProfileFormValues) => {
    setIsEditing(false);
    toast({
      title: 'Perfil actualizado',
      description: 'Tu información de perfil ha sido actualizada exitosamente.'
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Perfil de Usuario</h1>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          {/* <TabsTrigger value="reservations">Reservaciones</TabsTrigger> */}
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Información del Perfil</CardTitle>
              <CardDescription>
                Administra tu información personal aquí.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage
                        src={ProfileTypes.avatar}
                        alt={ProfileTypes.name}
                      />
                      <AvatarFallback>
                        <User className="w-10 h-10" />
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit2 className="mr-2 h-4 w-4" />{' '}
                      {isEditing ? 'Cancelar' : 'Editar Perfil'}
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        {...register('name')}
                        disabled={!isEditing}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        {...register('email')}
                        disabled={!isEditing}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        {...register('phone')}
                        disabled={!isEditing}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {isEditing && (
                  <Button type="submit" variant={'success'} className="mt-4">
                    Guardar Cambios
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        {/* <TabsContent value="reservations">
          <Card>
            <CardHeader>
              <CardTitle>Tus Reservaciones</CardTitle>
              <CardDescription>
                Aquí puedes ver tus reservaciones actuales.
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Button variant="outline">Ver todas las reservaciones</Button>
            </CardFooter>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
