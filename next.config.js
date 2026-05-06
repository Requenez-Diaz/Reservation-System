/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com'
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com'
      },
      {
        protocol: 'https',
        hostname: 'www.ceupe.com'
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com'
      },
      {
        protocol: 'https',
        hostname: 'josecamachofotografia.com'
      },

      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/bedrooms/**'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'fxdmgtvjvretdeqrqxby.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**'
      }
    ],
    unoptimized: true
  },
  async rewrites() {
    return [
      {
        // 1. Solicitud Interna (Frontend 3001):
        // Solo capturamos el nombre del archivo. Ejemplo: /api-imagenes/bedroom_176...jpg
        source: '/api-imagenes/:fileName',

        // 2. Destino (Servidor de Recursos 3000):
        // Reconstruimos la ruta completa que sabemos que el servidor 3000
        // debe servir, usando la subcarpeta DENTRO de public.
        destination: 'http://localhost:3000/uploads/bedrooms/:fileName'
      }
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'off'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },

  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;
