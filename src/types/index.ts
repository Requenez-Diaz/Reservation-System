// Tipos para las habitaciones
export interface Bedroom {
  id: number;
  typeBedroom: string;
  // Otros campos que pueda tener tu modelo Bedrooms
}

// Tipos para las temporadas
export interface Season {
  id: number;
  nameSeason: string;
  dateStart: Date;
  dateEnd: Date;
  // Otros campos que pueda tener tu modelo Seasons
}

// Tipos para las promociones
export interface BedroomPromotion {
  id: number;
  Bedrooms: Bedroom;
  // No incluimos Promotions aquí para evitar recursión circular
}

export interface Promotion {
  id: number;
  codePromotions: string;
  porcentageDescuent: number;
  dateStart: string | Date;
  dateEnd: string | Date;
  description?: string;
  Seasons: Season; // Nota: es Seasons (singular) según tu estructura
  BedroomsPromotions: BedroomPromotion[];
}
