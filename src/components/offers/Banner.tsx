interface BannerProps {
  image: string;
  text: string;
}

const Banner: React.FC<BannerProps> = ({ image, text }) => {
  return (
    <div className="bg-indigo-200 ">
      <div className="relative">
        <img alt={text} className="w-full h-96 object-cover" src={image} />
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl animate-bounce">
          ¡Estas son las mejores ofertas del mercado!
        </p>
      </div>
    </div>
  );
};

export default Banner;
