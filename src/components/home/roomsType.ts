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
  amenities: any[]; // Considera crear un tipo más específico para amenities
  capacity: number;
  bookingsDetails: any[]; // Considera crear un tipo más específico para bookings
}
