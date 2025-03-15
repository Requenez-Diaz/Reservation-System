'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';

export default function AvatarNavigationsClient() {
  const [userData, setUserData] = useState<{
    name: string;
    image: string | null;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();

        if (data.user) {
          setUserData({
            name: data.user.name || '',
            image: data.user.image || null
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[500px] flex justify-center items-center">
        <Avatar>
          <AvatarFallback>...</AvatarFallback>
        </Avatar>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="h-[500px] flex justify-center items-center">
        <Avatar>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    );
  }

  const initials = getInitials(userData.name);

  return (
    <div className="h-[500px] flex justify-center items-center">
      <Avatar>
        {userData.image ? (
          <AvatarImage src={userData.image} alt={userData.name} />
        ) : null}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
}
