'use client';

import type React from 'react';

import { getPromotions } from '@/app/actions/getPromotions/getPromotions';
import { formatDate } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { RoomCardProps } from './ types';

interface ClientRoomsWithPromotionsProps {
  rooms: RoomCardProps[];
}

export const ClientRoomsWithPromotions: React.FC<
  ClientRoomsWithPromotionsProps
> = async ({ rooms }) => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPromotions() {
      try {
        setLoading(true);
        const result = await getPromotions();
        console.log('Promotions result:', result); // Añadir este log para depuración
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
    return <div>Cargando promociones...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room, index) => {
        // Encuentra promociones aplicables a esta habitación
        const applicablePromotions = promotions.filter((promotion: any) =>
          promotion.BedroomsPromotions?.some(
            (bp: any) => bp.Bedrooms?.typeBedroom === room.type
          )
        );

        return (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={room.image || '/placeholder.svg?height=300&width=500'}
              alt={room.type}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <h3 className="text-xl font-semibold mb-2">{room.type}</h3>
            <p className="text-gray-600 mb-4">{room.description}</p>
            <p className="text-lg font-bold">
              Precio: ${room.price}
              {applicablePromotions.length > 0 && (
                <>
                  <span className="text-green-500 ml-2">
                    {applicablePromotions
                      .map((promo: any) => `-${promo.porcentageDescuent}%`)
                      .join(', ')}
                  </span>
                  <span className="ml-2">Precio con descuento: $</span>
                </>
              )}
            </p>
            {applicablePromotions.length > 0 && (
              <div>
                <h4 className="text-md font-semibold mt-2">
                  Promociones Aplicables:
                </h4>
                <ul>
                  {applicablePromotions.map((promotion: any) => (
                    <li key={promotion.id} className="text-sm">
                      {promotion.codePromotions} - {promotion.description} (
                      {formatDate(promotion.dateStart)} -{' '}
                      {formatDate(promotion.dateEnd)})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
