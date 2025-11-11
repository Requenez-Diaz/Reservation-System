'use client';

import { useSession } from 'next-auth/react';
import { MenuDrop } from '../menuProfile';

export default function AvatarNavigations() {
  const { data: _session } = useSession();

  return (
    <div className="relative group">
      <MenuDrop />
    </div>
  );
}
