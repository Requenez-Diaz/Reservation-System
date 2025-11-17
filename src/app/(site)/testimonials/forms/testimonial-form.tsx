'use client';

import { useState, useTransition, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, User, MapPin } from 'lucide-react';
import {
  createTestimonial,
  getBedrooms,
  getCurrentUser
} from '@/app/actions/testimonials/create-testimonials';
import { RatingStars } from '../components/rating-start';

interface Bedroom {
  id: number;
  typeBedroom: string;
  type: string;
  description?: string;
}

interface CurrentUser {
  id: number;
  username: string;
  email: string;
  name?: string;
}

interface CreateTestimonialFormProps {
  onSuccess?: () => void;
  className?: string;
}

export function CreateTestimonialForm({
  onSuccess,
  className
}: CreateTestimonialFormProps) {
  const [isPending, startTransition] = useTransition();
  const [rating, setRating] = useState(5);
  const [_bedrooms, _setBedrooms] = useState<Bedroom[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formDataState, setFormDataState] = useState<FormData | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);

        const [bedroomsResult, userResult] = await Promise.all([
          getBedrooms(),
          getCurrentUser()
        ]);

        if (userResult.success) {
          setCurrentUser(userResult.user ?? null);
        } else {
          toast({
            description: 'Debes iniciar sesión para crear un testimonial',
            title: 'Error de autenticación',
            variant: 'destructive'
          });
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
        toast({
          description: 'Error al cargar los datos del formulario',
          title: 'Error',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [toast]);

  const handlePreSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set('rating', rating.toString());

    setFormDataState(formData);
    setShowConfirmation(true);
  };

  const handleSubmit = async () => {
    if (!formDataState) {
      return;
    }

    startTransition(async () => {
      try {
        const result = await createTestimonial(formDataState);

        if (result.success) {
          toast({
            description:
              'Tu experiencia está siendo revisada y se publicará pronto.',
            title: '¡Testimonial enviado!'
          });

          const form = document.getElementById(
            'create-testimonial-form'
          ) as HTMLFormElement;
          if (form) {
            form.reset();
          }
          setRating(5);

          if (onSuccess) {
            onSuccess();
          }
        } else {
          toast({
            description: result.error,
            title: 'Error al crear testimonial',
            variant: 'destructive'
          });
        }
      } catch (error) {
        console.error('Error in form submission:', error);
        toast({
          description: 'Ocurrió un error al procesar tu solicitud',
          title: 'Error inesperado',
          variant: 'destructive'
        });
      } finally {
        setShowConfirmation(false);
        setFormDataState(null);
      }
    });
  };

  if (isLoading) {
    return (
      <Card className={`max-w-2xl mx-auto ${className}`}>
        <CardContent className="p-8">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-gray-600">Cargando formulario...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentUser) {
    return (
      <Card className={`max-w-2xl mx-auto ${className}`}>
        <CardContent className="p-8 text-center">
          <User className="mb-4 h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            Inicia sesión requerido
          </h3>
          <p className="mb-4 text-gray-600">
            Debes iniciar sesión para compartir tu experiencia
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Iniciar sesión
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className={`max-w-2xl mx-auto ${className}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Comparte tu experiencia
              </h3>
              <p className="text-sm text-gray-600">
                Hola,{' '}
                <span className="font-medium">
                  {currentUser.name || currentUser.username}
                </span>
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <form
            className="space-y-6"
            id="create-testimonial-form"
            onSubmit={handlePreSubmit}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium" htmlFor="name">
                  Nombre completo
                </Label>
                <Input
                  className="transition-colors"
                  defaultValue={currentUser.name || currentUser.username || ''}
                  disabled={isPending}
                  id="name"
                  name="name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium" htmlFor="location">
                  <MapPin className="mr-1 inline h-4 w-4" />
                  Ubicación
                </Label>
                <Input
                  className="transition-colors"
                  disabled={isPending}
                  id="location"
                  name="location"
                  placeholder="Ciudad, País"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Calificación general
              </Label>
              <div className="flex items-center space-x-2">
                <RatingStars
                  interactive
                  onRatingChange={setRating}
                  rating={rating}
                  size="md"
                />
                <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium" htmlFor="comment">
                Tu experiencia
              </Label>
              <Textarea
                className="resize-none transition-colors"
                disabled={isPending}
                id="comment"
                name="comment"
                placeholder="Cuéntanos sobre tu estancia: ¿qué te gustó más? ¿Recomendarías este lugar?"
                required
                rows={4}
              />
              <p className="text-xs text-gray-500">
                Comparte detalles específicos que puedan ayudar a otros
                huéspedes
              </p>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
              disabled={isPending}
              type="submit"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publicando testimonial...
                </>
              ) : (
                'Publicar testimonial'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enviar testimonial</AlertDialogTitle>
            <AlertDialogDescription>
              Tu testimonio será enviado para revisión. Una vez aprobado, se
              publicará en la página. ¿Deseas continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-red-500 text-white transition-colors hover:bg-red-600" // CORRECCIÓN: className antes de disabled
              disabled={isPending}
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-blue-600 text-white transition-colors hover:bg-blue-700"
              disabled={isPending}
              onClick={handleSubmit}
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Sí, enviar'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
