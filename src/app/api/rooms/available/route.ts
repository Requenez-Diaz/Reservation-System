import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const capacity = searchParams.get('capacity');

    const parsedStartDate = startDate ? new Date(startDate) : undefined;
    const parsedEndDate = endDate ? new Date(endDate) : undefined;

    const hasDateRange =
      parsedStartDate instanceof Date &&
      !isNaN(parsedStartDate.getTime()) &&
      parsedEndDate instanceof Date &&
      !isNaN(parsedEndDate.getTime());

    let capacityFilter = {};
    if (capacity) {
      capacityFilter = { capacity: { gte: parseInt(capacity, 10) } };
    }

    const rooms = await prisma.bedroom.findMany({
      where: {
        ...capacityFilter,
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
      select: {
        id: true
      }
    });

    return NextResponse.json(rooms);
  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json([], { status: 500 });
  }
}
