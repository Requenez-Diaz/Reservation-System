// components/forms/create-testimonial-form.tsx

'use client';

import { useState, useTransition, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
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
  const [_bedrooms, setBedrooms] = useState<Bedroom[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [_selectedRoom, setSelectedRoom] = useState('');
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

        if (bedroomsResult.success) {
          setBedrooms(bedroomsResult.bedrooms);
        } else {
          console.warn(
            'No se pudieron cargar las habitaciones:',
            bedroomsResult.error
          );
        }

        if (userResult.success) {
          setCurrentUser(userResult.user);
        } else {
          toast({
            title: 'Error de autenticación',
            description: 'Debes iniciar sesión para crear un testimonial',
            variant: 'destructive'
          });
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
        toast({
          title: 'Error',
          description: 'Error al cargar los datos del formulario',
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
    if (!formDataState) return;

    startTransition(async () => {
      try {
        const result = await createTestimonial(formDataState);

        if (result.success) {
          toast({
            title: '¡Testimonial enviado!',
            description:
              'Tu experiencia está siendo revisada y se publicará pronto.'
          });

          const form = document.getElementById(
            'create-testimonial-form'
          ) as HTMLFormElement;
          form?.reset();
          setRating(5);
          setSelectedRoom('');

          onSuccess?.();
        } else {
          toast({
            title: 'Error al crear testimonial',
            description: result.error,
            variant: 'destructive'
          });
        }
      } catch (error) {
        console.error('Error in form submission:', error);
        toast({
          title: 'Error inesperado',
          description: 'Ocurrió un error al procesar tu solicitud',
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
          <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Inicia sesión requerido
          </h3>
          <p className="text-gray-600 mb-4">
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
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
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
            id="create-testimonial-form"
            onSubmit={handlePreSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Nombre completo
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={currentUser.name || currentUser.username || ''}
                  required
                  disabled={isPending}
                  className="transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Ubicación
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Ciudad, País"
                  required
                  disabled={isPending}
                  className="transition-colors"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Calificación general
              </Label>
              <div className="flex items-center space-x-2">
                <RatingStars
                  rating={rating}
                  interactive={true}
                  size="md"
                  onRatingChange={setRating}
                />
                <span className="text-sm text-gray-600 ml-2">({rating}/5)</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment" className="text-sm font-medium">
                Tu experiencia
              </Label>
              <Textarea
                id="comment"
                name="comment"
                placeholder="Cuéntanos sobre tu estancia: ¿qué te gustó más? ¿Recomendarías este lugar?"
                rows={4}
                required
                disabled={isPending}
                className="transition-colors resize-none"
              />
              <p className="text-xs text-gray-500">
                Comparte detalles específicos que puedan ayudar a otros
                huéspedes
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
              disabled={isPending}
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
              disabled={isPending}
              className="bg-red-500 text-white *:hover:bg-red-600 transition-colors"
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmit}
              disabled={isPending}
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
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
