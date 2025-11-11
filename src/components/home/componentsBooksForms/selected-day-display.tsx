'use client';

import { useEffect, useState } from 'react';
import { Calendar, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export function SelectedDatesDisplay() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | null>(
    null
  );
  const [guests, setGuests] = useState<number | null>(null);
  const [fromSearch, setFromSearch] = useState(false);

  useEffect(() => {
    const searchFlag = localStorage.getItem('fromSearch');

    if (searchFlag === 'true') {
      setFromSearch(true);

      const savedDates = localStorage.getItem('selectedDates');
      if (savedDates) {
        try {
          const { from, to } = JSON.parse(savedDates);
          if (from) {
            setDateRange({
              from: new Date(from),
              to: to ? new Date(to) : new Date(from)
            });
          }
        } catch (error) {
          console.error('Error al leer las fechas:', error);
        }
      }

      const savedGuests = localStorage.getItem('selectedGuests');
      if (savedGuests) {
        setGuests(Number.parseInt(savedGuests, 10));
      }
    }
  }, []);

  if (!fromSearch || !dateRange) {
    return null;
  }

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm flex-1">
            <div className="font-medium text-blue-900 mb-1">
              Fechas seleccionadas:
            </div>
            <div className="text-blue-700">
              {format(dateRange.from, "d 'de' MMMM, yyyy", { locale: es })}
              {' - '}
              {format(dateRange.to, "d 'de' MMMM, yyyy", { locale: es })}
            </div>
            {guests !== null && guests >= 1 && (
              <div className="flex items-center gap-2 mt-2 text-blue-700">
                <Users className="h-4 w-4" />
                <span>
                  {guests} {guests === 1 ? 'persona' : 'personas'}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
