// @/app/(site)/rooms/page.tsx
import { getAllBedrooms } from '@/app/actions/get-bedrooms';
import { RoomSelection } from '@/components/home/componentsBooksForms/room-selection';

interface GalleryImage {
  imageContent: string | null;
  fileName?: string;
  mimeType?: string;
}

interface ReservationDetail {
  dateStart: Date | string;
  dateEnd: Date | string;
  status: string;
}

interface RawBedroom {
  id: string | number;
  description: string | null;
  capacity: number;
  numberBedroom: number;
  status: boolean;
  lowSeasonPrice: number;
  highSeasonPrice: number;
  slug: string | null;
  TypeBedrooms?: {
    nameType?: string;
    typeBedroom?: string;
  } | null;
  Seasons?: {
    id: number;
    nameSeason: string;
  } | null;
  galleryImages?: GalleryImage[];
  ReservationDetails?: ReservationDetail[];
}

export default async function RoomsPage() {
  const rawData = await getAllBedrooms();
  const rawBedrooms = (rawData || []) as RawBedroom[];

  const mappedRooms = rawBedrooms.map((bedroom) => {
    const firstImage = bedroom.galleryImages?.[0];

    const typeName =
      bedroom.TypeBedrooms?.nameType ||
      bedroom.TypeBedrooms?.typeBedroom ||
      'Habitación Estándar';

    return {
      id: String(bedroom.id),
      name: typeName,
      description: bedroom.description || '',
      capacity: bedroom.capacity || 2,
      numberBedroom: bedroom.numberBedroom,
      status: bedroom.status,
      lowSeasonPrice: bedroom.lowSeasonPrice,
      highSeasonPrice: bedroom.highSeasonPrice,
      image: firstImage?.imageContent || '/placeholder.svg',
      slug:
        bedroom.slug ||
        typeName
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-z0-9_]/g, ''),
      bookingsDetails: (bedroom.ReservationDetails || []).map((d) => ({
        dateStart:
          d.dateStart instanceof Date
            ? d.dateStart.toISOString()
            : String(d.dateStart),
        dateEnd:
          d.dateEnd instanceof Date
            ? d.dateEnd.toISOString()
            : String(d.dateEnd),
        status: d.status
      })),
      seasonName: bedroom.Seasons?.nameSeason || 'Temporada Regular'
    };
  });

  return (
    <div className="container mx-auto py-10">
      <RoomSelection allBedrooms={mappedRooms} />
    </div>
  );
}
