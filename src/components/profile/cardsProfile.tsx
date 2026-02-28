'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit2 } from 'lucide-react';
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
import {
  ProfileFormValues,
  profileSchema
} from '@/lib/schemas/schemas-profile';

interface GeneralTabProps {
  defaultProfile: ProfileFormValues;
  isEditing: boolean;
  onEditToggle: () => void;
  onSubmit: (_data: ProfileFormValues) => Promise<void>;
  onCancel: () => void;
}

export function GeneralTab({
  defaultProfile,
  isEditing,
  onEditToggle,
  onSubmit,
  onCancel
}: GeneralTabProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProfileFormValues>({
    defaultValues: defaultProfile,
    resolver: zodResolver(profileSchema),
    values: defaultProfile
  });

  const editCancelEditButtonClass = isEditing
    ? 'bg-gray-500 hover:bg-gray-600 text-white shadow-md shadow-gray-500/50'
    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md shadow-blue-500/50';

  const saveButtonClass =
    'bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-600/50';

  const discardButtonClass =
    'bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/50';

  return (
    <Card className="bg-white dark:bg-slate-900 shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-700">
          Información de la Cuenta
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Actualiza tu nombre, correo electrónico y teléfono.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6">
            <div className="grid gap-2">
              <Label className="text-blue-700" htmlFor="username">
                Nombre de Usuario
              </Label>
              <Input
                className="transition-all focus-visible:ring-blue-500 focus-visible:ring-2 focus-visible:ring-offset-2"
                disabled={!isEditing || isSubmitting}
                id="username"
                {...register('username')}
              />
              {errors.username && (
                <p className="text-red-600 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label className="text-blue-700" htmlFor="email">
                Correo Electrónico
              </Label>
              <Input
                className="transition-all focus-visible:ring-blue-500 focus-visible:ring-2 focus-visible:ring-offset-2"
                disabled={!isEditing || isSubmitting}
                id="email"
                type="email"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between pt-4 mt-4 border-t border-gray-200 dark:border-slate-700 gap-2">
            <Button
              className={`${editCancelEditButtonClass} w-full sm:w-auto`}
              disabled={isSubmitting}
              onClick={onEditToggle}
              type="button"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              {isEditing ? 'Cancelar Edición' : 'Editar Perfil'}
            </Button>

            {isEditing && (
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button
                  className={`${discardButtonClass} w-full sm:w-auto`}
                  disabled={isSubmitting}
                  onClick={onCancel}
                  type="button"
                >
                  Descartar
                </Button>

                <Button
                  className={`${saveButtonClass} w-full sm:w-auto`}
                  disabled={isSubmitting}
                  type="submit" //
                >
                  {isSubmitting && (
                    <div className="w-4 h-4 border-2 border-white border-t-green-700 rounded-full animate-spin mr-2 inline-block"></div>
                  )}
                  Guardar Cambios
                </Button>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
