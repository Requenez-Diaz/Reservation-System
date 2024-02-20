import BannerHome from '@/components/home/bannerHome';
import Collage from '@/components/home/collage';
import FormBook from '@/components/home/formBook';

export default function Home() {
  return (
    <main className="">
      <BannerHome />
      <FormBook />
      <Collage />
    </main>
  );
}
