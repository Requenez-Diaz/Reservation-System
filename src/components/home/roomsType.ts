// types/bedrooms.d.ts

export interface Bedroom {
  id: number;
  typeBedroom: string;
  description: string;
  lowSeasonPrice: number;
  highSeasonPrice: number;
  status: boolean;
  numberBedroom: number;
  seasonsId: number;
  amenities: string[];
  capacity: number;
  bookingsDetails: string[];
}
