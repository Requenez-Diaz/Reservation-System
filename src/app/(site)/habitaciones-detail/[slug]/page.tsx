import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Wifi,
  Wind,
  Car,
  Coffee,
  Utensils,
  Tv,
  Bath,
  Bed,
  Users,
  Calendar,
  Phone,
  Mail
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AddReservation } from '@/components/bookings/components/addReservation';
import { generateWhatsappUrl } from '@/components/bedrooms/messages/message-encode';
import prisma from '@/lib/db';
import { getGalleryImages } from '@/app/actions/upload/get-images-gallery';

interface AddReservationProps {
  selectedBedroomType?: string;
}

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
    metadataBase: new URL('http://localhost:3001'),
    title: `${bedroom.typeBedroom} - Hotel`,
    description: bedroom.description
  };
}

export const viewport = {
  themeColor: '#FFFFFF'
};

export default async function BedroomDetailPage(props: PageProps) {
  const params = await props.params;
  const bedroomSlug = params.slug;

  if (!bedroomSlug) notFound();

  const bedroom = await prisma.bedrooms.findUnique({
    where: { slug: bedroomSlug }
  });

  if (!bedroom) notFound();

  const imagesResult = await getGalleryImages(bedroom.id);
  const galleryImages =
    Array.isArray(imagesResult.data) && imagesResult.success
      ? imagesResult.data
      : [];

  const selectedBedroomType = bedroom.typeBedroom || '';

  // Fallback: si no hay imágenes en la galería, usar la imagen principal
  const mainImage = galleryImages[0]?.imageContent || bedroom.image || '/placeholder.svg';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Información de la habitación */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{bedroom.typeBedroom}</h1>
          <p className="text-lg text-gray-600">{bedroom.description}</p>
          <div className="flex items-center gap-4 mt-4">
            <Badge variant={bedroom.status ? 'active' : 'inactive'}>
              {bedroom.status ? 'Disponible' : 'No disponible'}
            </Badge>
            <span className="text-sm text-gray-500">Habitación #{bedroom.numberBedroom}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Galería principal */}
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative h-96 col-span-1 md:col-span-2 overflow-hidden rounded-lg">
                    <Image
                      src={mainImage}
                      alt={`${bedroom.typeBedroom} - Vista principal`}
                      fill
                      className="object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Miniaturas */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 col-span-1 md:col-span-2">
                    {(galleryImages.length > 1 ? galleryImages.slice(1) : []).map((image, index) => (
                      <div key={index} className="relative h-40 overflow-hidden rounded-lg cursor-pointer">
                        <Image
                          src={image.imageContent || bedroom.image || '/placeholder.svg'}
                          alt={`${bedroom.typeBedroom} - Vista ${index + 2}`}
                          fill
                          className="object-contain transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm font-medium">Capacidad</p>
                    <p className="text-lg font-bold">{bedroom.capacity} personas</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Badge variant="info" className="w-full justify-center">
                      Habitación #{bedroom.numberBedroom}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-center">Reservar Habitación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">C${bedroom.lowSeasonPrice}</div>
                  <p className="text-sm text-gray-500">por noche (temporada baja)</p>
                  <p className="text-xs text-gray-400 mt-1">Temporada alta: ${bedroom.highSeasonPrice}/noche</p>
                </div>

                <Separator />

                <div className="space-y-4 m-7">
                  <AddReservation selectedBedroomType={selectedBedroomType} />
                  <a
                    href={generateWhatsappUrl(
                      bedroom.typeBedroom,
                      bedroom.numberBedroom,
                      bedroom.lowSeasonPrice
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-green-500 hover:bg-green-600 mt-5">
                      <Phone className="w-4 h-4 mr-2" />
                      Consultar por WhatsApp
                    </Button>
                  </a>
                </div>

                <Separator />

                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-gray-700">¿Necesitas ayuda?</p>
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
