import BannerHome from '@/components/home/bannerHome';
import CardDescriptions from '@/components/home/cards/cardsDescription';

import Collage from '@/components/home/collage';
import FormBook from '@/components/home/formBook';

export default function Home() {
  return (
    <main className="">
      <BannerHome />
      <FormBook />
      <Collage />
      <CardDescriptions />
    </main>
  );
}
