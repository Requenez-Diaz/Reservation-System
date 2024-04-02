import BannerHome from '@/components/home/bannerHome';
import BedroomsPopulars from '@/components/home/bedroomsPopulars';
import CardDescriptions from '@/components/home/cards/cardsDescription';
import Collage from '@/components/home/collage';
import CollageImage from '@/components/home/collageImage';
import FormBook from '@/components/home/formBook';
import { CarouselDemo } from '@/components/home/cards/carrucelServicios';

export default function Home() {
  return (
    <main className="">
      <BannerHome />
      <FormBook />
      <Collage />
      <CardDescriptions />
      <CollageImage />
      <CarouselDemo />
      <BedroomsPopulars name="hola" image="" />
    </main>
  );
}
