'use server';

import prisma from '@/lib/db';

export const findAvailableRooms = async ({
  startDate,
  endDate,
  capacity,
  capacities
}: {
  startDate?: string;
  endDate?: string;
  capacity?: number;
  capacities?: number[];
}) => {
  try {
    // Convert string dates to Date objects for proper comparison
    const parsedStartDate = startDate ? new Date(startDate) : undefined;
    const parsedEndDate = endDate ? new Date(endDate) : undefined;

    const hasDateRange =
      parsedStartDate instanceof Date &&
      !isNaN(parsedStartDate.getTime()) &&
      parsedEndDate instanceof Date &&
      !isNaN(parsedEndDate.getTime());

    // Build dynamic capacity filter using guard clauses for readability
    let capacityFilter = {};
    if (capacities && capacities.length > 0) {
      const maxCap = Math.max(...capacities);
      const minCap = Math.min(...capacities);
      capacityFilter = {
        OR: [
          { capacity: { gt: maxCap } },
          { capacity: { gt: minCap } }
        ]
      };
    } else if (typeof capacity === 'number') {
      capacityFilter = { capacity: { gte: capacity } };
    }

    const rooms = await prisma.bedroom.findMany({
      where: {
        ...capacityFilter,
        // Only filter by availability when date range is provided
        ...(hasDateRange && {
          NOT: {
            ReservationDetails: {
              some: {
                status: {
                  in: ['PENDING', 'CONFIRMED']
                },
                Reservation: {
                  status: {
                    in: ['PENDING', 'CONFIRMED']
                  }
                },
                dateStart: {
                  lt: parsedEndDate
                },
                dateEnd: {
                  gt: parsedStartDate
                }
              }
            }
          }
        })
      },
      include: {
        ReservationDetails: {
          include: {
            Reservation: {
              select: {
                status: true
              }
            }
          }
        },
        galleryImages: {
          select: {
            fileName: true,
            mimeType: true,
            imageContent: true
          }
        },
        Season: true,
        TypeBedrooms: true
      }
    });

    return rooms;
  } catch (error) {
    console.error('Error al obtener las habitaciones:', error);
    return [];
  }
};
