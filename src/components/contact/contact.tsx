'use client'

import React, { useState } from 'react';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
        setIsSubmitted(true);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>
            {isSubmitted ? (
                <p className="text-green-500">¡Gracias por tu mensaje! Te responderemos pronto.</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block font-medium">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-medium">Correo electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block font-medium">Mensaje:</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">Enviar</button>
                </form>
            )}
        </div>
    );
};

export default ContactForm;
