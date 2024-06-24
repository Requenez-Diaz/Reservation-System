'use client';

import { signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { authOptions } from '@/lib/auth';
import { useSession } from 'next-auth/react';

const UserAccountnav = () => {
  const session = useSession({ required: true });

  return (
    <div className="flex flex-row items-center justify-evenly">
      <h1 className="mr-4">{session.data?.user?.username}</h1>
      <Button
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/sign-in`
          })
        }
        variant={'ghost'}
      >
        <svg
          className="mr-2"
          fill="none"
          viewBox="0 0 15 15"
          height="1em"
          width="1em"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M4.5 1a.5.5 0 000 1H12v11H4.5a.5.5 0 000 1H12a1 1 0 001-1V2a1 1 0 00-1-1H4.5zm2.104 3.896a.5.5 0 10-.708.708L7.293 7H.5a.5.5 0 000 1h6.793L5.896 9.396a.5.5 0 00.708.708l2.25-2.25a.5.5 0 000-.708l-2.25-2.25z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </div>
  );
};

export default UserAccountnav;
