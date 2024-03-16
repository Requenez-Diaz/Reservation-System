import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const email = 'alfredorequenez57libra@gmail.com';
  return (
    <div className="bg-blue-950 grid grid-cols-3 gap-4">
      <div className="col-span-1 text-white container mx-auto px-6 pt-10 pb-6">
        <h1
          className="text-white font-extrabold text-2xl md:text-3xl"
          style={{ fontFamily: 'cursive', textShadow: '2px 2px 4px #000000' }}
        >
          Hotel Madroño
        </h1>
        <p>Nueva Guinea, Nicaragua</p>

        <p>Dirección: Nueva Guinea, Zona # 8</p>
        <p>Teléfono: +505 8646 9676</p>
        <Link
          href={`mailto:${email}`}
          className="text-white hover:text-blue-400"
        >
          <p>Email: {email}</p>
        </Link>
      </div>
      <div className="col-span-1 text-white container mx-auto px-6 pt-10 pb-6">
        <Link href="/aboutUs" className="text-white hover:text-blue-400">
          <p>Acerca de nosotros</p>
        </Link>
        <Link href="/contact" className="text-white hover:text-blue-400">
          <p>Contacto</p>
        </Link>
        <Link href="/terms" className="text-white hover:text-blue-400">
          <p>Términos y condiciones</p>
        </Link>
      </div>
      <div className="col-span-1 text-white container mx-auto px-6 pt-10 pb-6">
        <Link
          href={'https://www.facebook.com/avimilex.diaz'}
          className="text-white hover:text-blue-400"
        >
          <p>Facebook</p>
        </Link>
        <Link
          href={'https://www.instagram.com/avimilex.diaz'}
          className="text-white hover:text-blue-400"
        >
          <p>Instagram</p>
        </Link>

        <Link
          href={'https://www.twitter.com/avimilex.diaz'}
          className="text-white hover:text-blue-400"
        >
          <p>Twitter</p>
        </Link>
      </div>

      <div className="col-span-3 text-white container mx-auto px-6 pt-10 pb-6">
        <p className="text-center">
          © 2024 Hotel Madroño. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default Footer;
