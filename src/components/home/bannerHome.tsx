'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const BannerHome = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={ref} className="relative w-full h-96 overflow-hidden">
      <motion.div style={{ y }} className="absolute w-full h-full">
        <Image
          alt="Banner Image"
          className="object-cover w-full h-full opacity-80"
          height={1080}
          width={1920}
          src="/pexels-helena-lopes-2017802.jpg"
        />
        <motion.div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-50 bg-opacity-70 text-white flex flex-col items-center justify-center rounded-2xl px-6 py-8 w-11/12 sm:w-2/3 md:w-1/2">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-bold mb-4 text-black text-center"
          >
            Bienvenido a SIRHM
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-center text-black"
          >
            Este es uno de los sistemas de reservas de hoteles más avanzados de
            Nueva Guinea donde todo lo encontrarás a un clic de distancia.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BannerHome;
