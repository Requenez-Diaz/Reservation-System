import Image from 'next/image';

interface BannerProps {
  image: string;
  text: string;
}

export default function Banner({ image, text }: BannerProps) {
  return (
    <div className="group relative w-full overflow-hidden">
      <Image
        alt={text}
        className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-96"
        height={900}
        priority
        src={image}
        width={1600}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <p
          className="animate-pulse transform rounded-lg bg-black/20 p-3 px-4 text-center 
                     text-2xl font-medium text-white shadow-lg backdrop-blur-sm 
                     transition-all duration-300 hover:scale-105 md:text-4xl"
        >
          {text}
        </p>
      </div>
    </div>
  );
}
