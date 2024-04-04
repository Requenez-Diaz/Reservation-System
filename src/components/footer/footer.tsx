import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const email = 'alfredorequenez57libra@gmail.com';
  return (
    <div className="bg-faf1ed grid grid-cols-3 gap-4">
      <div className="col-span-1 text-black container mx-auto px-6 pt-10 pb-6">
        <h1
          className="text-black font-extrabold text-2xl md:text-3xl"
          style={{ fontFamily: 'cursive', textShadow: '2px 2px 4px #000000' }}
        >
          Hotel Madroño
        </h1>
        <p>Nueva Guinea, Nicaragua</p>

        <p>Dirección: Nueva Guinea, Zona # 8</p>
        <p>Teléfono: +505 8646 9676</p>
        <Link
          href={`mailto:${email}`}
          className="text-black hover:text-blue-400"
        >
          <p>Email: {email}</p>
        </Link>
      </div>
      <div className="col-span-1 text-black container mx-auto px-6 pt-10 pb-6">
        <Link href="/aboutUs" className="text-black hover:text-blue-400">
          <p>Acerca de nosotros</p>
        </Link>
        <Link href="/contact" className="text-black hover:text-blue-400">
          <p>Contacto</p>
        </Link>
        <Link href="/terms" className="text-black hover:text-blue-400">
          <p>Términos y condiciones</p>
        </Link>
      </div>
      <div className="col-span-1 text-black container mx-auto px-6 pt-10 pb-6">
        <Link
          href={'https://www.facebook.com/avimilex.diaz'}
          className="flex flex-row items-center text-black hover:text-blue-400"
        >
          <span className="mr-2">
            <svg
              enableBackground="new 0 0 1024 1024"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current"
              width="30"
              height="30"
            >
              <circle cx="512" cy="512" fill="#3c5a99" r="512" />
              <path
                d="m551.8 768v-233.2h78.6l11.8-91.3h-90.4v-58.1c0-26.4 7.3-44.3 45.1-44.3h47.9v-81.4c-8.3-1.1-36.9-3.6-70.2-3.6-69.5 0-117.1 42.4-117.1 120.3v67.2h-78.3v91.3h78.3v233.1z"
                fill="#fff"
              />
            </svg>
          </span>
          <p>Facebook</p>
        </Link>
        <Link
          href={'https://www.instagram.com/avimilex.diaz'}
          className=" flex flex-row items-center mt-2 text-black hover:text-blue-400"
        >
          <span className="mr-2">
            <svg
              fill="none"
              height="30"
              viewBox="0 0 92 92"
              width="30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <linearGradient
                id="a"
                gradientUnits="userSpaceOnUse"
                x1="89.802"
                x2="-1.75982"
                y1="91.5618"
                y2="-.000002"
              >
                <stop offset="0" stopColor="#fbe18a" />
                <stop offset=".21" stopColor="#fcbb45" />
                <stop offset=".38" stopColor="#f75274" />
                <stop offset=".52" stopColor="#d53692" />
                <stop offset=".74" stopColor="#8f39ce" />
                <stop offset="1" stopColor="#5b4fe9" />
              </linearGradient>
              <rect
                fill="url(#a)"
                height="91.5618"
                rx="45.7809"
                width="91.5618"
              />
              <path
                d="m38.1613 45.8981c0-4.2176 3.4171-7.6375 7.6335-7.6375s7.6353 3.4199 7.6353 7.6375-3.4189 7.6375-7.6353 7.6375-7.6335-3.4199-7.6335-7.6375zm-4.1275 0c0 6.4975 5.2654 11.7644 11.761 11.7644s11.761-5.2669 11.761-11.7644-5.2654-11.7644-11.761-11.7644-11.761 5.2669-11.761 11.7644zm21.2391-12.2309c-.0002.5438.1608 1.0754.4626 1.5276.3019.4523.731.8048 1.2331 1.0131s1.0548.263 1.588.1571 1.023-.3675 1.4075-.7519c.3846-.3843.6465-.8741.7528-1.4073.1063-.5333.0521-1.0861-.1558-1.5886-.2078-.5024-.5599-.9319-1.0118-1.2342-.4518-.3023-.9832-.4638-1.5268-.464h-.0011c-.7286.0004-1.4274.29-1.9427.8053-.5153.5152-.8051 1.2141-.8058 1.9429zm-18.7314 30.8797c-2.233-.1017-3.4468-.4738-4.2534-.7881-1.0693-.4164-1.8323-.9124-2.6345-1.7137s-1.2988-1.5638-1.7132-2.6335c-.3145-.8064-.6864-2.0209-.7879-4.2546-.1111-2.415-.1333-3.1404-.1333-9.2587s.024-6.8417.1333-9.2587c.1016-2.2337.4764-3.4458.7879-4.2547.4163-1.0696.9121-1.8328 1.7132-2.6352.8011-.8025 1.5633-1.2992 2.6345-1.7138.8062-.3145 2.0204-.6866 4.2534-.7881 2.4143-.1111 3.1395-.1333 9.2533-.1333s6.8398.0241 9.256.1333c2.2331.1017 3.4448.4765 4.2534.7881 1.0694.4146 1.8324.9124 2.6346 1.7138.8022.8013 1.2969 1.5656 1.7132 2.6352.3144.8065.6864 2.021.7879 4.2547.1111 2.417.1332 3.1404.1332 9.2587s-.0221 6.8417-.1332 9.2587c-.1017 2.2337-.4755 3.4478-.7879 4.2546-.4163 1.0697-.9121 1.8329-1.7132 2.6335s-1.5652 1.2973-2.6346 1.7137c-.8062.3145-2.0203.6866-4.2534.7881-2.4142.1111-3.1395.1333-9.256.1333s-6.8397-.0222-9.2533-.1333zm-.1896-41.4208c-2.4383.111-4.1045.4978-5.5595 1.0641-1.5069.5849-2.7826 1.3695-4.0574 2.6426-1.2747 1.2731-2.0571 2.5512-2.6418 4.0585-.5662 1.4564-.9528 3.1221-1.0639 5.5611-.1128 2.4429-.1387 3.2239-.1387 9.4457s.0259 7.0028.1387 9.4457c.1111 2.4391.4977 4.1047 1.0639 5.5611.5847 1.5064 1.3673 2.7859 2.6418 4.0585 1.2746 1.2725 2.5505 2.0561 4.0574 2.6426 1.4578.5664 3.1212.9531 5.5595 1.0642 2.4434.111 3.2229.1387 9.4429.1387 6.2201 0 7.0008-.0258 9.4429-.1387 2.4385-.1111 4.1036-.4978 5.5595-1.0642 1.506-.5865 2.7826-1.3695 4.0574-2.6426 1.2747-1.2731 2.0555-2.5521 2.6418-4.0585.5662-1.4564.9547-3.1221 1.0639-5.5611.111-2.4447.1369-3.2239.1369-9.4457s-.0259-7.0028-.1369-9.4457c-.1111-2.4391-.4977-4.1056-1.0639-5.5611-.5863-1.5064-1.3691-2.7833-2.6418-4.0585-1.2728-1.2751-2.5514-2.0577-4.0555-2.6426-1.4578-.5663-3.1231-.9549-5.5595-1.0641-2.4422-.1111-3.2229-.1388-9.443-.1388-6.22 0-7.0013.0258-9.4447.1388z"
                fill="#fff"
              />
            </svg>
          </span>
          <p>Instagram</p>
        </Link>

        <Link
          href={'https://www.twitter.com/avimilex.diaz'}
          className="flex flex-row items-center mt-2 text-black hover:text-blue-400"
        >
          <span className="mr-2">
            <svg
              enableBackground="new 0 0 1024 1024"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current"
              width={30}
              height={30}
            >
              <circle cx="512" cy="512" fill="#1da1f2" r="512" />
              <path
                d="m778 354.8c-18.8 8.3-38.9 13.9-60.1 16.5 21.6-13 38.2-33.5 46-57.9-20.2 11.8-42.7 20.4-66.5 25.2-19.1-20.4-46.2-33.2-76.4-33.2-57.8 0-104.7 46.9-104.7 104.6 0 8.3 1 16.3 2.7 23.9-87-4.1-164.2-45.9-215.8-109.1-9.1 15.4-14.2 33.2-14.2 52.7 0 36.4 18.5 68.4 46.6 87.2-17.2-.6-33.3-5.3-47.4-13.1v1.3c0 50.8 36 93.1 84 102.7-8.8 2.4-18.1 3.6-27.6 3.6-6.7 0-13.1-.6-19.5-1.8 13.4 41.6 52 71.9 98 72.7-35.7 28.1-81.1 44.8-129.8 44.8-8.3 0-16.6-.5-24.9-1.4 46.6 29.7 101.5 47 160.8 47 192.5 0 297.8-159.5 297.8-297.6 0-4.4 0-8.9-.3-13.4 20.4-14.7 38.3-33.2 52.3-54.2z"
                fill="#fff"
              />
            </svg>
          </span>
          <p>Twitter</p>
        </Link>
      </div>

      <div className="col-span-3 text-black container mx-auto px-6 pt-10 pb-6">
        <p className="text-center">
          © 2024 Hotel Madroño. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default Footer;
