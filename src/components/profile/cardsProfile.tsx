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
  onSubmit: (data: ProfileFormValues) => Promise<void>;
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
    resolver: zodResolver(profileSchema),
    defaultValues: defaultProfile,
    values: defaultProfile
  });

  // Estilos específicos para las acciones (sobreescriben los 'variants' si es necesario):

  // 1. Botón de Acción Primaria (Editar / Cancelar Edición)
  const editCancelEditButtonClass = isEditing
    ? 'bg-stone-500 hover:bg-stone-600 text-white shadow-md shadow-stone-500/50' // Color neutro para "Cancelar Edición"
    : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/50'; // Color principal para "Editar"

  // 2. Botón de Acción Positiva (Guardar Cambios)
  const saveButtonClass =
    'bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-600/50'; // Verde (estándar de guardar)

  // 3. Botón de Acción Secundaria/Negativa (Descartar/Cancelar)
  const discardButtonClass =
    'bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/50'; // Rojo (estándar de descartar)

  // Para el spinner de carga (usamos el color del botón principal que se usa en el momento)
  const spinnerColor = isEditing
    ? 'border-green-600 border-t-transparent'
    : 'border-white border-t-transparent';

  return (
    // Se mantiene el diseño naranja/cálido de la tarjeta
    <Card className="border-2 border-orange-600 bg-gradient-to-br from-orange-50/50 to-white/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-orange-700">
          Información de la Cuenta
        </CardTitle>
        <CardDescription className="text-orange-900/80">
          Actualiza tu nombre, correo electrónico y teléfono.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username" className="text-orange-700">
                Nombre de Usuario
              </Label>
              <Input
                id="username"
                {...register('username')}
                disabled={!isEditing || isSubmitting}
                className="transition-all focus-visible:ring-orange-500 focus-visible:ring-2 focus-visible:ring-offset-2"
              />
              {errors.username && (
                <p className="text-red-600 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-orange-700">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                {...register('email')}
                disabled={!isEditing || isSubmitting}
                type="email"
                className="transition-all focus-visible:ring-orange-500 focus-visible:ring-2 focus-visible:ring-offset-2"
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t mt-4">
            {/* Botón de Editar / Cancelar Edición */}
            <Button
              type="button"
              className={editCancelEditButtonClass} // Aplica el estilo condicional
              onClick={onEditToggle}
              disabled={isSubmitting}
            >
              <Edit2 className="mr-2 h-4 w-4" />
              {isEditing ? 'Cancelar Edición' : 'Editar Perfil'}
            </Button>

            {isEditing && (
              <div className="flex gap-2">
                {/* Botón de Descartar (Acción Negativa/Secundaria) */}
                <Button
                  type="button"
                  className={discardButtonClass} // Rojo para descartar
                  onClick={onCancel}
                  disabled={isSubmitting}
                >
                  Descartar
                </Button>

                {/* Botón de Guardar Cambios (Acción Positiva/Primaria) */}
                <Button
                  type="submit"
                  className={saveButtonClass} // Verde para guardar
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    // Spinner usando el color del botón (verde)
                    <div
                      className={`w-4 h-4 border-2 rounded-full animate-spin mr-2 border-white ${isEditing ? 'border-t-green-700' : 'border-t-orange-700'}`}
                    ></div>
                  ) : null}
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
