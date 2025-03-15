'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react'; // Ajusta según tu sistema de autenticación

export default function UserAvatarClient() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Obtener la sesión del usuario (ajusta según tu sistema de autenticación)
  const { data: session } = useSession();
  const userName = session?.user?.name || '';

  useEffect(() => {
    const fetchUserImage = async () => {
      if (!session?.user) {
        setIsLoading(false);
        console.log({ session });
        return;
      }

      try {
        const response = await fetch('/profile');
        const data = await response.json();

        if (data.success) {
          setUserImage(data.image);
        }
      } catch (error) {
        console.error('Error fetching user image:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchUserImage();
    }
  }, [session]);

  // Obtener la inicial del nombre para el fallback
  const initials = userName ? userName.charAt(0).toUpperCase() : 'U';

  return (
    <Avatar>
      {userImage ? <AvatarImage src={userImage} alt={userName} /> : null}
      <AvatarFallback>{isLoading ? '...' : initials}</AvatarFallback>
    </Avatar>
  );
}
