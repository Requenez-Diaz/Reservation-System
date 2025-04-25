'use client';

import type React from 'react';
import { useMemo } from 'react';

interface Promotion {
  id: number;
  name: string;
  porcentageDescuent: number;
  BedroomsPromotions?: {
    Bedrooms?: {
      id: string;
      typeBedroom: string;
    } | null;
  }[];
}

interface RoomCardWithPromotionsProps {
  roomId: string;
  price: number;
  promotions: Promotion[];
  type: string;
}

const RoomCardWithPromotions: React.FC<RoomCardWithPromotionsProps> = ({
  roomId,
  price,
  promotions,
  type
}) => {
  // Usamos useMemo para calcular las promociones aplicables y la mejor promoción
  // solo cuando cambian las props relevantes
  const { applicablePromotions, bestPromotion, discountedPrice } =
    useMemo(() => {
      // Filtrar promociones aplicables a esta habitación
      // Añadir un console.log para depurar
      console.log('Filtering promotions for room:', roomId, promotions);

      const applicable = promotions.filter((promotion) =>
        promotion.BedroomsPromotions?.some(
          (bp) =>
            bp.Bedrooms?.id === roomId ||
            // Alternativa si la comparación por ID no funciona
            bp.Bedrooms?.typeBedroom === type
        )
      );

      console.log('Applicable promotions:', applicable);

      // Encontrar la promoción con mayor descuento
      const best =
        applicable.length > 0
          ? applicable.reduce(
              (best, current) =>
                current.porcentageDescuent > best.porcentageDescuent
                  ? current
                  : best,
              applicable[0]
            )
          : null;

      // Calcular precio con descuento
      const discounted = best
        ? price - (price * best.porcentageDescuent) / 100
        : price;

      return {
        applicablePromotions: applicable,
        bestPromotion: best,
        discountedPrice: discounted
      };
    }, [promotions, roomId, price, type]);

  return (
    <div>
      {bestPromotion && (
        <div>
          <p>Best Promotion: {bestPromotion.name}</p>
          <p>Discount: {bestPromotion.porcentageDescuent}%</p>
        </div>
      )}
      <p>Original Price: {price}</p>
      <p>Discounted Price: {discountedPrice}</p>
    </div>
  );
};

export default RoomCardWithPromotions;
