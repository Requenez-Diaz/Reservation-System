'use client';

import type React from 'react';

import { useState } from 'react';
import { Star, Calendar, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  roomType: string;
  stayDate: string;
  location: string;
}

const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'María González',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 5,
    comment:
      '¡Experiencia increíble! La habitación estaba impecable y el servicio fue excepcional. Definitivamente volveré a reservar aquí.',
    roomType: 'Suite Deluxe',
    stayDate: 'Marzo 2024',
    location: 'Madrid, España'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 5,
    comment:
      'Perfecto para mi viaje de negocios. Ubicación excelente, WiFi rápido y desayuno delicioso. Muy recomendado.',
    roomType: 'Habitación Ejecutiva',
    stayDate: 'Febrero 2024',
    location: 'Barcelona, España'
  },
  {
    id: 3,
    name: 'Ana Martínez',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 4,
    comment:
      'Muy buena relación calidad-precio. Las instalaciones están bien mantenidas y el personal es muy amable.',
    roomType: 'Habitación Estándar',
    stayDate: 'Enero 2024',
    location: 'Valencia, España'
  }
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(initialTestimonials);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: '',
    roomType: '',
    stayDate: '',
    location: ''
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTestimonial: Testimonial = {
      id: testimonials.length + 1,
      name: formData.name,
      avatar: '/placeholder.svg?height=40&width=40',
      rating: formData.rating,
      comment: formData.comment,
      roomType: formData.roomType,
      stayDate: formData.stayDate,
      location: formData.location
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setFormData({
      name: '',
      rating: 5,
      comment: '',
      roomType: '',
      stayDate: '',
      location: ''
    });
    setShowForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          Lo que dicen nuestros huéspedes
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubre las experiencias reales de quienes han elegido nuestras
          habitaciones
        </p>
      </div>

      {/* Add Review Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {showForm ? 'Cancelar' : 'Escribir reseña'}
        </Button>
      </div>

      {/* Review Form */}
      {showForm && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <h3 className="text-xl font-semibold">Comparte tu experiencia</h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Input
                    id="location"
                    placeholder="Ciudad, País"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roomType">Tipo de habitación</Label>
                  <Select
                    value={formData.roomType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, roomType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">
                        Habitación Estándar
                      </SelectItem>
                      <SelectItem value="deluxe">Habitación Deluxe</SelectItem>
                      <SelectItem value="suite">Suite</SelectItem>
                      <SelectItem value="executive">
                        Habitación Ejecutiva
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stayDate">Fecha de estancia</Label>
                  <Input
                    id="stayDate"
                    placeholder="Mes Año"
                    value={formData.stayDate}
                    onChange={(e) =>
                      setFormData({ ...formData, stayDate: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Calificación</Label>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, rating: i + 1 })
                      }
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          i < formData.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Tu comentario</Label>
                <Textarea
                  id="comment"
                  placeholder="Comparte tu experiencia con nosotros..."
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Publicar reseña
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="h-full">
            <CardContent className="p-6 space-y-4">
              {/* User Info */}
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={testimonial.avatar || '/placeholder.svg'}
                    alt={testimonial.name}
                  />
                  <AvatarFallback>
                    {testimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="h-3 w-3" />
                    {testimonial.location}
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(testimonial.rating)}</div>
                <span className="text-sm text-gray-600">
                  ({testimonial.rating}/5)
                </span>
              </div>

              {/* Comment */}
              <p className="text-gray-700 leading-relaxed">
                {testimonial.comment}
              </p>

              {/* Stay Details */}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{testimonial.stayDate}</span>
                </div>
                <div className="text-sm font-medium text-blue-600">
                  {testimonial.roomType}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">4.8</div>
            <div className="text-sm text-gray-600">Calificación promedio</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">
              {testimonials.length}
            </div>
            <div className="text-sm text-gray-600">Reseñas totales</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">98%</div>
            <div className="text-sm text-gray-600">Huéspedes satisfechos</div>
          </div>
        </div>
      </div>
    </div>
  );
}
