import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { MenuDrop } from '../menuProfile';

export default function AvatarNavigations() {
  const { data: session } = useSession();

  return (
    <div className="relative group">
      <MenuDrop />
    </div>
  );
}
