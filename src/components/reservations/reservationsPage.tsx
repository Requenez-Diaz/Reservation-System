import Image from 'next/image';
import React from 'react';
import ReservationCards from './ReservationsCards';

function ReservationsPage() {
  return (
    <div className="flex flex-col">
      <div className="min-h-screen justify-center items-center">
        <div>
          <ReservationCards />
        </div>
      </div>
    </div>
  );
}

export default ReservationsPage;
