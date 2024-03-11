import Image from 'next/image';
import React from 'react';

const Info = () => {
  return (
    <div className="grid grid-cols-2 gap-x-4 mx-5 my-10 content-center justify-center p-6 bg-white shadow-lg">
      <div className="mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4">
          Lorem ipsum dolor sit amet
        </h1>
        <p className="text-blue-400 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
          dolores delectus, quam nulla hic ipsa temporibus cupiditate
          accusantium vero maxime, tempora nobis blanditiis voluptatibus et!
        </p>
        <p className="text-blue-400 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
          dolores delectus, quam nulla hic ipsa temporibus cupiditate
          accusantium vero maxime, tempora nobis blanditiis voluptatibus et!
        </p>
        <div className="flex flex-row mb-4">
          <div className="mr-4">
            <h1 className="font-bold mt-4">Lorem, ipsum dolor.</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
              asperiores unde minus quod veniam.
            </p>
          </div>
          <div>
            <h1 className="font-bold mt-4">Lorem, ipsum dolor.</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
              asperiores unde minus quod veniam.
            </p>
          </div>
        </div>
      </div>

      <div className="animate-in">
        <Image
          src={'/javascript-flatline.svg'}
          alt=""
          width={600}
          height={600}
        />
      </div>
    </div>
  );
};

export default Info;
