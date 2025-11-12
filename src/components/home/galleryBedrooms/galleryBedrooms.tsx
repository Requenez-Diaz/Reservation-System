'use client';

import { useState } from 'react';
import Image from 'next/image';

const GalleryBedrooms = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const imagenes = [
    {
      src: 'https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Habitación de lujo con vista panorámica'
    },
    {
      src: 'https://images.pexels.com/photos/707581/pexels-photo-707581.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Suite ejecutiva moderna'
    },
    {
      src: 'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Habitación doble elegante'
    },
    {
      src: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Suite presidencial'
    }
  ];

  return (
    <section className="w-full bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Explora tu futuro
          </h2>
          <p className="text-lg text-amber-800/80 max-w-2xl mx-auto">
            Creamos un mundo donde puedes reservar a un solo click
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {imagenes.map((imagen, index) => (
            <div
              key={index}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                alt={imagen.alt}
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                fill
                src={imagen.src || '/placeholder.svg'}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-medium text-sm">{imagen.alt}</p>
                </div>
              </div>
              {/* Border accent */}
              <div className="absolute inset-0 border-2 border-amber-400/0 group-hover:border-amber-400/50 rounded-2xl transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </button>
            <div className="relative max-w-5xl w-full aspect-video">
              <Image
                alt={imagenes[selectedImage].alt}
                className="object-contain"
                fill
                src={imagenes[selectedImage].src || '/placeholder.svg'}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryBedrooms;
