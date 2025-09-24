'use client';

import { useSession } from 'next-auth/react';
import UserAccountnav from './usersComponents/UserAccountnav';
import { Link } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

export default function AuthSections() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="w-24 h-8 bg-gray-200 roundedanimate-pulse"></div>;
  }

  if (!session?.user) {
    return <UserAccountnav />;
  }

  <Link className={buttonVariants({ variant: 'save' })} href="/sign-in">
    Iniciar sesión
  </Link>;
}
