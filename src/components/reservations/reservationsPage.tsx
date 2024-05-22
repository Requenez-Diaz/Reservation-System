import Image from 'next/image';
import React from 'react';

function ReservationsPage() {
  return (
    <div className="flex flex-col">
      <div className="min-h-screen justify-center items-center">
        <h1>Habitaciones Familias</h1>
        <Image
          src="https://images.pexels.com/photos/7601116/pexels-photo-7601116.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Habitaciones Familiares"
          width={720}
          height={430}
        />
      </div>
    </div>
  );
}

export default ReservationsPage;
