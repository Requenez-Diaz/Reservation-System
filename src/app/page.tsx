import BannerHome from '@/components/home/bannerHome';
import BedroomsPopulars from '@/components/home/bedroomsPopulars';
import CardDescriptions from '@/components/home/cards/cardsDescription';
import { CarouselComponents } from '@/components/home/carrousel/carrousel';
import Collage from '@/components/home/collage';
import CollageImage from '@/components/home/collageImage';
import FormBook from '@/components/home/formBook';
import { CarouselPrevious } from '@/components/ui/carousel';

export default function Home() {
  return (
    <main className="">
      <BannerHome />
      <FormBook />
      <Collage />
      <CardDescriptions />
      <CollageImage />
      <BedroomsPopulars name="hola" image="" />
    </main>
  );
}
