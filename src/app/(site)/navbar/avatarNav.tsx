'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react'; // Ajusta según tu sistema de autenticación
import { getUserImage } from '@/app/actions/upload/getUsersImage';

export default function UserAvatarClient() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const userName = session?.user?.name || '';

  useEffect(() => {
    const fetchUserImage = async () => {
      if (status !== 'authenticated' || !session?.user) {
        setIsLoading(false);
        return;
      }

      try {
        const result = await getUserImage();

        if (result.success && result.image) {
          setUserImage(result.image);
        }
      } catch (error) {
        console.error('Error fetching user image:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchUserImage();
    } else if (status === 'unauthenticated') {
      setIsLoading(false);
    }

    // Escuchar el evento de actualización de imagen
    const handleImageUpdate = () => {
      fetchUserImage();
    };

    window.addEventListener('user-image-updated', handleImageUpdate);

    return () => {
      window.removeEventListener('user-image-updated', handleImageUpdate);
    };
  }, [session, status]);

  const initials = userName ? userName.charAt(0).toUpperCase() : 'U';

  return (
    <Avatar>
      {userImage ? <AvatarImage src={userImage} alt={userName} /> : null}
      <AvatarFallback>
        {isLoading ? (
          <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-primary animate-spin" />
        ) : (
          initials
        )}
      </AvatarFallback>
    </Avatar>
  );
}
