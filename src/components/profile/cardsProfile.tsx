'use client';

import type React from 'react';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Edit2,
  User,
  Upload,
  KeyRound,
  Bell,
  LogOut,
  Image as ImageIcon,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { useSession, signOut } from 'next-auth/react';

// Importa todas las acciones necesarias
import { UploadFile } from '@/app/actions/upload/uploadFile';
import { getUserImage } from '@/app/actions/upload/getUsersImage';
import {
  getProfileData,
  updateProfileData,
  ProfileData
} from '@/app/actions/upload/getProfile';
import { changePassword } from '@/app/actions/upload/change-password';

const profileSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Correo electrónico inválido' })
});

// NUEVO SCHEMA PARA CONTRASEÑA
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Requerida' }),
    newPassword: z.string().min(8, {
      message: 'La nueva contraseña debe tener al menos 8 caracteres.'
    }),
    confirmNewPassword: z.string().min(1, { message: 'Requerida' })
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmNewPassword']
  });

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

type SettingsTab = 'general' | 'security' | 'avatar' | 'notifications';

interface AvatarCardProps {
  avatarSrc: string | null;
  isUploading: boolean;
  isEditing: boolean;
  name: string;
  onAvatarClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AvatarCard: React.FC<AvatarCardProps> = ({
  avatarSrc,
  isUploading,
  isEditing,
  name,
  onAvatarClick,
  fileInputRef,
  onFileChange
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <ImageIcon className="w-5 h-5" />
        Foto de Perfil
      </CardTitle>
      <CardDescription>
        Tu avatar ayuda a identificar tu cuenta en toda la aplicación.
      </CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar
          className={`w-32 h-32 relative transition-opacity ${isEditing ? 'cursor-pointer hover:opacity-80 ring-4 ring-primary ring-offset-2' : ''}`}
          onClick={onAvatarClick}
        >
          {avatarSrc ? <AvatarImage src={avatarSrc} alt={name} /> : null}
          <AvatarFallback className="bg-muted">
            <User className="w-12 h-12 text-muted-foreground" />
          </AvatarFallback>
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </Avatar>
        {isEditing && (
          <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 shadow-lg transition-transform hover:scale-105">
            <Upload size={16} />
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={onFileChange}
          disabled={isUploading || !isEditing}
        />
      </div>
      <p className="text-sm text-muted-foreground text-center">
        {isEditing
          ? 'Haz clic en la imagen para cambiarla (máx. 5MB, JPG/PNG)'
          : 'Presiona "Editar Perfil" en la pestaña General para cambiar'}
      </p>
    </CardContent>
  </Card>
);

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false); // NUEVO ESTADO
  const [defaultProfile, setDefaultProfile] = useState<ProfileData>({
    username: 'Cargando...',
    email: 'Cargando...'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: session } = useSession();
  const userId = Number(session?.user?.id);

  const {
    register: profileRegister,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
    reset: profileReset,
    getValues
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: defaultProfile
  });

  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: passwordReset
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  });

