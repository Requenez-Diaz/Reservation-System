'use client';

import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem
} from '@/components/ui/select';
import { Card, CardHeader, Select, Textarea } from '@nextui-org/react';

import { Star } from 'lucide-react';
import { useState } from 'react';

export const FormsTestimonial = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    comment: '',
    stayDate: '',
    rating: 5
  });

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
                <SelectItem value="standard">Habitación Estándar</SelectItem>
                <SelectItem value="deluxe">Habitación Deluxe</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
                <SelectItem value="executive">Habitación Ejecutiva</SelectItem>
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
                onClick={() => setFormData({ ...formData, rating: i + 1 })}
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

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Publicar reseña
        </Button>
      </form>
    </CardContent>
  </Card>;
};
