import Image from 'next/image';

interface PopularsInterface {
  name: string;
  image: string;
}

const BedroomsPopulars = ({ name, image }: PopularsInterface) => {
  const data = [
    {
      name: 'Habitación 1',
      image: '/pexels-helena-lopes-2017802.jpg'
    },
    {
      name: 'Habitación 2',
      image: '/pexels-helena-lopes-2017802.jpg'
    },
    {
      name: 'Habitación 3',
      image: '/pexels-helena-lopes-2017802.jpg'
    },
    {
      name: 'Habitación 4',
      image: '/pexels-helena-lopes-2017802.jpg'
    }
  ];

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-center">
          Habitaciones populares
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {data.map((item, index) => (
            <div
              className="flex flex-col items-center justify-center"
              key={index}
            >
              <Image
                alt="vercel logo"
                className="object-cover w-96 h-96 rounded-2xl"
                height={400}
                src={item.image}
                width={400}
              />
              <h1 className="text-2xl font-bold">{item.name}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BedroomsPopulars;
