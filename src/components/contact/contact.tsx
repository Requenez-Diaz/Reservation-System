'use client';

import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        <p className="text-green-500">
          ¡Gracias por tu mensaje! Te responderemos pronto.
        </p>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          {' '}
          <div>
            <label className="block font-medium" htmlFor="name">
              Nombre:
            </label>{' '}
            <input
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500" // CORREGIDO (Línea 35)
              id="name"
              name="name"
              onChange={handleChange}
              required
              type="text"
              value={formData.name}
            />
          </div>
          <div>
            <label className="block font-medium" htmlFor="email">
              Correo electrónico:
            </label>{' '}
            <input
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500" // CORREGIDO (Línea 47)
              id="email"
              name="email"
              onChange={handleChange}
              required
              type="email"
              value={formData.email}
            />
          </div>
          <div>
            <label className="block font-medium" htmlFor="message">
              Mensaje:
            </label>{' '}
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500" // CORREGIDO (Línea 61)
              id="message"
              name="message"
              onChange={handleChange}
              required
              rows={4}
              value={formData.message}
            />
          </div>
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
            type="submit"
          >
            Enviar
          </button>{' '}
        </form>
      )}
    </div>
  );
};

export default ContactForm;
