'use client';

import Image from 'next/image';

const HeaderAboutUs = () => {
  return (
    <div className="relative h-64 md:h-80 lg:h-96">
      <Image
        alt="Hotel Madroño"
        src="/pexels-helena-lopes-2017802.jpg"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/50 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center tracking-tight">
          Sobre Nosotros
        </h1>
      </div>
    </div>
  );
};

export default HeaderAboutUs;