  const fetchProfileAndImage = useCallback(async () => {
    if (!userId) return;

    try {
      const profileResult = await getProfileData();
      if (profileResult.success && profileResult.data) {
        setDefaultProfile(profileResult.data);
        profileReset(profileResult.data);
      } else {
        toast({
          title: 'Error de carga',
          description:
            profileResult.error ||
            'No se pudieron cargar los datos del perfil.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error al cargar datos del perfil:', error);
    }

    try {
      const imageResult = await getUserImage();
      if (imageResult.success && imageResult.image) {
        setAvatarSrc(imageResult.image);
      }
    } catch (error) {
      console.error('Error al cargar la imagen del usuario:', error);
    }
  }, [userId, profileReset]);

  useEffect(() => {
    fetchProfileAndImage();
  }, [fetchProfileAndImage]);

  const onProfileSubmit = async (data: ProfileFormValues) => {
    try {
      const result = await updateProfileData(data);

      if (result.success) {
        setDefaultProfile(data);
        setIsEditing(false);
        toast({
          title: 'Perfil actualizado',
          description:
            'Tu información de perfil ha sido actualizada exitosamente.'
        });
      } else {
        toast({
          title: 'Error de actualización',
          description:
            result.error ||
            'No se pudo actualizar el perfil. Inténtalo de nuevo.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error inesperado al guardar.',
        variant: 'destructive'
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    profileReset(defaultProfile);
  };

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    const { currentPassword, newPassword } = data;

    try {
      const result = await changePassword(currentPassword, newPassword);

      if (result.success) {
        toast({
          title: 'Contraseña Actualizada',
          description: 'Tu contraseña ha sido cambiada exitosamente.'
        });
        passwordReset();
        setIsPasswordFormOpen(false);
      } else {
        toast({
          title: 'Error de Seguridad',
          description:
            result.error ||
            'No se pudo cambiar la contraseña. Verifica la contraseña actual.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error inesperado al cambiar la contraseña.',
        variant: 'destructive'
      });
    }
  };

  if (!userId || defaultProfile.username === 'Cargando...') {
    return (
      <div className="container mx-auto p-4 md:p-10 flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-muted-foreground">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  const NavLink: React.FC<{
    tab: SettingsTab;
    icon: React.ReactNode;
    label: string;
  }> = ({ tab, icon, label }) => (
    <button
      type="button"
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all hover:bg-muted/50 ${
        activeTab === tab
          ? 'bg-muted font-semibold text-primary'
          : 'text-muted-foreground'
      }`}
      onClick={() => setActiveTab(tab)}
    >
      {icon}
      {label}
    </button>
  );

  function handleAvatarClick(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="container mx-auto p-4 md:p-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64">
          <h2 className="text-3xl font-extrabold mb-2 tracking-tight">
            Configuración
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Ajusta tu cuenta y preferencias.
          </p>

          <nav className="flex flex-col gap-1 p-2 border rounded-xl bg-card shadow-sm">
            <NavLink
              tab="general"
              icon={<User className="h-5 w-5" />}
              label="General"
            />
            <NavLink
              tab="avatar"
              icon={<ImageIcon className="h-5 w-5" />}
              label="Foto de Perfil"
            />
            <NavLink
              tab="security"
              icon={<KeyRound className="h-5 w-5" />}
              label="Seguridad"
            />
            <NavLink
              tab="notifications"
              icon={<Bell className="h-5 w-5" />}
              label="Notificaciones"
            />
            <Separator className="my-2" />
            <Button
              variant="ghost"
              className="justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => signOut()}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Cerrar Sesión
            </Button>
          </nav>
        </div>

        <div className="flex-1 min-w-0">
          {activeTab === 'general' && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Información de la Cuenta
                </CardTitle>
                <CardDescription>
                  Actualiza tu nombre, correo electrónico y teléfono.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleProfileSubmit(onProfileSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="username">Nombre de Usuario</Label>
                      <Input
                        id="username"
                        {...profileRegister('username')}
                        disabled={!isEditing || isProfileSubmitting}
                        className="transition-all focus-visible:ring-primary"
                      />
                      {profileErrors.username && (
                        <p className="text-red-500 text-sm">
                          {profileErrors.username.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        {...profileRegister('email')}
                        disabled={!isEditing || isProfileSubmitting}
                        type="email"
                        className="transition-all focus-visible:ring-primary"
                      />
                      {profileErrors.email && (
                        <p className="text-red-500 text-sm">
                          {profileErrors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t mt-4">
                    <Button
                      type="button"
                      variant={isEditing ? 'outline' : 'default'}
                      onClick={() => setIsEditing(!isEditing)}
                      disabled={isProfileSubmitting}
                    >
                      <Edit2 className="mr-2 h-4 w-4" />{' '}
                      {isEditing ? 'Cancelar Edición' : 'Editar Perfil'}
                    </Button>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handleCancel}
                          disabled={isProfileSubmitting}
                        >
                          Descartar
                        </Button>
                        <Button
                          type="submit"
                          variant={'default'}
                          disabled={isProfileSubmitting}
                        >
                          {isProfileSubmitting ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          ) : null}
                          Guardar Cambios
                        </Button>
                      </div>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === 'avatar' && (
            <AvatarCard
              avatarSrc={avatarSrc}
              isUploading={isUploading}
              isEditing={isEditing}
              name={getValues('username')}
              onAvatarClick={handleAvatarClick}
              fileInputRef={fileInputRef}
              onFileChange={handleFileChange}
            />
          )}

          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Seguridad de la Cuenta
                </CardTitle>
                <CardDescription>
                  Configura tu contraseña y autenticación de dos factores.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-medium flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Cambiar Contraseña
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Actualiza tu contraseña para mantener tu cuenta segura.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setIsPasswordFormOpen(!isPasswordFormOpen)}
                    >
                      {isPasswordFormOpen ? 'Cancelar' : 'Cambiar'}
                    </Button>
                  </div>

                  {isPasswordFormOpen && (
                    <form
                      onSubmit={handlePasswordSubmit(onPasswordSubmit)}
                      className="space-y-4 border-t pt-4"
                    >
                      <div className="grid gap-2">
                        <Label htmlFor="currentPassword">
                          Contraseña Actual
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          {...passwordRegister('currentPassword')}
                          disabled={isPasswordSubmitting}
                        />
                        {passwordErrors.currentPassword && (
                          <p className="text-red-500 text-sm">
                            {passwordErrors.currentPassword.message}
                          </p>
                        )}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="newPassword">Nueva Contraseña</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          {...passwordRegister('newPassword')}
                          disabled={isPasswordSubmitting}
                        />
                        {passwordErrors.newPassword && (
                          <p className="text-red-500 text-sm">
                            {passwordErrors.newPassword.message}
                          </p>
                        )}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="confirmNewPassword">
                          Confirmar Nueva Contraseña
                        </Label>
                        <Input
                          id="confirmNewPassword"
                          type="password"
                          {...passwordRegister('confirmNewPassword')}
                          disabled={isPasswordSubmitting}
                        />
                        {passwordErrors.confirmNewPassword && (
                          <p className="text-red-500 text-sm">
                            {passwordErrors.confirmNewPassword.message}
                          </p>
                        )}
                      </div>

                      <Button type="submit" disabled={isPasswordSubmitting}>
                        {isPasswordSubmitting ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        ) : null}
                        Establecer Nueva Contraseña
                      </Button>
                    </form>
                  )}
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">
                      Autenticación de Dos Factores (2FA)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Añade una capa extra de seguridad a tu cuenta.
                    </p>
                  </div>
                  <Button variant="outline" disabled>
                    Activar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Preferencias de Notificación
                </CardTitle>
                <CardDescription>
                  Decide cómo y cuándo quieres ser notificado.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Aquí irían los toggles para activar/desactivar correos
                  electrónicos, notificaciones push, etc.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
