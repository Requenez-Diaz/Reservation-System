import React from 'react';

const Services: React.FC = () => {
    return (
        <div className="bg-gray-100 py-8">
            <h1 className='text-3xl font-bold mb-8 text-center'>
                Nuestros servicios
            </h1>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Servicio de habitaciones 24/7</h2>
                    <p className="text-gray-700">
                        Nuestro hotel ofrece servicio de habitaciones las 24 horas del día, los 7 días de la semana,
                        para garantizar que tu estancia sea cómoda y conveniente.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Spa y centro de bienestar</h2>
                    <p className="text-gray-700">
                        Relájate y rejuvenece en nuestro spa de lujo, donde ofrecemos una variedad de tratamientos
                        para satisfacer todas tus necesidades de bienestar y relajación.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Desayuno buffet incluido</h2>
                    <p className="text-gray-700">
                        Disfruta de un delicioso desayuno buffet todas las mañanas durante tu estancia,
                        incluido en el precio de tu reserva.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Services;
