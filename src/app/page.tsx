import { ContainerAboutHotels } from '@/components/home/adventagesHotels/containerAboutServices';
import BannerHome from '@/components/home/bannerHome';
import CardDescriptions from '@/components/home/cards/cardsDescription';
import Collage from '@/components/home/collage';
import CollageImage from '@/components/home/collageImage';
import FormBook from '@/components/home/formBook';
import { CarouselDemo } from '@/components/home/cards/carrucelServicios';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import User from '@/components/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="">
      <BannerHome />
      <div className="flex justify-center items-center">
        <Link className={buttonVariants()} href={'/admin'}>
          Open My Admin
        </Link>

        <h2>Client Session</h2>
        <User />
        <h2>Server session</h2>
        {JSON.stringify(session)}
      </div>
      <FormBook />
      <CarouselDemo />
      <ContainerAboutHotels />
      <Collage />
      <CardDescriptions />
      <CollageImage />
    </main>
  );
}
