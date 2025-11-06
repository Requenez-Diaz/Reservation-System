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
    <div className="w-full bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-amber-900">
          Ventajas Exclusivas de SIRMH Hotel Madroño
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="border-amber-200 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-full shadow-lg">
                  <benefit.Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-base text-amber-900 leading-tight">
                  {benefit.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
