// types/bedrooms.d.ts

export interface BookingDetail {
  id: number;
  status: string;
  bedroomId: number;
  bookingId: number;
  price: number;
  dateStart: Date;
  dateEnd: Date;
  promotionId: number;
  created_at: Date;
  bookingsId: number;
  bedroomsId: number;
  promotionsId: number;
}

export interface BedroomImage {
  fileName: string;
  mimeType: string;
  imageContent: string | null;
}

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
  bookingsDetails: BookingDetail[];
  BedroomImages: BedroomImage[];
}
