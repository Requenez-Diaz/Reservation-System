import { findAvailableRooms } from '@/app/actions/searchRooms';
import { NoAvailableRooms } from '@/components/home/componentsBooksForms/no-available-rooms';
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

export default async function RoomsPage({
  searchParams
}: {
  readonly searchParams?: Promise<{
    readonly from?: string;
    readonly to?: string;
    // New/legacy params
    readonly capacityCalled?: string;
    readonly capacities?: string;
    readonly capacity?: string;
    readonly roomCount?: string;
  }>;
}) {
  const queryParams = await searchParams;

  // Determine capacity filter (new API supports an array of capacities)
  const capacityFromCalled = queryParams?.capacityCalled
    ? Number(queryParams.capacityCalled)
    : queryParams?.capacity
      ? Number(queryParams.capacity)
      : undefined;

  let capacitiesArray: number[] | undefined;
  if (queryParams?.capacities) {
    try {
      capacitiesArray = JSON.parse(queryParams.capacities) as number[];
    } catch {
      capacitiesArray = undefined;
    }
  }

  const rawData = await findAvailableRooms({
    startDate: queryParams?.from,
    endDate: queryParams?.to,
    capacity: capacityFromCalled,
    capacities: capacitiesArray
  });

  const requestedRooms = Number(queryParams?.roomCount) || 0;
  const foundRooms = rawData?.length || 0;
  const totalAvailableCapacity =
    rawData?.reduce((sum, room) => sum + (room.capacity || 0), 0) || 0;
  const requestedGuests =
    capacitiesArray?.reduce((sum, cap) => sum + cap, 0) ||
    capacityFromCalled ||
    0;

    console.log({ totalAvailableCapacity, requestedGuests });
    
  const canAccommodateAllGuests = foundRooms >= requestedRooms;

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

  const hasSearchParams = queryParams?.from && queryParams?.to;

  return (
    <div className="container mx-auto py-10">
      {hasSearchParams && mappedRooms.length === 0 ? (
        <NoAvailableRooms />
      ) : (
        <RoomSelection
          allBedrooms={mappedRooms}
          canAccommodateAllGuests={canAccommodateAllGuests}
        />
      )}
    </div>
  );
}
