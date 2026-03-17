// @/app/(site)/bedrooms/page.tsx
import { getAllBedrooms } from '@/app/actions/get-bedrooms';
import { RoomSelection } from '@/components/home/componentsBooksForms/room-selection';

export const dynamic = 'force-dynamic';

interface RawGalleryImage {
  imageContent: string | null;
}

interface RawReservationDetail {
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
  TypeBedrooms?: { nameType?: string } | null;
  Season?: {
    id: number;
    nameSeason: string;
    dateStart: Date;
    dateEnd: Date;
  } | null;
  galleryImages?: RawGalleryImage[];
  ReservationDetails?: RawReservationDetail[];
}

export default async function RoomsPage() {
  const rawData = await getAllBedrooms();
  const rawBedrooms = (rawData || []) as RawBedroom[];

  const mappedRooms = rawBedrooms.map((bedroom) => {
    const firstImage = bedroom.galleryImages?.[0];
    const typeName = bedroom.TypeBedrooms?.nameType || 'Habitación Estándar';

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
      slug: bedroom.slug || String(bedroom.id),
      bookingsDetails: (bedroom.ReservationDetails || []).map((d) => ({
        dateStart: new Date(d.dateStart).toISOString(),
        dateEnd: new Date(d.dateEnd).toISOString(),
        status: d.status
      })),
      Season: bedroom.Season
        ? {
            nameSeason: bedroom.Season.nameSeason,
            dateStart: bedroom.Season.dateStart.toISOString(),
            dateEnd: bedroom.Season.dateEnd.toISOString()
          }
        : null
    };
  });

  return (
    <div className="container mx-auto py-10">
      <RoomSelection allBedrooms={mappedRooms} />
    </div>
  );
}
