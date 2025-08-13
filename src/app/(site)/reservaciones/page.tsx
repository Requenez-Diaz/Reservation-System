import React from 'react';
import Head from 'next/head';
import ReservationsPage from '@/components/reservations/reservationsPage';

const Bookings = () => {
  return (
    <div>
      <Head>
        <title>Reservas - Mi Sitio Web</title>
        <meta
          name="description"
          content="Gestiona tus reservas y encuentra disponibilidad en tiempo real."
        />
        <meta
          name="keywords"
          content="reservas, hotel, disponibilidad, gestión, tiempo real"
        />
        <meta property="og:title" content="Reservas - Mi Sitio Web" />
        <meta
          property="og:description"
          content="Gestiona tus reservas y encuentra disponibilidad en tiempo real."
        />
        <meta
          property="og:image"
          content="https://www.misito.com/imagen-og.jpg"
        />
        <meta property="og:url" content="https://www.misito.com/bookings" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Reservas - Mi Sitio Web" />
        <meta
          name="twitter:description"
          content="Gestiona tus reservas y encuentra disponibilidad en tiempo real."
        />
        <meta
          name="twitter:image"
          content="https://www.misito.com/imagen-twitter.jpg"
        />
      </Head>
      <ReservationsPage />
    </div>
  );
};

export default Bookings;
