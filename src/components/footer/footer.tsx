import React from 'react';

const Footer = () => {
  const email = 'alfredorequenez57libra@gmail.com';
  return (
    <div className="bg-blue-950 grid grid-cols-3 gap-4">
      <div className="col-span-1 text-white container mx-auto px-6 pt-10 pb-6">
        <p>Avimilex &copy; 2024</p>
        <p>Dirección: Nueva Guinea, Zona # 8</p>
        <p>Teléfono: +505 8646 9676</p>
        <p>
          Email: <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>
      <div className="col-span-1 text-white container mx-auto px-6 pt-10 pb-6">
        <p>Acerca de Nosotros</p>
        <p>Contactanos</p>
        <p>Terminos y Condiciones</p>
      </div>
      <div className="col-span-1 text-white container mx-auto px-6 pt-10 pb-6">
        <p>Facebook</p>
        <p>Instagram</p>
        <p>Twitter</p>
      </div>
    </div>
  );
};

export default Footer;
