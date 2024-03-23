'use client'
import { useState } from "react";

const ReservationForm = () => {
    const [formData, setFormData] = useState({
        fechaLlegada: '',
        fechaSalida: '',
        tipoHabitacion: 'individual',
        cantidadHuespedes: '1',
        nombre: '',
        correo: '',
        telefono: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-blue-600 mb-2">Formulario de Reserva</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="fecha-llegada" className="block text-gray-700 mb-1">Fecha de Llegada:</label>
                        <input type="date" id="fecha-llegada" name="fechaLlegada" value={formData.fechaLlegada} onChange={handleChange} required className="block w-full border-gray-300 rounded-md p-2 bg-gray-100" />
                    </div>
                    <div>
                        <label htmlFor="fecha-salida" className="block text-gray-700 mb-1">Fecha de Salida:</label>
                        <input type="date" id="fecha-salida" name="fechaSalida" value={formData.fechaSalida} onChange={handleChange} required className="block w-full border-gray-300 rounded-md p-2 bg-gray-100" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="tipo-habitacion" className="block text-gray-700 mb-1">Tipo de Habitación:</label>
                        <select id="tipo-habitacion" name="tipoHabitacion" value={formData.tipoHabitacion} onChange={handleChange} required className="block w-full border-gray-300 rounded-md p-2 bg-gray-100">
                            <option value="individual">Individual</option>
                            <option value="doble">Doble</option>
                            <option value="suite">Suite</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="cantidad-huespedes" className="block text-gray-700 mb-1">Cantidad de Huéspedes:</label>
                        <input type="number" id="cantidad-huespedes" name="cantidadHuespedes" value={formData.cantidadHuespedes} onChange={handleChange} min="1" max="4" required className="block w-full border-gray-300 rounded-md p-2 bg-gray-100" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="nombre" className="block text-gray-700 mb-1">Nombre:</label>
                        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required className="block w-full border-gray-300 rounded-md p-2 bg-gray-100" />
                    </div>
                    <div>
                        <label htmlFor="correo" className="block text-gray-700 mb-1">Correo Electrónico:</label>
                        <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} required className="block w-full border-gray-300 rounded-md p-2 bg-gray-100" />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="telefono" className="block text-gray-700 mb-1">Teléfono:</label>
                    <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required className="block w-full border-gray-300 rounded-md p-2 bg-gray-100" />
                </div>

                <div className="text-center">
                    <input type="submit" value="Reservar Habitación" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer transition duration-300" />
                </div>
            </form>
        </div>
    );
};

export default ReservationForm;
