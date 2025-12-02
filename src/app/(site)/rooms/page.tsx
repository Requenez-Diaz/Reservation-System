import { getAllBedrooms } from '@/app/actions/get-bedrooms';
import { RoomSelection } from '@/components/home/componentsBooksForms/room-selection';

// Definición de tipo simplificada basada en tu mapeo
interface BedroomDB {
  id: string | number;
  typeBedroom: string;
  description?: string;
  capacity?: number;
  numberBedroom: number;
  status: boolean;
  lowSeasonPrice: number;
  highSeasonPrice: number;
  BedroomImages?: Array<{
    imageContent: string | null;
    fileName?: string;
    mimeType?: string;
  }>;
  slug?: string;
  reservationDetails?: Array<{
    dateStart: Date | string;
    dateEnd?: Date | string;
  }>;
}

export default async function RoomsPage() {
  const bedroomData: BedroomDB[] = await getAllBedrooms();

  const mappedRooms = bedroomData.map((bedroom) => {
    const firstImage = bedroom.BedroomImages?.[0];

    return {
      id: String(bedroom.id),
      name: bedroom.typeBedroom,
      description: bedroom.description || '',
      capacity: bedroom.capacity || 2,
      numberBedroom: bedroom.numberBedroom,
      status: bedroom.status,
      lowSeasonPrice: bedroom.lowSeasonPrice,
      highSeasonPrice: bedroom.highSeasonPrice,
      image: firstImage?.imageContent || '/placeholder.svg',
      slug:
        bedroom.slug ||
        bedroom.typeBedroom
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-z0-9_]/g, ''),
      bookingsDetails: (bedroom.reservationDetails || []).map((d) => ({
        dateStart:
          d?.dateStart instanceof Date
            ? d.dateStart.toISOString()
            : String(d?.dateStart ?? ''),
        ...(d?.dateEnd
          ? {
              dateEnd:
                d.dateEnd instanceof Date
                  ? d.dateEnd.toISOString()
                  : String(d.dateEnd)
            }
          : {})
      }))
    };
  });

  return <RoomSelection allBedrooms={mappedRooms} />;
}
