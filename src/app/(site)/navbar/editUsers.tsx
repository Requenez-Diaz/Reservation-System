'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Briefcase, Calendar } from 'lucide-react';

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@ejemplo.com',
    phone: '+34 123 456 789',
    address: 'Calle Mayor 123, 28001 Madrid, España',
    occupation: 'Desarrollador de Software',
    birthdate: '1990-01-01',
    bio: 'Desarrollador apasionado con experiencia en React y Node.js. Me encanta crear aplicaciones web innovadoras y resolver problemas complejos.'
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí normalmente enviarías los datos actualizados al backend
    console.log('Datos del usuario actualizados:', userData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Perfil de Usuario
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex justify-center">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder.svg" alt={userData.name} />
                  <AvatarFallback>
                    {userData.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Nombre
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                ) : (
                  <p className="text-gray-700">{userData.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Correo electrónico
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                ) : (
                  <p className="text-gray-700">{userData.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Teléfono
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                ) : (
                  <p className="text-gray-700">{userData.phone}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="address"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Dirección
                </Label>
                {isEditing ? (
                  <Input
                    id="address"
                    name="address"
                    value={userData.address}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                ) : (
                  <p className="text-gray-700">{userData.address}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="occupation"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  Ocupación
                </Label>
                {isEditing ? (
                  <Input
                    id="occupation"
                    name="occupation"
                    value={userData.occupation}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                ) : (
                  <p className="text-gray-700">{userData.occupation}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="birthdate"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Fecha de nacimiento
                </Label>
                {isEditing ? (
                  <Input
                    id="birthdate"
                    name="birthdate"
                    type="date"
                    value={userData.birthdate}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                ) : (
                  <p className="text-gray-700">{userData.birthdate}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium">
                  Biografía
                </Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    name="bio"
                    value={userData.bio}
                    onChange={handleInputChange}
                    className="w-full h-24"
                  />
                ) : (
                  <p className="text-gray-700">{userData.bio}</p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          {isEditing ? (
            <>
              <Button onClick={() => setIsEditing(false)} variant="outline">
                Cancelar
              </Button>
              <Button onClick={handleSubmit}>Guardar cambios</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Editar perfil</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
