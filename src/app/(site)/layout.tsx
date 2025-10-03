// app/(site)/layout.tsx
import Footer from '@/components/footer/footer';
import NavbarTwoPass from './navbar/navbar-twoPass';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function SiteLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarTwoPass session={session} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
