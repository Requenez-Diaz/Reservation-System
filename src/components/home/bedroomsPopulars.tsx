import React from 'react';

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
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <img
                alt="vercel logo"
                className="object-cover w-96 h-96 rounded-2xl"
                src={item.image}
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
