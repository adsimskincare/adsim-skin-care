import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';

export const NewArrivals: React.FC = () => {
  const { products, setCurrentPage } = useStore();

  const displayProducts = products.filter(p => p.isPublished).slice(0, 5);

  return (
    <section className="bg-white py-14 lg:py-20 border-b border-[#ECE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] mb-1.5 block">
            OFFICIAL ADSIM RANGE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#153323] font-normal tracking-tight">
            New Arrivals
          </h2>
          <p className="text-xs text-[#706B62] font-light mt-1">
            Science-backed formulations with transparent ingredients and dermatological safety.
          </p>
        </div>

        {/* 5-Product Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
