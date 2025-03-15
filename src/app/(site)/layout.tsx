import type React from 'react';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Open_Sans } from 'next/font/google';
import Footer from '@/components/footer/footer';
import Provider from '@/app/(site)/navbar/usersComponents/Provider';
import { Toaster } from '@/components/ui/toaster';
import dynamic from 'next/dynamic';

// Import Navbar with SSR disabled to prevent hydration mismatch
const Navbar = dynamic(() => import('@/app/(site)/navbar/navigation'), {
  ssr: false
});

export const fontSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Hotel Madroño | Sitio Oficial',
  description:
    'Descubre la comodidad y el lujo en Hotel Madroño. Reserva tu estancia perfecta con nosotros.',
  keywords: [
    'hotel',
    'madroño',
    'alojamiento',
    'reservaciones',
    'ofertas',
    'habitaciones'
  ],
  authors: [{ name: 'Hotel Madroño' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://www.hotelmadrono.com',
    siteName: 'Hotel Madroño',
    title: 'Hotel Madroño | Tu Hogar Lejos de Casa',
    description:
      'Experimenta una estancia inolvidable en Hotel Madroño. Reserva ahora y disfruta de nuestras cómodas habitaciones y excelente servicio.',
    images: [
      {
        url: 'https://www.hotelmadrono.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hotel Madroño'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotel Madroño | Sitio Oficial',
    description:
      'Descubre la comodidad y el lujo en Hotel Madroño. Reserva tu estancia perfecta con nosotros.',
    images: ['https://www.hotelmadrono.com/twitter-image.jpg'],
    creator: '@hotelmadrono'
  },
  robots: 'index, follow',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={fontSans.variable}>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Provider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
