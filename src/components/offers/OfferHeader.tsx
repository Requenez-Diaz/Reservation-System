interface OfferHeaderProps {
  title: string;
  slogan: string;
  description: string;
}

export const OfferHeader = ({
  title,
  slogan,
  description
}: OfferHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">{title}</h2>
      <div className="flex items-center justify-center">
        <p className="text-lg text-gray-600">{slogan}</p>
      </div>
      <p className="text-gray-800 mt-4">{description}</p>
    </div>
  );
};

export default OfferHeader;
