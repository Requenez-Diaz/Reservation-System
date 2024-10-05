'use client';

import { useSession } from 'next-auth/react';
import AvatarNavigations from './navbar/avatarNav';
import { MenuDrop } from './navbar/menu';

const UserAccountnav = () => {
  const session = useSession({ required: true });

  return (
    <div className="flex flex-row items-center justify-evenly">
      <h1 className="mr-4">{session.data?.user?.username}</h1>
      <MenuDrop />
    </div>
  );
};

export default UserAccountnav;
