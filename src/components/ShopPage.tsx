import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products, selectedConcernFilter, setSelectedConcernFilter } = useStore();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceMax, setPriceMax] = useState<number>(600);

  const concerns = [
    { id: 'all', label: 'All Concerns' },
    { id: 'acne', label: 'Acne-Prone Skin' },
    { id: 'oil-control', label: 'Oily & Combination' },
    { id: 'tan-removal', label: 'Tan & Dullness' },
    { id: 'hydration', label: 'Dry & Sensitive' },
    { id: 'barrier-repair', label: 'Dehydrated / Barrier' }
  ];

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'face-wash', label: 'Face Washes' },
    { id: 'moisturizer', label: 'Moisturizers' }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p.isPublished) return false;

      // Concern filter
      if (selectedConcernFilter && selectedConcernFilter !== 'all' && selectedConcernFilter !== 'best-sellers') {
        if (p.skinConcern !== selectedConcernFilter) return false;
      }

      if (selectedConcernFilter === 'best-sellers') {
        if (!p.isBestSeller) return false;
      }

      // Category filter
      if (categoryFilter !== 'all') {
        if (categoryFilter === 'face-wash' && !p.category.toLowerCase().includes('wash')) return false;
        if (categoryFilter === 'moisturizer' && !p.category.toLowerCase().includes('moisturizer')) return false;
      }

      // Price filter
      if (p.price > priceMax) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [products, selectedConcernFilter, categoryFilter, priceMax, sortBy]);

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumb */}
        <div className="border-b border-[#ECE7DC] pb-8 mb-10">
          <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] mb-1.5 block">
            THE ADSIM FORMULARY
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#153323] font-normal tracking-tight mb-2">
            Shop ADSIM CARE
          </h1>
          <p className="text-sm text-[#706B62] font-light max-w-xl">
            Targeted facial skincare formulated with carefully selected ingredients, crafted specifically for Indian skin needs and diverse climates.
          </p>
        </div>

        {/* Filter Bar & Controls */}
        <div className="bg-white border border-[#ECE7DC] rounded-lg p-4 sm:p-5 mb-10 shadow-xs space-y-4">
          
          {/* Top row: Concern tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#153323] mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#153323]" />
              <span>Skin Concern:</span>
            </span>

            {concerns.map((c) => {
              const active = (selectedConcernFilter || 'all') === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedConcernFilter(c.id === 'all' ? null : c.id)}
                  className={`px-3 py-1.5 text-xs rounded transition-all ${
                    active
                      ? 'bg-[#153323] text-white font-medium shadow-xs'
                      : 'bg-[#FAF7F2] text-[#635E55] hover:bg-[#EFE9DD] hover:text-[#153323]'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* Bottom row: Category, Price Slider, Sort dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-[#F5F2EB] text-xs">
            
            {/* Category tabs */}
            <div className="flex items-center gap-2">
              <span className="text-[#8C8578] uppercase text-[10px] tracking-wider">Product Type:</span>
              <div className="flex gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-2.5 py-1 rounded ${
                      categoryFilter === cat.id
                        ? 'bg-[#EFE9DD] text-[#153323] font-semibold'
                        : 'text-[#706B62] hover:text-[#153323]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort & Price Filter */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[#8C8578] uppercase text-[10px] tracking-wider">Max Price: ₹{priceMax}</span>
                <input
                  type="range"
                  min="200"
                  max="600"
                  step="50"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="accent-[#153323] w-24 h-1.5 bg-[#E5DFD3] rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C8578]" />
                <span className="text-[#8C8578] uppercase text-[10px] tracking-wider">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#FAF7F2] border border-[#D9D3C5] rounded py-1 px-2 text-xs text-[#2C2C2A] focus:outline-hidden focus:border-[#153323]"
                >
                  <option value="featured">Featured / Best Sellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>

          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#ECE7DC] rounded-lg">
            <h3 className="font-serif text-2xl text-[#153323] mb-2">No products match your criteria</h3>
            <p className="text-xs text-[#7A756B] mb-6">Try clearing or adjusting your concern and price filters.</p>
            <button
              onClick={() => {
                setSelectedConcernFilter(null);
                setCategoryFilter('all');
                setPriceMax(600);
              }}
              className="px-6 py-2.5 bg-[#153323] text-white text-xs uppercase tracking-wider rounded"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
