import ContainerHome from '@/components/home/containerHome';
import { redirect } from 'next/navigation';
export default async function Home() {
  return (
    <div>
      <ContainerHome />
    </div>
  );
}
