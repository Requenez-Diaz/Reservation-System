'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Gift, CreditCard, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function BenefitsIconsHotels() {
  const benefits = [
    { Icon: Gift, title: 'Ofertas exclusivas' },
    { Icon: CreditCard, title: 'Pago directo' },
    { Icon: ShieldCheck, title: 'Compra segura' },
    { Icon: HeartHandshake, title: 'Atención personalizada' }
  ];

  return (
    <div className="w-full bg-gradient-to-r from-amber-50 to-orange-100 p-4 shadow-lg">
      <h2 className="text-xl font-bold text-center mb-4 text-black">
        Ventajas Exclusivas de SIRMH Hotel Madroño
      </h2>
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {benefits.map((benefit, index) => (
          <Card
            key={index}
            className="w-full sm:w-1/4 shadow-md bg-white"
          >
            <CardContent className="p-3 flex flex-col items-center text-center">
              <div className="bg-blue-500 p-3 rounded-full mb-2">
                <benefit.Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm text-center text-black">
                {benefit.title}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
