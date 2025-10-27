// components/SearchResults.tsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { Bedroom } from '../roomsType';

interface SearchResultsProps {
  searchResults: Bedroom[];
  showResults: boolean;
  typeBedroom: string;
  description: string;
  lowSeasonPrice: number;
  status: boolean;
  numberBedroom: number;
  image: string;
  slug?: string;
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '_')
    .replace(/^-+|-+$/g, '');
}

export default function SearchResults({
  searchResults,
  showResults,
  typeBedroom,
  description,
  lowSeasonPrice,
  status,
  numberBedroom,
  image,
  slug
}: SearchResultsProps) {
  if (searchResults.length === 0) {
    return null; // No renderizar si no hay resultados
  }

  const finalSlug = slug || generateSlug(typeBedroom);
  console.log('Rendering SearchResults with', {
    searchResults,
    showResults,
    slug: finalSlug
  });

  return (
    <Card
      className={`mx-auto max-w-4xl mt-8 transition-all duration-500 ${
        showResults
          ? 'animate-in fade-in slide-in-from-bottom-4 opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      }`}
    >
      <CardHeader>
        <CardTitle className="animate-in fade-in slide-in-from-left-2 duration-300">
          Resultados de la búsqueda
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {searchResults.map((bedroom, index) => (
            <li
              key={bedroom.id}
              className={`border-b pb-4 transition-all duration-300 ${
                showResults
                  ? 'animate-in fade-in slide-in-from-left-2 opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-4'
              }`}
              style={{
                animationDelay: showResults ? `${index * 100}ms` : '0ms'
              }}
            >
              <Link
                href={`/habitaciones-detail/${generateSlug(bedroom.typeBedroom)}`}
                className="block hover:bg-accent/50 p-4 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-md group"
              >
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-200">
                  {bedroom.typeBedroom}
                </h3>
                <p className="text-muted-foreground mt-1">
                  {bedroom.description}
                </p>
                <div className="flex flex-wrap gap-4 mt-2 text-sm">
                  <p className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Capacidad: {bedroom.capacity} personas
                  </p>
                  <p className="text-green-600 font-medium">
                    Desde ${bedroom.lowSeasonPrice}
                  </p>
                  <p className="text-orange-600 font-medium">
                    Hasta ${bedroom.highSeasonPrice}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
