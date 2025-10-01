
'use client';

import * as React from 'react';
import { Bedroom } from '../roomsType';
import BedroomSearchForm from './formBookHome';
import SearchResults from './searchResults';
import LoadingOverlay from './loadingOverlay';

export default function BedroomSearch() {
  const [searchResults, setSearchResults] = React.useState<Bedroom[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);

  const handleSearchResults = (results: Bedroom[]) => {
    setSearchResults(results);
    setShowResults(false);
    setTimeout(() => setShowResults(true), 100);
  };

  return (
    <div className="w-full bg-gradient-to-b from-primary/10 to-background p-8">
      <BedroomSearchForm
        onSearch={handleSearchResults}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <SearchResults searchResults={searchResults} showResults={showResults} />
      <LoadingOverlay isLoading={isLoading} />
    </div>
  );
}
