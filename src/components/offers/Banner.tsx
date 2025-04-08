import Image from 'next/image';

interface BannerProps {
  image: string;
  text: string;
}

export default function Banner({ image, text }: BannerProps) {
  return (
    <div className="relative w-full overflow-hidden group">
      <Image
        alt={text}
        className="w-full h-80 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
        src={
          'https://cdn.pixabay.com/photo/2014/02/27/13/13/living-room-275837_1280.jpg'
        }
        width={1600}
        height={900}
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <p
          className="text-white text-2xl md:text-4xl text-center px-4 font-medium 
                     animate-pulse shadow-lg bg-black/20 backdrop-blur-sm p-3 rounded-lg
                     transition-all duration-300 transform hover:scale-105"
        >
          {text}
        </p>
      </div>
    </div>
  );
}
