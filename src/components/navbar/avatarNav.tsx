import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
const AvatarNav = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>
          <span>Guest</span>
          {session?.user?.username}
        </AvatarFallback>
      </Avatar>
    );
  }
};

export default AvatarNav;
