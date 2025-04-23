'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Edit2, User, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProfileTypes } from './types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react'; // Ajusta esto según tu sistema de autenticación
import { UploadFile } from '@/app/actions/upload/uploadFile';
import { getUserImage } from '@/app/actions/upload/getUsersImage';

const profileSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  phone: z.string().min(10, { message: 'Número de teléfono inválido' })
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: session } = useSession();
  const userId = Number(session?.user?.id);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: ProfileTypes
  });

  useEffect(() => {
    const fetchUserImage = async () => {
      if (!userId) return;

      try {
        const result = await getUserImage();

        if (result.success && result.image) {
          setAvatarSrc(result.image);
        }
      } catch (error) {
        console.error('Error al cargar la imagen del usuario:', error);
      }
    };

    fetchUserImage();
  }, [userId]);

  const onSubmit = (data: ProfileFormValues) => {
    setIsEditing(false);
    toast({
      title: 'Perfil actualizado',
      description: 'Tu información de perfil ha sido actualizada exitosamente.'
    });
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'El archivo seleccionado no es una imagen válida.',
        variant: 'destructive'
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'La imagen es demasiado grande. El tamaño máximo es 5MB.',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsUploading(true);

      // Convertir la imagen a base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        setAvatarSrc(base64String);

        const result = await UploadFile(userId, base64String);

        if (result.success) {
          toast({
            title: 'Imagen actualizada',
            description: 'Tu foto de perfil ha sido actualizada exitosamente.'
          });
          const event = new CustomEvent('user-image-updated');
          window.dispatchEvent(event);
        } else {
          toast({
            title: 'Error',
            description:
              result.error ||
              'No se pudo actualizar la imagen. Inténtalo de nuevo.',
            variant: 'destructive'
          });

          const imageResult = await getUserImage();

          if (imageResult.success && imageResult.image) {
            setAvatarSrc(imageResult.image);
          }
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error al procesar la imagen.',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (!userId) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="p-6">
            <p>Debes iniciar sesión para ver tu perfil.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                    <div className="relative">
                      <Avatar
                        className={`w-20 h-20 relative ${isEditing ? 'cursor-pointer hover:opacity-80' : ''}`}
                        onClick={handleAvatarClick}
                      >
                        {avatarSrc ? (
                          <AvatarImage
                            src={avatarSrc}
                            alt={ProfileTypes.name}
                          />
                        ) : null}
                        <AvatarFallback>
                          <User className="w-10 h-10" />
                        </AvatarFallback>
                        {isUploading && (
                          <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </Avatar>
                      {isEditing && (
                        <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1">
                          <Upload size={14} />
                        </div>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={isUploading}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit2 className="mr-2 h-4 w-4" />{' '}
                      {isEditing ? 'Cancelar' : 'Editar Perfil'}
                    </Button>
                  </div>
                  {isEditing && (
                    <p className="text-sm text-muted-foreground">
                      Haz clic en la imagen para cambiar tu foto de perfil
                    </p>
                  )}
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="username"
                        {...register('username')}
                        disabled={!isEditing}
                      />
                      {errors.username && (
                        <p className="text-red-500 text-sm">
                          {errors.username.message}
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
