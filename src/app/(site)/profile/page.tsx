'use client';

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
import { PreferencesTab } from '@/components/profile/PreferencesTab';
import { SupportTab } from '@/components/profile/SupportTab';

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
    if (!userId) {
      return;
    }

    try {
      const profileResult = await getProfileData();
      if (profileResult.success && profileResult.data) {
        setDefaultProfile(profileResult.data);
      } else {
        toast({
          description:
            profileResult.error ||
            'No se pudieron cargar los datos del perfil.',
          title: 'Error de carga',
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
          description:
            'Tu información de perfil ha sido actualizada exitosamente.',
          title: 'Perfil actualizado'
        });
      } else {
        toast({
          description:
            result.error ||
            'No se pudo actualizar el perfil. Inténtalo de nuevo.',
          title: 'Error de actualización',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        description: 'Ocurrió un error inesperado al guardar.',
        title: 'Error',
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
          description: 'Tu contraseña ha sido cambiada exitosamente.',
          title: 'Contraseña Actualizada'
        });
      } else {
        toast({
          description:
            result.error ||
            'No se pudo cambiar la contraseña. Verifica la contraseña actual.',
          title: 'Error de Seguridad',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        description: 'Ocurrió un error inesperado al cambiar la contraseña.',
        title: 'Error',
        variant: 'destructive'
      });
    }
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (isUploading) {
      toast({
        description: 'Por favor espera a que termine la carga actual.',
        title: 'Carga en progreso',
        variant: 'destructive'
      });
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        description: 'Solo se permiten imágenes JPG, PNG o WebP.',
        title: 'Tipo de archivo inválido',
        variant: 'destructive'
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        description: 'La imagen debe ser menor a 5MB.',
        title: 'Archivo muy grande',
        variant: 'destructive'
      });
      return;
    }

    if (!userId) {
      toast({
        description:
          'No se pudo identificar tu usuario. Por favor inicia sesión nuevamente.',
        title: 'Error de sesión',
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
          description: 'Tu foto de perfil ha sido actualizada exitosamente.',
          title: 'Avatar actualizado'
        });
      } else {
        toast({
          description: result.error || 'No se pudo subir la imagen.',
          title: 'Error de carga',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        description:
          'Ocurrió un error al subir la imagen. Por favor intenta de nuevo.',
        title: 'Error',
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
          <div className="w-10 h-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-blue-700">Cargando perfil...</p>
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
              onCancel={handleCancel}
              onEditToggle={() => setIsEditing(!isEditing)}
              onSubmit={handleProfileSubmit}
            />
          )}

          {activeTab === 'avatar' && (
            <AvatarCard
              avatarSrc={avatarSrc}
              fileInputRef={fileInputRef}
              isEditing={isEditing}
              isUploading={isUploading}
              name={defaultProfile.username}
              onAvatarClick={handleAvatarClick}
              onFileChange={handleFileChange}
            />
          )}

          {activeTab === 'security' && (
            <SecurityTab onPasswordSubmit={handlePasswordSubmit} />
          )}

          {activeTab === 'preferences' && <PreferencesTab />}
          {activeTab === 'support' && <SupportTab />}
        </div>
      </div>
    </div>
  );
}
