import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { TwentyFourHours } from 'tabler-icons-react';
import { Sofa } from 'lucide-react';
import { Wifi } from 'tabler-icons-react';
import { MessageCircle2 } from 'tabler-icons-react';

const ServicesInterface = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-8 mt-2">
          Aprovecha de los increibles Servicios
        </h1>
        <p className="text-1xl mb-8">
          Lo mejor que podes encontrar desde du casa, lo mas importante es
          hacerlo con un solo click
        </p>
      </div>
      <div className="flex flex-row columns-4 w-screen justify-center p-8 ml-3">
        <Card className=" bg-blue-600 m-3">
          <CardHeader>
            <div>
              <TwentyFourHours size={48} strokeWidth={2} color={'black'} />
            </div>
            <CardTitle>Horarios flexibles</CardTitle>
            <CardDescription className="text-white">
              La estadia depende de ti, y tus ganas de difrutar{' '}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className=" bg-blue-600 m-3">
          <CardHeader>
            <div>
              <Sofa size={48} strokeWidth={2} color={'black'} />
            </div>
            <CardTitle>Comodidad</CardTitle>
            <CardDescription className="text-white">
              La comodidad es lo mas importante, y tu lo sabes
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className=" bg-blue-600 m-3">
          <CardHeader>
            <Wifi size={48} strokeWidth={2} color={'black'} />
            <CardTitle>Internet</CardTitle>
            <CardDescription className="text-white">
              El internet es lo mas importante para tu estadia
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className=" bg-blue-600 m-3">
          <CardHeader>
            <MessageCircle2 size={48} strokeWidth={2} color={'#black'} />
            <CardTitle>Atencion 24/7</CardTitle>
            <CardDescription className="text-white">
              La atencion es lo mas importante para tu estadia
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default ServicesInterface;
