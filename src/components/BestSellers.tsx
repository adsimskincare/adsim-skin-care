import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';

export const BestSellers: React.FC = () => {
  const { products, setCurrentPage } = useStore();

  const displayProducts = products.filter(p => p.isPublished && p.isBestSeller).slice(0, 5);

  return (
    <section className="bg-[#FAF7F2] py-14 lg:py-20 border-b border-[#ECE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#ECE7DC]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] mb-1.5 block">
              MOST LOVED IN INDIA
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#153323] font-normal tracking-tight">
              Our Best Sellers
            </h2>
            <p className="text-xs text-[#706B62] mt-1 font-light">
              Targeted Care. Everyday Confidence. Flip cards to inspect front and back bottle labels.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentPage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-[#153323] hover:text-[#1E422F] px-4 py-2 border border-[#D9D3C5] rounded-full hover:border-[#153323] bg-white transition-all self-start sm:self-auto"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5-Product Grid matching reference screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
