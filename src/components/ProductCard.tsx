import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Eye, Star, RotateCw } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProductDetail
  } = useStore();

  const isFavorited = isInWishlist(product.id);
  const [showBackSide, setShowBackSide] = useState(false);

  const currentImage = showBackSide && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div className="group relative flex flex-col bg-white rounded-lg border border-[#E8E2D5] hover:border-[#C4A468] transition-all duration-300 hover:shadow-md overflow-hidden">
      
      {/* Top Image Stage with Front/Back Toggle */}
      <div 
        onClick={() => setSelectedProductDetail(product)}
        className="relative aspect-[3/4] bg-[#FAF8F5] overflow-hidden cursor-pointer flex items-center justify-center p-3 select-none"
      >
        <img
          src={currentImage}
          alt={`${product.name} - ${showBackSide ? 'Back Label' : 'Front View'}`}
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#2C2C2A] flex items-center justify-center shadow-xs transition-colors z-10"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'fill-[#B85D5D] text-[#B85D5D]' : 'text-[#5C564C]'
            }`}
          />
        </button>

        {/* Front / Back Toggle Pill (User requested both sides) */}
        {product.images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowBackSide(!showBackSide);
            }}
            title="Flip to see bottle back label & ingredients"
            className="absolute bottom-3 left-3 z-10 flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-[#153323] bg-white/90 hover:bg-white px-2.5 py-1 border border-[#D9D3C5] rounded shadow-xs transition-all"
          >
            <RotateCw className="w-3 h-3 text-[#153323]" />
            <span>{showBackSide ? 'Front View' : 'Back Label'}</span>
          </button>
        )}

        {/* Best seller or new arrival tag */}
        {product.isBestSeller && !showBackSide && (
          <div className="absolute top-3 left-3 text-[10px] tracking-wider uppercase font-semibold text-[#153323] bg-white/90 px-2 py-0.5 border border-[#E5DFD3] rounded">
            Best Seller
          </div>
        )}

        {/* Quick View Hover overlay */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProductDetail(product);
            }}
            className="py-1.5 px-3 bg-[#153323] text-white hover:bg-[#1E422F] text-[10px] tracking-wider uppercase font-semibold rounded shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between text-left">
        <div>
          {/* Category & Volume */}
          <div className="flex items-center justify-between text-[11px] text-[#8C8578] uppercase tracking-wider mb-1">
            <span>{product.category}</span>
            <span>{product.size}</span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => setSelectedProductDetail(product)}
            className="font-serif text-lg font-semibold text-[#153323] hover:text-[#1E422F] cursor-pointer transition-colors leading-snug mb-1"
          >
            {product.name}
          </h3>

          {/* Short benefit */}
          <p className="text-[12px] text-[#6E685F] line-clamp-2 leading-relaxed mb-3 font-light">
            {product.shortDescription}
          </p>
        </div>

        <div>
          {/* Price & Rating */}
          <div className="flex items-center justify-between pt-2.5 border-t border-[#F5F2EB] mb-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-lg font-medium text-[#2C2C2A] tabular-nums">
                ₹{product.price}
              </span>
              {product.salePrice && product.salePrice > product.price && (
                <span className="text-xs text-[#999285] line-through font-serif tabular-nums">
                  ₹{product.salePrice}
                </span>
              )}
            </div>

            {product.rating > 0 && (
              <div className="flex items-center gap-1 text-[11px] text-[#6E685F]">
                <Star className="w-3 h-3 fill-[#C4A468] text-[#C4A468]" />
                <span className="font-medium text-[#2C2C2A] tabular-nums">{product.rating}</span>
                <span className="text-[#999388]">({product.reviewCount})</span>
              </div>
            )}
          </div>

          {/* Add to Cart button matching theme style */}
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full py-2.5 px-4 bg-black hover:bg-[#153323] text-white text-[11px] tracking-[0.16em] uppercase font-medium rounded transition-all flex items-center justify-center gap-2 shadow-xs active:scale-[0.99]"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Shop Now</span>
          </button>
        </div>

      </div>
    </div>
  );
};
