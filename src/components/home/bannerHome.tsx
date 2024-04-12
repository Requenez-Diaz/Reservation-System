import Image from 'next/image';

const BannerHome = () => {
  return (
    <div className="relative w-full h-96">
      <Image
        alt="Banner Image"
        className="object-cover w-full h-full opacity-80"
        height={1080}
        src="/pexels-helena-lopes-2017802.jpg"
        width={1920}
      />
      <div className="absolute top-1/2 left-1/3 right-1 ml-4 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-50 bg-opacity-70 text-white flex flex-col items-center justify-center rounded-r-2xl h-1/2">
        <h1 className="text-4xl font-bold mb-4 text-black">Bienvenido a SIRHM</h1>
        <p className="text-lg text-center px-4 text-black">
          Este es uno de los sistemas de reservas de hoteles más avanzados de
          Nueva Guinea donde todo lo encontrarás a un clic de distancia.
        </p>
      </div>
    </div>
  );
};

export default BannerHome;
