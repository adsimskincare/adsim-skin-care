import React from 'react';
import { useStore } from '../context/StoreContext';

interface AdsimLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'sticker';
}

export const AdsimLogo: React.FC<AdsimLogoProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'dark' 
}) => {
  const { settings } = useStore();
  const isLight = variant === 'light';

  // If custom uploaded logo sticker is configured
  if (settings.customLogoUrl) {
    const imgSize = size === 'sm' ? 'h-9 w-auto' : size === 'lg' ? 'h-14 w-auto' : 'h-11 w-auto';
    return (
      <div className={`flex items-center gap-2.5 select-none ${className}`}>
        <img 
          src={settings.customLogoUrl} 
          alt="ADSIM CARE Logo" 
          className={`${imgSize} object-contain rounded-full shadow-xs`}
        />
        <div className="flex flex-col text-left">
          <div className="flex items-baseline gap-1.5">
            <span 
              className={`font-serif tracking-[0.2em] font-semibold leading-tight ${
                size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-2xl'
              } ${isLight ? 'text-white' : 'text-[#153323]'}`}
            >
              ADSIM
            </span>
            <span 
              className={`font-serif tracking-[0.24em] font-medium leading-tight ${
                size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl'
              } ${isLight ? 'text-[#D4AF37]' : 'text-[#8A6D3B]'}`}
            >
              CARE
            </span>
          </div>
          <span 
            className={`uppercase font-sans tracking-[0.22em] font-medium leading-none mt-0.5 ${
              size === 'sm' ? 'text-[7.5px]' : size === 'lg' ? 'text-[10px]' : 'text-[8.5px]'
            } ${isLight ? 'text-[#E5D7B7]' : 'text-[#7A7467]'}`}
          >
            PREMIUM SKINCARE • SCIENCE-BACKED FORMULATIONS
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Golden Leaf & Droplet Emblem from Official Sticker */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg 
          viewBox="0 0 100 100" 
          className={size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-14 h-14' : 'w-11 h-11'}
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="adsimGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#C4A468" />
              <stop offset="100%" stopColor="#9E7D3B" />
            </linearGradient>
          </defs>

          {/* Circular outer floral/beaded ring */}
          <circle cx="50" cy="50" r="47" stroke="url(#adsimGold)" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.75" />
          <circle cx="50" cy="50" r="44" stroke="url(#adsimGold)" strokeWidth="0.8" opacity="0.9" />

          {/* Central fluid Botanical Leaf & Moisture Droplet Monogram */}
          <path 
            d="M38 32 C30 38 28 50 36 58 C42 64 52 64 58 56 C52 56 46 54 42 48 C38 42 38 36 38 32 Z" 
            fill="url(#adsimGold)" 
          />
          <path 
            d="M36 46 C42 48 48 50 54 53" 
            stroke="#FAF7F2" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
            opacity="0.9"
          />

          <path 
            d="M58 34 C58 34 70 48 70 56 C70 63 65 68 58 68 C51 68 46 63 46 56 C46 48 58 34 58 34 Z" 
            stroke="url(#adsimGold)" 
            strokeWidth="3.2" 
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path 
            d="M62 55 C62 58 60 61 57 62" 
            stroke="url(#adsimGold)" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
          />

          <path 
            d="M32 78 C38 74 44 76 50 78 C56 76 62 74 68 78" 
            stroke="url(#adsimGold)" 
            strokeWidth="1" 
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Official Typography */}
      <div className="flex flex-col text-left">
        <div className="flex items-baseline gap-1.5">
          <span 
            className={`font-serif tracking-[0.2em] font-semibold leading-tight ${
              size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-2xl'
            } ${isLight ? 'text-white' : 'text-[#153323]'}`}
          >
            ADSIM
          </span>
          <span 
            className={`font-serif tracking-[0.22em] font-medium leading-tight ${
              size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl'
            } ${isLight ? 'text-[#D4AF37]' : 'text-[#8A6D3B]'}`}
          >
            CARE
          </span>
        </div>
        <span 
          className={`uppercase font-sans tracking-[0.22em] font-medium leading-none mt-0.5 ${
            size === 'sm' ? 'text-[7.5px]' : size === 'lg' ? 'text-[10px]' : 'text-[8.5px]'
          } ${isLight ? 'text-[#E5D7B7]' : 'text-[#7A7467]'}`}
        >
          PREMIUM SKINCARE • SCIENCE-BACKED FORMULATIONS
        </span>
      </div>
    </div>
  );
};
