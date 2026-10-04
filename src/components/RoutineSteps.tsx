import React from 'react';
import { Sparkles, Shield, Droplets, Sun } from 'lucide-react';

export const RoutineSteps: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'CLEANSE',
      icon: Droplets,
      description: 'Choose your targeted face wash — Acnova, Glowvera, Hydrovia, or Oilvera — to clear dirt and excess sebum without stripping natural lipids.'
    },
    {
      num: '02',
      title: 'TARGET YOUR CONCERN',
      icon: Sparkles,
      description: 'Allow chosen actives (Salicylic Acid, Ethyl Ascorbic Acid, or Hyaluronic Acid) to work directly on acne, tan, or hydration needs.'
    },
    {
      num: '03',
      title: 'HYDRATE',
      icon: Shield,
      description: 'Apply Moisturizing Yogurt Cream to cushion the skin barrier with Trehalose, Allantoin, and Sodium Hyaluronate.'
    },
    {
      num: '04',
      title: 'PROTECT YOUR SKIN',
      icon: Sun,
      description: 'Shield daytime skin with a broad-spectrum daily sunscreen to prevent UV photo-damage and preserve skin health.'
    }
  ];

  return (
    <section className="bg-[#FAF7F2] py-16 lg:py-24 border-b border-[#ECE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] mb-2 block">
            HOW TO BUILD YOUR ROUTINE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#153323] font-normal tracking-tight mb-3">
            Simple Steps. Better Routine.
          </h2>
          <p className="text-sm text-[#706B62] font-light">
            Effective skincare doesn't need to be complex. A focused, 4-step ritual supports long-term skin health.
          </p>
        </div>

        {/* 4 Steps Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="bg-[#FFFFFF] border border-[#ECE7DC] p-6 rounded relative flex flex-col justify-between hover:border-[#153323] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl text-[#C4A468] font-medium">
                      STEP {step.num}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E5DFD3] flex items-center justify-center text-[#153323]">
                      <Icon className="w-4 h-4 stroke-[1.8]" />
                    </div>
                  </div>

                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#153323] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-[12px] text-[#6E685F] font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F5F2EB] text-[10px] uppercase tracking-wider text-[#A69F91]">
                  Daily Habit
                </div>
              </div>
            );
          })}
        </div>

        {/* Sunscreen reminder disclaimer */}
        <div className="mt-8 text-center bg-[#F5F1E8] border border-[#E5DFD3] py-3.5 px-6 rounded max-w-xl mx-auto">
          <p className="text-xs text-[#706B62] font-light">
            * Note: Broad-spectrum sunscreen should always be applied as the final daytime step for comprehensive skin protection.
          </p>
        </div>

      </div>
    </section>
  );
};
