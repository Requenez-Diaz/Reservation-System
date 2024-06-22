import Image from 'next/image';
import { BannerProps } from './types';

const Banner: React.FC<BannerProps> = ({ image, text }) => {
  return (
    <div className="bg-indigo-200 ">
      <div className="relative">
        <Image
          alt={text}
          className="w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] object-cover"
          src={image}
          width={1600}
          height={900}
        />
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl animate-bounce text-center">
          ¡Estas son las mejores ofertas del mercado!
        </p>
      </div>
    </div>
  );
};

export default Banner;
