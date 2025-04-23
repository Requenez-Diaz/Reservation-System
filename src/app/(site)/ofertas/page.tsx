import Banner from '@/components/offers/Banner';
import RoomCard from '@/components/offers/roomCard';
import { Button } from '@/components/ui/button';

export default function OfertasPage() {
  // Sample offers data with discounted prices
  const offers = [
    {
      id: 1,
      type: 'Habitación Estándar',
      description:
        'Disfruta de nuestra habitación estándar con un 15% de descuento para estancias de 3 noches o más.',
      image:
        'https://cdn.pixabay.com/photo/2021/12/25/09/40/book-6892701_1280.jpg',
      price: 85,
      originalPrice: 100,
      discount: '15%'
    },
    {
      id: 2,
      type: 'Suite de Lujo',
      description:
        'Experimenta el lujo con un 20% de descuento en nuestras suites para reservas anticipadas.',
      image:
        'https://cdn.pixabay.com/photo/2021/12/25/09/40/new-year-6892704_1280.jpg',
      price: 160,
      originalPrice: 200,
      discount: '20%'
    },
    {
      id: 3,
      type: 'Habitación Estándar',
      description:
        'Oferta especial de temporada baja con desayuno incluido y late check-out.',
      image:
        'https://media.istockphoto.com/id/2025383353/photo/modern-contemporary-cozy-white-bedroom-view-from-outside-the-room-through-the-door-3d-render.jpg?s=2048x2048&w=is&k=20&c=WP6h8uj2gQSgwAHw62KVWtEN-5BQh4Bdkq-bPU8ZZEU=',
      price: 90,
      originalPrice: 110,
      discount: '18%'
    },
    {
      id: 4,
      type: 'Suite de Lujo',
      description:
        'Paquete romántico con descuento, incluye cena para dos y decoración especial.',
      image: '/placeholder.svg?height=300&width=500',
      price: 180,
      originalPrice: 220,
      discount: '18%'
    },
    {
      id: 5,
      type: 'Habitación Estándar',
      description:
        'Oferta flash de último minuto, disponibilidad limitada para este fin de semana.',
      image: '/placeholder.svg?height=300&width=500',
      price: 75,
      originalPrice: 100,
      discount: '25%'
    },
    {
      id: 6,
      type: 'Suite de Lujo',
      description:
        'Oferta exclusiva para miembros: 3 noches al precio de 2 con acceso al spa.',
      image: '/placeholder.svg?height=300&width=500',
      price: 170,
      originalPrice: 255,
      discount: '33%'
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <Banner
        image="/placeholder-banner.svg?height=400&width=800"
        text="¡Descubre nuestras ofertas exclusivas!"
      />
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Ofertas Especiales
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Descubre nuestras ofertas exclusivas y disfruta de una estancia
          inolvidable a precios increíbles. Estas promociones son por tiempo
          limitado, ¡reserva ahora!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer) => (
          <div key={offer.id} className="relative">
            <div className="absolute top-0 left-0 z-10 bg-destructive text-destructive-foreground font-bold py-1 px-3 rounded-br-lg">
              -{offer.discount}
            </div>
            <RoomCard
              type={offer.type}
              description={offer.description}
              image={offer.image}
              price={offer.price}
            />
            <div className="mt-2 text-center text-sm text-muted-foreground">
              <span className="line-through">${offer.originalPrice}</span> —
              Ahorra ${offer.originalPrice - offer.price}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-semibold mb-4">¿Buscas algo especial?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Contáctanos directamente para conocer más ofertas personalizadas o
          para grupos.
        </p>
        <Button size="lg" className="bg-primary text-primary-foreground">
          Contactar para ofertas especiales
        </Button>
      </div>
    </div>
  );
}
