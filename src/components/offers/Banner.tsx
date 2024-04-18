import Image from 'next/image';

interface BannerProps {
  image: string;
  text: string;
}

const Banner: React.FC<BannerProps> = ({ image, text }) => {
  return (
    <div className="bg-indigo-200 ">
      <div className="relative">
        <Image
          alt={text}
          className="w-full h-96 object-cover"
          height={400}
          src={image}
          width={400}
        />
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl animate-bounce">
          ¡Estas son las mejores ofertas del mercado!
        </p>
      </div>
    </div>
  );
};

export default Banner;
