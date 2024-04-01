import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const ServicesCards: React.FC = () => {
    return (
        <div className="container mx-auto mt-8 flex justify-between">
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
            <div className="w-1/2 bg-white rounded-lg shadow-lg p-6">
                <img src="https://www.ceupe.com/images/easyblog_articles/2539/b2ap3_amp_Caractersticas-de-las-instalaciones-hoteleras.jpg" alt="Imagen de servicio" className="w-full h-auto rounded-lg" />
            </div>
        </div>
    );
};

export default ServicesCards;
