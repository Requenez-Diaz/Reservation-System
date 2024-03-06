import Image from 'next/image';
import React from 'react';

interface PropsCards {
  name: string;
  type: string;
  batroom: string;
  beds: string;
  peoples: string;
  description: string;
  price: number;
}

const PropsCards = ({
  name,
  type,
  batroom,
  beds,
  peoples,
  description,
  price
}: PropsCards) => {
  return (
    <div>
      <div>
        <Image
          src={
            'https://media.istockphoto.com/id/1390233984/es/foto/habitaci%C3%B3n-de-lujo-moderna.webp?b=1&s=170667a&w=0&k=20&c=sLPzMweWiHutEfXwpxoo4Ew8Wu_kZxzT5dRUohKbP40='
          }
          alt="Picture of the author"
          width={500}
          height={500}
        />
        <div>
          <h1>{name}</h1>
          <p>{type}</p>
          <p>{batroom}</p>
          <p>{beds}</p>
          <p>{peoples}</p>
          <div>
            <p> {description}</p>
            <p>{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropsCards;
