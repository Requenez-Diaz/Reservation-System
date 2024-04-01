import React from 'react';
import ReservationForm from './reservationForm';

const Reservas: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-600 mb-2">Reservaciones</h2>
                <p className="text-lg text-gray-700">¡Gracias por elegir nuestro hotel para tu próxima estancia! Estamos emocionados de recibirte. A continuación, encontrarás información sobre cómo realizar una reserva y nuestras políticas de cancelación.</p>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-bold text-blue-600 mb-2">Cómo realizar una reserva</h3>
                <p className="text-gray-700 mb-4">Para reservar una habitación en nuestro hotel, simplemente sigue estos pasos:</p>
                <ol className="list-decimal ml-8 mb-4">
                    <li className="mb-2">Selecciona la fecha de llegada y salida deseada en nuestro calendario de disponibilidad.</li>
                    <li className="mb-2">Elige el tipo de habitación que prefieras y la cantidad de huéspedes.</li>
                    <li className="mb-2">Completa el formulario de reserva con tu información personal y de pago.</li>
                    <li>Una vez que hayas confirmado tu reserva, recibirás un correo electrónico de confirmación con todos los detalles de tu estadía.</li>
                </ol>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-bold text-blue-600 mb-2">Política de cancelación</h3>
                <p className="text-gray-700 mb-4">Entendemos que los planes pueden cambiar, por lo que ofrecemos flexibilidad en nuestras políticas de cancelación. A continuación se detallan nuestras políticas generales:</p>
                <ul className="list-disc ml-8 mb-4">
                    <li className="mb-2">Cancelaciones realizadas con al menos 24 horas de anticipación a la fecha de llegada programada no incurrirán en cargos adicionales.</li>
                    <li className="mb-2">Para cancelaciones realizadas dentro de las 24 horas previas a la llegada o en caso de no presentación, se cargará la primera noche de la reserva.</li>
                    <li>En caso de cancelación, se emitirá un reembolso completo si la reserva se cancela con al menos 48 horas de anticipación a la fecha de llegada.</li>
                </ul>
            </div>
            <ReservationForm/>
        </div>
    );
};

export default Reservas;
