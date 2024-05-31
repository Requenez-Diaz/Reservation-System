import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import ContainerHome from '@/components/home/containerHome';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    <h2>Welcome back, {session.user.username}!</h2>;
  }
  return (
    <main className="">
      <ContainerHome />
    </main>
  );
}
