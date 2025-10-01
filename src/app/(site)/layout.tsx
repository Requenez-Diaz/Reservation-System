import Footer from '@/components/footer/footer';
import NavbarTwoPass from './navbar/navbar-twoPass';
import { Inter as FontSans } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="es" className={fontSans.variable}>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <div className="flex flex-col min-h-screen">
          <NavbarTwoPass session={session} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
