import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Instagram } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const TrustBar: React.FC = () => {
  const { settings } = useStore();

  const trustItems = [
    {
      icon: Truck,
      title: 'FREE PAN-INDIA DELIVERY',
      subtitle: `On all orders over ₹${settings.freeShippingThreshold}`
    },
    {
      icon: RotateCcw,
      title: 'QUALITY ASSURANCE',
      subtitle: 'GMP-certified formulation standards'
    },
    {
      icon: ShieldCheck,
      title: 'SECURE PAYMENTS',
      subtitle: '100% Encrypted UPI, Cards & NetBanking'
    },
    {
      icon: Instagram,
      title: 'JOIN OUR COMMUNITY',
      subtitle: '@adsim.care on Instagram'
    }
  ];

  return (
    <section className="bg-[#FAF7F2] border-b border-[#ECE7DC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-4 py-2">
                <div className="w-10 h-10 rounded-full bg-[#EFE9DD] border border-[#DFD8CB] flex items-center justify-center text-[#153323] shrink-0">
                  <Icon className="w-5 h-5 stroke-[1.6]" />
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#153323]">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-[#706B62] font-light">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
