import React from 'react';

interface IProps {
  description: string;
  icon?: React.ReactNode;
}

const DescriptionAboutHotels = () => {
  const IHotels: IProps[] = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          fill="none"
          height="190px"
          width="190px"
        >
          <path
            fill="currentColor"
            d="M271.06 144.3 54.27 14.3a8.59 8.59 0 0 1 6.63 8.1c0 4.6-4.09 8.4-9.12 8.4h-35.6a30 30 0 0 1 -11.19-2.2c-5.24-2.2-11.28-1.7-15.3 2l-19 17.5a11.68 11.68 0 0 0 -2.25 2.66 11.42 11.42 0 0 0 3.88 15.74 83.77 83.77 0 0 0 34.51 11.5v17.7c0 8.8 7.83 16 17.37 16h17.37c9.55 0 17.38-7.2 17.38-16v-17.6c32.93-3.6 57.84-31 53.5-63-3.15-23-22.46-41.3-46.56-47.7l-54.27-14.3a8.59 8.59 0 0 1 -6.63-8.1c0-4.6 4.09-8.4 9.12-8.4h35.6a30 30 0 0 1 11.23 2.2c5.23 2.2 11.28 1.7 15.3-2l19-17.5a11.31 11.31 0 0 0 2.17-2.6 11.43 11.43 0 0 0 -3.84-15.78 83.82 83.82 0 0 0 -34.52-11.5v-17.72c0-8.8-7.82-16-17.37-16h-17.37c-9.55 0-17.37 7.2-17.37 16v17.6c-32.89 3.6-57.85 31-53.51 63 3.14 23 22.51 41.3 46.57 47.7zm294.21 183.8c-11.8-10.7-30.2-10-42.6 0l-92.4 73.9a63.64 63.64 0 0 1 -40 14h-118.27a16 16 0 0 1 0-32h78.29c15.9 0 30.71-10.9 33.25-26.6a31.2 31.2 0 0 0 .46-5.46 32 32 0 0 0 -32-31.94h-160a117.66 117.66 0 0 0 -74.1 26.29l-46.5 37.71h-55.4a16 16 0 0 0 -16 16v96a16 16 0 0 0 16 16h356.77a64 64 0 0 0 40-14l151.23-121a32 32 0 0 0 1.28-48.9z"
          />
        </svg>
      ),

      description: 'Ofertas exclusivas'
    },

    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="190px"
          width="190px"
        >
          <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM4 6h16v2H4V6zm0 12v-6h16.001l.001 6H4z" />
          <path d="M6 14h6v2H6z" />
        </svg>
      ),
      description: 'Pago directo en el hotel'
    },

    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="190px"
          width="190px"
        >
          <path d="M12 19.5 A1.5 1.5 0 0 1 10.5 21 A1.5 1.5 0 0 1 9 19.5 A1.5 1.5 0 0 1 12 19.5 z" />
          <path d="M19 19.5 A1.5 1.5 0 0 1 17.5 21 A1.5 1.5 0 0 1 16 19.5 A1.5 1.5 0 0 1 19 19.5 z" />
          <path d="M14 13.99l4-5h-3v-4h-2v4h-3l4 5z" />
          <path d="M17.31 15h-6.64L6.18 4.23A2 2 0 004.33 3H2v2h2.33l4.75 11.38A1 1 0 0010 17h8a1 1 0 00.93-.64L21.76 9h-2.14z" />
        </svg>
      ),
      description: 'Compra segura'
    },

    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" height="190" width="190">
          <path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 001.873-1.298l2.757-7.351A1 1 0 0022 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0013 10h7v1.819z" />
        </svg>
      ),
      description: 'Atención personalizada'
    }
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {IHotels.map((data, index) => (
          <div
            key={index}
            className="flex items-center justify-center md:justify-between md:space-x-4 mt-4 m-4 p-4 max-w-md rounded-lg"
          >
            <div className="flex flex-col items-center">
              {data.icon && <div className="mb-2">{data.icon}</div>}
              <p className="text-black text-lg">{data.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DescriptionAboutHotels;
