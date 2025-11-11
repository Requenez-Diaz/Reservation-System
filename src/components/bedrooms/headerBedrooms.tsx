'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

function HeaderBedrooms() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <div className="absolute inset-0 scale-[1.03] animate-slow-zoom">
        <Image
          alt="Imagen de fondo de habitaciones"
          className="transition-all duration-700"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
          src={'/pexels-helena-lopes-2017802.jpg'}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 animate-fade-in" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="text-white text-4xl md:text-5xl text-center font-bold mb-4 drop-shadow-lg">
            <span className="inline-block animate-slide-up">Nuestras</span>{' '}
            <span className="inline-block animate-slide-up animation-delay-200">
              Habitaciones
            </span>
          </h1>

          <div className="w-24 h-1 bg-white mx-auto rounded-full animate-width-expand" />

          <p className="text-white/90 mt-4 max-w-md mx-auto text-lg animate-fade-in animation-delay-400"></p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/30 to-transparent" />

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
          <svg
            className="h-4 w-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default HeaderBedrooms;
