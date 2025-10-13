'use client';

import type React from 'react';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';

import { UploadFile } from '@/app/actions/upload/uploadFile';
import { getUserImage } from '@/app/actions/upload/getUsersImage';
import {
  getProfileData,
  updateProfileData,
  type ProfileData
} from '@/app/actions/upload/getProfile';
import { changePassword } from '@/app/actions/upload/change-password';
import {
  ProfileNavigation,
  SettingsTab
} from '@/components/profile/ProfileNavigations';
import {
  PasswordFormValues,
  ProfileFormValues
} from '@/lib/schemas/schemas-profile';
import { GeneralTab } from '@/components/profile/cardsProfile';
import { AvatarCard } from '@/components/profile/AvatarCard';
import { SecurityTab } from '@/components/profile/SecurityTabs';
import { NotificationsTab } from '@/components/profile/NotificationsTabs';

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [defaultProfile, setDefaultProfile] = useState<ProfileData>({
    username: 'Cargando...',
    email: 'Cargando...'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: session } = useSession();
  const userId = Number(session?.user?.id);

  const fetchProfileAndImage = useCallback(async () => {
    if (!userId) return;

    try {
      const profileResult = await getProfileData();
      if (profileResult.success && profileResult.data) {
        setDefaultProfile(profileResult.data);
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
      console.error('Error al cargar la imagen de perfil:', error);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfileAndImage();
  }, [fetchProfileAndImage]);

  const handleProfileSubmit = async (data: ProfileFormValues) => {
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

  const handlePasswordSubmit = async (data: PasswordFormValues) => {
    const { currentPassword, newPassword } = data;

    try {
      const result = await changePassword(currentPassword, newPassword);

      if (result.success) {
        toast({
          title: 'Contraseña Actualizada',
          description: 'Tu contraseña ha sido cambiada exitosamente.'
        });
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

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (!file) {
      return;
    }

    if (isUploading) {
      toast({
        title: 'Carga en progreso',
        description: 'Por favor espera a que termine la carga actual.',
        variant: 'destructive'
      });
      return;
    }
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Tipo de archivo inválido',
        description: 'Solo se permiten imágenes JPG, PNG o WebP.',
        variant: 'destructive'
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      console.log('[v0] File too large:', file.size);
      toast({
        title: 'Archivo muy grande',
        description: 'La imagen debe ser menor a 5MB.',
        variant: 'destructive'
      });
      return;
    }

    if (!userId) {
      toast({
        title: 'Error de sesión',
        description:
          'No se pudo identificar tu usuario. Por favor inicia sesión nuevamente.',
        variant: 'destructive'
      });
      return;
    }

    setIsUploading(true);

    try {
      const reader = new FileReader();

      const imageBase64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to read file as base64'));
          }
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
      const result = await UploadFile(userId, imageBase64);

      if (result.success) {
        setAvatarSrc(imageBase64);

        toast({
          title: 'Avatar actualizado',
          description: 'Tu foto de perfil ha sido actualizada exitosamente.'
        });
      } else {
        toast({
          title: 'Error de carga',
          description: result.error || 'No se pudo subir la imagen.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          'Ocurrió un error al subir la imagen. Por favor intenta de nuevo.',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!userId || defaultProfile.username === 'Cargando...') {
    return (
      <div className="container mx-auto p-4 md:p-10 flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-3"></div>

          <p className="text-orange-700">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-10">
      <div className="flex flex-col md:flex-row gap-8">
        <ProfileNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1 min-w-0">
          {activeTab === 'general' && (
            <GeneralTab
              defaultProfile={defaultProfile as ProfileFormValues}
              isEditing={isEditing}
              onEditToggle={() => setIsEditing(!isEditing)}
              onSubmit={handleProfileSubmit}
              onCancel={handleCancel}
            />
          )}

          {activeTab === 'avatar' && (
            <AvatarCard
              avatarSrc={avatarSrc}
              isUploading={isUploading}
              isEditing={isEditing}
              name={defaultProfile.username}
              onAvatarClick={handleAvatarClick}
              fileInputRef={fileInputRef}
              onFileChange={handleFileChange}
            />
          )}

          {activeTab === 'security' && (
            <SecurityTab onPasswordSubmit={handlePasswordSubmit} />
          )}

          {activeTab === 'notifications' && <NotificationsTab />}
        </div>
      </div>
    </div>
  );
}
