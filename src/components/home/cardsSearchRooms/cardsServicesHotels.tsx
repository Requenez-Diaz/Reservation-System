import CardService from './cardsServices';

const CardsServices = () => {
  return (
    <div className="flex justify-center items-center p-8 md:p-12 bg-gradient-to-b from-amber-50/50 to-orange-50/50">
      <div className="w-full max-w-7xl">
        <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 flex flex-col items-center rounded-2xl border border-amber-200 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="font-bold text-3xl md:text-4xl text-amber-900 mb-3">
              Descubre nuestros servicios
            </h1>
            <p className="text-amber-700 text-lg">
              Descubre el mejor lugar para ti
            </p>
          </div>
          <CardService />
        </div>
      </div>
    </div>
  );
};

export default CardsServices;
