import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Phone, Mail, Bed, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import prisma from '@/lib/db';
import { getGalleryImages } from '@/app/actions/upload/get-images-gallery';
import { AddReservation } from '@/components/bookings/components/addReservation';
import { generateWhatsappUrl } from '@/components/bedrooms/messages/message-encode';
import { SelectedDatesDisplay } from '@/components/home/componentsBooksForms/selected-day-display';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const bedroom = await prisma.bedrooms.findUnique({
    where: { slug: params.slug }
  });

  if (!bedroom) {
    return { title: 'Habitación no encontrada' };
  }

  return {
    title: `${bedroom.typeBedroom} - Hotel`,
    description: bedroom.description
  };
}

const getValidImageUrl = (imageContent: string | null) => {
  if (!imageContent) {
    return '/placeholder.svg';
  }

  if (imageContent.startsWith('http')) {
    return imageContent;
  }

  // Extraer solo el nombre del archivo
  const fileName = imageContent.split('/').pop() || '';
  return `/api-imagenes/${fileName}`;
};

export default async function BedroomDetailPage(props: PageProps) {
  const params = await props.params;
  const bedroomSlug = params.slug;

  if (!bedroomSlug) {
    notFound();
  }

  const bedroom = await prisma.bedrooms.findUnique({
    where: { slug: bedroomSlug }
  });

  if (!bedroom) {
    notFound();
  }

  const imagesResult = await getGalleryImages(bedroom.id);
  const galleryImages =
    Array.isArray(imagesResult.data) && imagesResult.success
      ? imagesResult.data
      : [];

  const selectedBedroomType = bedroom.typeBedroom || '';

  const mainImage = galleryImages[0]?.imageContent
    ? getValidImageUrl(galleryImages[0].imageContent)
    : bedroom.image || '/placeholder.svg';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {bedroom.typeBedroom}
          </h1>
          <p className="text-lg text-gray-600">{bedroom.description}</p>
          <div className="flex items-center gap-4 mt-4">
            <Badge variant={bedroom.status ? 'active' : 'inactive'}>
              {bedroom.status ? 'Disponible' : 'No disponible'}
            </Badge>
            <span className="text-sm text-gray-500">
              Habitación #{bedroom.numberBedroom}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Galería principal */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Imagen principal */}
                  <div className="relative h-96 overflow-hidden rounded-lg">
                    <Image
                      alt={`${bedroom.typeBedroom} - Vista principal`}
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      fill
                      src={mainImage || '/placeholder.svg'}
                    />
                  </div>

                  {/* Miniaturas de galería */}
                  {galleryImages.length > 1 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {galleryImages.slice(1).map((image, index) => (
                        <div
                          className="relative h-32 overflow-hidden rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-500 transition-colors"
                          key={image.id} // CORREGIDO: key ordenado alfabéticamente (Línea 119)
                        >
                          <Image
                            alt={`${bedroom.typeBedroom} - Vista ${index + 2}`}
                            className="object-cover transition-transform duration-300 hover:scale-105"
                            fill
                            src={
                              getValidImageUrl(image.imageContent) ||
                              '/placeholder.svg' ||
                              '/placeholder.svg'
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Detalles de la habitación */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bed className="w-5 h-5" />
                  Detalles de la Habitación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm font-medium">Capacidad</p>
                    <p className="text-lg font-bold">
                      {bedroom.capacity} personas
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bed className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm font-medium">Habitación</p>
                    <p className="text-lg font-bold">
                      #{bedroom.numberBedroom}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium">Imágenes</p>
                    <p className="text-lg font-bold">{galleryImages.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar de reservación */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-center">
                  Reservar Habitación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    C${bedroom.lowSeasonPrice}
                  </div>
                  <p className="text-sm text-gray-500">
                    por noche (temporada baja)
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Temporada alta: C${bedroom.highSeasonPrice}/noche
                  </p>
                </div>

                <Separator />

                <SelectedDatesDisplay />

                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                  <div className="w-full sm:w-auto">
                    <AddReservation selectedBedroomType={selectedBedroomType} />
                  </div>

                  <a
                    className="w-full sm:w-auto"
                    href={generateWhatsappUrl(
                      bedroom.typeBedroom,
                      bedroom.numberBedroom,
                      bedroom.lowSeasonPrice
                    )}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Button className="w-full bg-green-500 hover:bg-green-600 flex items-center justify-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Consultar por WhatsApp
                    </Button>
                  </a>
                </div>

                <Separator />

                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    ¿Necesitas ayuda?
                  </p>
                  <div className="flex flex-col items-center justify-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      <span>+505 8646-9676</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      <span>alfredorequenez57libra@gmail.com</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
