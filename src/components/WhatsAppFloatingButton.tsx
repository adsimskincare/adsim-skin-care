import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const { settings, setIsSkinMatchOpen } = useStore();
  const [showTooltip, setShowTooltip] = useState(true);

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      'Hi ADSIM CARE, I need help finding the right skincare product for my skin concern.'
    );
    window.open(`https://wa.me/${settings.whatsAppNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="mb-3 max-w-[240px] bg-white border border-[#D9D3C5] p-3 rounded-lg shadow-xl relative animate-in fade-in slide-in-from-bottom-2 text-xs">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1 right-1 text-[#8C8578] hover:text-[#2C2C2A] p-0.5"
            aria-label="Dismiss help bubble"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="font-semibold text-[#153323] text-[11px] uppercase tracking-wider mb-1">
            Need Help Choosing?
          </div>
          <p className="text-[#635E55] leading-snug mb-2 font-light text-[11px]">
            Chat directly with our skincare team or try our quick routine match!
          </p>
          <div className="flex gap-1.5">
            <button
              onClick={handleOpenWhatsApp}
              className="px-2.5 py-1 bg-[#25D366] text-white rounded text-[10px] uppercase tracking-wider font-semibold"
            >
              Chat on WhatsApp
            </button>
            <button
              onClick={() => setIsSkinMatchOpen(true)}
              className="px-2 py-1 border border-[#D9D3C5] text-[#153323] rounded text-[10px] uppercase tracking-wider"
            >
              Routine Match
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={handleOpenWhatsApp}
        aria-label="Chat with ADSIM CARE on WhatsApp"
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group relative"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="sr-only">Chat with ADSIM CARE</span>
      </button>
    </div>
  );
};
