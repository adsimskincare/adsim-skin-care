import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, X, ArrowRight } from 'lucide-react';

export const QuickSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, setSelectedProductDetail } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return products.filter(p => 
      p.isPublished && (
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.skinConcernLabel.toLowerCase().includes(term) ||
        p.keyIngredients.some(ing => ing.toLowerCase().includes(term)) ||
        p.shortDescription.toLowerCase().includes(term)
      )
    );
  }, [searchTerm, products]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs p-4 pt-20">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-lg border border-[#D9D3C5] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#ECE7DC] bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8C8578]" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by concern, product name, or ingredient (e.g. Acne, Salicylic, Glowvera)..."
            className="w-full text-sm bg-transparent border-none focus:outline-hidden text-[#2C2C2A] placeholder:text-[#999285]"
          />
          <button
            onClick={() => {
              setSearchTerm('');
              setIsSearchOpen(false);
            }}
            className="p-1 rounded-full hover:bg-[#F2ECE1] text-[#4A4742]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular searches suggestions */}
        {!searchTerm && (
          <div className="p-6">
            <span className="text-[10px] uppercase tracking-wider text-[#8C8578] font-semibold block mb-3">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {['Acnova', 'Glowvera', 'Salicylic Acid', 'Tan Removal', 'Oil Control', 'Hyaluronic Acid', 'Yogurt Cream'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="px-3 py-1.5 text-xs bg-white border border-[#DFD8CC] rounded hover:border-[#153323] hover:text-[#153323] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results list */}
        {searchTerm && (
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
            {searchResults.length === 0 ? (
              <div className="text-center py-10 text-xs text-[#7A756B]">
                No matching ADSIM CARE products found for "{searchTerm}".
              </div>
            ) : (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setSelectedProductDetail(product);
                    setIsSearchOpen(false);
                  }}
                  className="flex items-center justify-between p-3 bg-white rounded border border-[#ECE7DC] hover:border-[#153323] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-14 object-contain bg-[#FAF7F2] rounded p-1"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-[10px] uppercase text-[#8C8578] tracking-wider block">
                        {product.category}
                      </span>
                      <h4 className="font-serif text-base font-semibold text-[#153323] group-hover:text-[#1E422F]">
                        {product.name}
                      </h4>
                      <span className="text-xs text-[#6E685F]">{product.skinConcernLabel}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-serif text-sm font-semibold text-[#2C2C2A] tabular-nums">
                      ₹{product.price}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#8C8578] group-hover:translate-x-1 group-hover:text-[#153323] transition-all" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
