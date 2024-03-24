import { ContainerAboutHotels } from '@/components/home/adventagesHotels/containerAboutServices';
import BannerHome from '@/components/home/bannerHome';
import CardDescriptions from '@/components/home/cards/cardsDescription';
import Collage from '@/components/home/collage';
import CollageImage from '@/components/home/collageImage';
import FormBook from '@/components/home/formBook';

export default function Home() {
  return (
    <main className="">
      <BannerHome />
      <FormBook />
      <ContainerAboutHotels />
      <Collage />
      <CardDescriptions />
      <CollageImage />
    </main>
  );
}
