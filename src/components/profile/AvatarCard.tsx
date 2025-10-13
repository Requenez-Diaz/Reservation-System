'use client';

import type React from 'react';
import { User, Upload, ImageIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

interface AvatarCardProps {
  avatarSrc: string | null;
  isUploading: boolean;
  isEditing: boolean;
  name: string;
  onAvatarClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AvatarCard({
  avatarSrc,
  isUploading,
  isEditing,
  name,
  onAvatarClick,
  fileInputRef,
  onFileChange
}: AvatarCardProps) {
  // Color principal naranja para la UI:
  const primaryOrange = 'text-orange-600';
  const primaryOrangeBg = 'bg-orange-600';

  return (
    // 1. Tarjeta: Borde, fondo con degradado y sombra naranja.
    <Card
      className={`border-2 border-orange-600 bg-gradient-to-br from-orange-50/50 to-white/50 transition-all duration-300 ${
        isEditing
          ? 'shadow-xl shadow-orange-500/30' // Sombra más pronunciada al editar
          : 'shadow-md'
      }`}
    >
      <CardHeader>
        <CardTitle
          className={`flex items-center gap-2 text-lg font-semibold ${primaryOrange}`}
        >
          <ImageIcon className={`w-5 h-5 ${primaryOrange}`} />
          Foto de Perfil
        </CardTitle>
        <CardDescription className="text-orange-900/80">
          Tu avatar ayuda a identificar tu cuenta en toda la aplicación.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 py-6">
        <div className="relative group">
          <Avatar
            className={`w-36 h-36 relative transition-all duration-300 ${
              isEditing
                ? 'cursor-pointer ring-4 ring-orange-400 ring-offset-4 ring-offset-background hover:ring-orange-500 hover:ring-6 hover:scale-105'
                : 'ring-2 ring-orange-300'
            }`}
            onClick={onAvatarClick}
          >
            {avatarSrc ? (
              <AvatarImage
                src={avatarSrc || '/placeholder.svg'}
                alt={name}
                className="object-cover"
              />
            ) : null}
            {/* Fallback: Degradado naranja suave */}
            <AvatarFallback className="bg-gradient-to-br from-orange-100 to-orange-50/50">
              <User className={`w-14 h-14 ${primaryOrange}`} />
            </AvatarFallback>

            {/* Estado de Carga (Uploading): Degradado naranja oscuro con spinner blanco */}
            {isUploading && (
              <div
                className={`absolute inset-0 ${primaryOrangeBg} rounded-full flex items-center justify-center bg-opacity-80`}
              >
                <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Overlay de Edición: Aparece en hover cuando se está editando */}
            {isEditing && !isUploading && (
              <div className="absolute inset-0 bg-orange-600/70 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                <Upload className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
            )}
          </Avatar>

          {/* Icono Flotante de Carga (Upload): Botón de acción al editar */}
          {isEditing && (
            <div
              className={`absolute -bottom-1 -right-1 bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-orange-700/50 border-4 border-white`}
            >
              <Upload size={18} strokeWidth={2.5} />
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

        {/* Mensajes de Ayuda */}
        <div className="text-center space-y-1 max-w-xs">
          <p className="text-sm text-orange-700 leading-relaxed font-medium">
            {isEditing
              ? 'Haz clic en la imagen para cambiarla'
              : 'Presiona "Editar Perfil" para cambiar'}
          </p>
          {isEditing && (
            <p className="text-xs text-orange-500/80">
              Máximo 5MB • JPG, PNG o WebP
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
