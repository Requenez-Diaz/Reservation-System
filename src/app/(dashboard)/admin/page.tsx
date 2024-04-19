import ContainerHome from '@/components/home/containerHome';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <h2 className="text-2xl">
        Admin Page - welcome back {session?.user.username}
      </h2>
    );
  }

  return <ContainerHome />;
};

export default Dashboard;
