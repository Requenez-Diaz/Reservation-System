import React from 'react';
import Head from 'next/head';
import ReservationsPage from '@/components/reservations/reservationsPage';

const Bookings = () => {
  return (
    <div>
      <Head>
        <title>Reservas - Mi Sitio Web</title>
        <meta
          content="Gestiona tus reservas y encuentra disponibilidad en tiempo real."
          name="description"
        />
        <meta
          content="reservas, hotel, disponibilidad, gestión, tiempo real"
          name="keywords"
        />
        <meta content="Reservas - Mi Sitio Web" property="og:title" />
        <meta
          content="Gestiona tus reservas y encuentra disponibilidad en tiempo real."
          property="og:description"
        />
        <meta
          content="https://www.misito.com/imagen-og.jpg"
          property="og:image"
        />
        <meta content="https://www.misito.com/bookings" property="og:url" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="Reservas - Mi Sitio Web" name="twitter:title" />
        <meta
          content="Gestiona tus reservas y encuentra disponibilidad en tiempo real."
          name="twitter:description"
        />
        <meta
          content="https://www.misito.com/imagen-twitter.jpg"
          name="twitter:image"
        />
      </Head>
      <ReservationsPage />
    </div>
  );
};

export default Bookings;
