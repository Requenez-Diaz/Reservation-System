'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import { getPromotions } from '@/app/actions/getPromotions/getPromotions';
import { formatDate } from '@/lib/utils';

export interface RoomCardProps {
  type: string;
  description: string;
  price: number;
  image?: string;
}

interface Season {
  id: number;
  nameSeason: string;
  dateStart: string | Date;
  dateEnd: string | Date;
}

interface BedroomPromotion {
  id: number;
  bedroomId: number;
  promotionId: number;
  Bedrooms: {
    id: number;
    typeBedroom: string;
    description: string;
    lowSeasonPrice: number;
    highSeasonPrice: number;
    status: boolean;
    numberBedroom: number;
    seasonsId: number;
    amenities: string[]; // 🔹 Cambiado de any[] a string[]
    capacity: number;
  };
  Promotions: {
    id: number;
    codePromotions: string;
    porcentageDescuent: number;
    dateStart: string | Date;
    dateEnd: string | Date;
    description: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    seasonId: number;
  };
}

interface Promotion {
  id: number;
  codePromotions: string;
  porcentageDescuent: number;
  dateStart: string | Date;
  dateEnd: string | Date;
  description: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  seasonId: number;
  Seasons: Season;
  BedroomsPromotions: BedroomPromotion[];
}

interface ClientRoomsWithPromotionsProps {
  rooms: RoomCardProps[];
}

export const ClientRoomsWithPromotions: React.FC<
  ClientRoomsWithPromotionsProps
> = ({ rooms }) => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPromotions() {
      try {
        setLoading(true);
        const result = await getPromotions();
        console.log('Promotions result:', result);

        if (result.success) {
          setPromotions(result.data);
        } else {
          setError('No se pudieron cargar las promociones');
        }
      } catch (err) {
        console.error('Error loading promotions:', err);
        setError('Error al cargar las promociones');
      } finally {
        setLoading(false);
      }
    }

    loadPromotions();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-current border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-2">Cargando promociones...</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  const calculateDiscountedPrice = (
    originalPrice: number,
    discountPercentage: number
  ) => {
    return originalPrice - (originalPrice * discountPercentage) / 100;
  };

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room, index) => {
        const applicablePromotions = promotions.filter((promotion) =>
          promotion.BedroomsPromotions?.some(
            (bp) => bp.Bedrooms?.typeBedroom === room.type
          )
        );

        const bedroomDetails =
          applicablePromotions.length > 0
            ? applicablePromotions[0].BedroomsPromotions.find(
                (bp) => bp.Bedrooms?.typeBedroom === room.type
              )?.Bedrooms
            : null;

        const originalPrice = bedroomDetails
          ? bedroomDetails.highSeasonPrice || bedroomDetails.lowSeasonPrice
          : room.price;

        return (
          <div
            className="overflow-hidden rounded-lg bg-white shadow-md"
            key={index}
          >
            <img
              alt={room.type}
              className="h-48 w-full object-cover"
              src={room.image || '/placeholder.svg?height=300&width=500'}
            />

            <div className="p-4">
              <h3 className="mb-2 text-xl font-semibold">{room.type}</h3>
              <p className="mb-4 text-gray-600">
                {bedroomDetails?.description || room.description}
              </p>

              <div className="mb-2 flex items-baseline">
                <span className="text-lg font-bold">
                  Precio: ${originalPrice.toFixed(2)}
                </span>
                {applicablePromotions.length > 0 && (
                  <span className="ml-2 rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                    {applicablePromotions[0].porcentageDescuent}% OFF
                  </span>
                )}
              </div>

              {applicablePromotions.length > 0 && (
                <div className="mb-4 mt-2">
                  {applicablePromotions.map((promo) => {
                    const discountedPrice = calculateDiscountedPrice(
                      originalPrice,
                      promo.porcentageDescuent
                    );

                    return (
                      <div
                        className="rounded-md bg-green-50 p-3"
                        key={promo.id}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-green-700">
                            Descuento:
                          </span>
                          <span className="font-bold">
                            {promo.porcentageDescuent}%
                          </span>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="font-medium text-green-700">
                            Precio Final:
                          </span>
                          <span className="text-xl font-bold text-green-800">
                            ${discountedPrice.toFixed(2)}
                          </span>
                        </div>
                        {promo.Seasons && (
                          <div className="mt-2 text-xs text-gray-500">
                            Temporada: {promo.Seasons.nameSeason}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {applicablePromotions.length > 0 && (
                <div className="mt-4 border-t pt-3">
                  <h4 className="mb-2 text-md font-semibold">Promociones:</h4>
                  <ul className="space-y-2">
                    {applicablePromotions.map((promotion) => {
                      const bedroomPromotion =
                        promotion.BedroomsPromotions.find(
                          (bp) => bp.Bedrooms?.typeBedroom === room.type
                        );

                      return (
                        <li
                          className="flex flex-col rounded bg-gray-50 p-2 text-sm"
                          key={promotion.id}
                        >
                          <div className="flex items-center">
                            <span className="font-medium text-blue-600">
                              {promotion.codePromotions}
                            </span>
                            <span className="ml-auto rounded bg-blue-100 px-2 py-0.5 text-blue-800 text-xs">
                              {promotion.porcentageDescuent}% OFF
                            </span>
                          </div>
                          <p className="mt-1">{promotion.description}</p>
                          <div className="mt-1 flex justify-between text-xs text-gray-500">
                            <span>
                              Desde: {formatDate(promotion.dateStart)}
                            </span>
                            <span>Hasta: {formatDate(promotion.dateEnd)}</span>
                          </div>
                          {bedroomPromotion?.Bedrooms?.capacity && (
                            <div className="mt-1 rounded bg-blue-50 p-1 text-xs">
                              Capacidad: {bedroomPromotion.Bedrooms.capacity}{' '}
                              personas
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {bedroomDetails && (
                <div className="mt-4 border-t border-gray-100 pt-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <span className="text-gray-600">Capacidad:</span>
                      <span className="ml-1 font-medium">
                        {bedroomDetails.capacity} personas
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600">Habitación:</span>
                      <span className="ml-1 font-medium">
                        #{bedroomDetails.numberBedroom}
                      </span>
                    </div>
                    {bedroomDetails.amenities &&
                      bedroomDetails.amenities.length > 0 && (
                        <div className="col-span-2">
                          <span className="text-gray-600">Amenidades:</span>
                          <span className="ml-1 font-medium">
                            {bedroomDetails.amenities.join(', ')}
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
