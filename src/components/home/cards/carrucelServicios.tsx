import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export function CarouselDemo() {
    const imageUrls = [
        "https://www.ceupe.com/images/easyblog_articles/2539/b2ap3_amp_Caractersticas-de-las-instalaciones-hoteleras.jpg",
        'https://53b20a41c2.cbaul-cdnwnd.com/bc429e9705d589d7e52e3dc4234143aa/200000007-6b2af6c247/hab%20tirple.jpg',
        "https://example.com/image3.jpg",
        "https://example.com/image4.jpg",
        "https://example.com/image5.jpg"
    ];

    return (
        <div className="container mx-auto mt-4 flex">
            <div className="w-1/2 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Servicios Disponibles</h2>
                <p className="text-gray-700 mb-4">
                    Descubre los servicios que tenemos disponibles para hacer de tu estadía
                    una experiencia inolvidable. Ofrecemos una amplia gama de servicios diseñados
                    para satisfacer tus necesidades y mejorar tu estancia. Desde deliciosas opciones
                    gastronómicas hasta emocionantes actividades recreativas, ¡tenemos todo lo que
                    necesitas para una experiencia inolvidable!
                </p>
                <Button className="bg-black text-white px-4 py-2 rounded transition-all duration-300 hover:bg-gray-600 hover:text-white">
                    <Link href="/servicios">Explorar Servicios</Link>
                </Button>
            </div>

            <div className="w-1/2 flex items-center justify-center space-x-4">
                <Carousel className="max-w-xs">
                    <CarouselContent>
                        {imageUrls.map((url, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-3">
                                            <img src={url} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
}
