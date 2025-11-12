import Image from 'next/image';

interface PopularsInterface {
  name: string;
  image: string;
}

const BedroomsPopulars = ({ name, image }: PopularsInterface) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        alt={name}
        className="object-cover w-96 h-96 rounded-2xl"
        height={400}
        src={image}
        width={400}
      />
      <h1 className="text-2xl font-bold mt-2">{name}</h1>
    </div>
  );
};

export default BedroomsPopulars;
