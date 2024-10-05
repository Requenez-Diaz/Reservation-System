import ContainerHome from '@/components/home/containerHome';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const Dashboard = async () => {
  // const session = await getServerSession(authOptions);

  // if (session?.user) {
  // }
  return (
    <main className="">
      <ContainerHome />
    </main>
  );
};

export default Dashboard;
