import type { NextApiRequest, NextApiResponse } from 'next';
import { getBedroomsById } from '@/app/actions/get-bedrooms';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const bedroom = await getBedroomsById(Number(id));
      if (bedroom) {
        res.status(200).json(bedroom);
      } else {
        res.status(404).json({ message: 'Habitación no encontrada' });
      }
    } catch (error) {
      console.error('Error al obtener la habitación:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
