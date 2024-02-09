import Navbar from "@/components/ui/navbar/navigation";

export default function Home() {
  return (
    <main className=''>
      <Navbar />
      <div className='relative w-full h-96'>
        <img
          src='/pexels-helena-lopes-2017802.jpg'
          alt='vercel logo'
          width={1920}
          height={1080}
          className='object-cover w-full h-full opacity-80'
        />
        <div className='absolute top-1/2 left-1/3 right-1 ml-4 transform -translate-x-1/2 -translate-y-1/2 text-white bg-gray-300 flex flex-col items-center justify-center rounded-r-2xl h-1/2'>
          <h1 className='text-4xl font-bold '>Bienvenido a SIRHM</h1>
          <p className='text-black ml-3 mt-4 justify-center items-center'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
            dolor officia natus quod inventore voluptatem dicta vero sit vel
            facilis, quia quae, at voluptas.
          </p>
        </div>
      </div>
    </main>
  );
}
