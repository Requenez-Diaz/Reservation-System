'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import FormReservation from '../forms/formReservation';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface AddReservationProps {
  selectedBedroomType?: string;
}

export function AddReservation({ selectedBedroomType }: AddReservationProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const openModalParam = searchParams.get('openModal');
    const bedroomTypeParam = searchParams.get('selectedBedroomType');

    if (openModalParam === 'true' && status === 'authenticated') {
      if (!bedroomTypeParam || bedroomTypeParam === selectedBedroomType) {
        setIsOpen(true);
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.delete('openModal');
        newSearchParams.delete('selectedBedroomType');
        router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
      }
    }
  }, [searchParams, status, pathname, router, selectedBedroomType]);

  const handleOpenChange = (open: boolean) => {
    if (open && status === 'unauthenticated') {
      const callbackUrl = encodeURIComponent(
        `${pathname}?openModal=true&selectedBedroomType=${encodeURIComponent(selectedBedroomType || '')}`
      );
      router.push(`/sign-in?callbackUrl=${callbackUrl}`);
      return;
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-500 hover:bg-blue-600">
          Reservar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader>
          <DialogTitle>Selecciona tu habitación</DialogTitle>
          <DialogDescription>
            Completa la información a continuación para reservar tu habitación.
          </DialogDescription>
        </DialogHeader>
        <FormReservation selectedBedroomType={selectedBedroomType} />
      </DialogContent>
    </Dialog>
  );
}
