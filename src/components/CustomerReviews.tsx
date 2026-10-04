import React, { useState } from 'react';
import { INITIAL_REVIEWS } from '../data/initialData';
import { Star, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex(prev => (prev === 0 ? INITIAL_REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex(prev => (prev === INITIAL_REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-[#FAF7F2] py-16 lg:py-24 border-b border-[#ECE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] mb-2 block">
            REAL SKIN, REAL EXPERIENCES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#153323] font-normal tracking-tight mb-2">
            What Our Customers Say
          </h2>
          <p className="text-sm text-[#706B62] font-light">
            Genuine verified experiences from daily users across India.
          </p>
        </div>

        {/* 3 Review Cards Grid matching reference image layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {INITIAL_REVIEWS.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FFFFFF] border border-[#ECE7DC] rounded-lg p-6 sm:p-7 flex flex-col justify-between hover:border-[#D1C9BA] transition-all hover:shadow-xs"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#C4A468]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#4A4742] font-light italic leading-relaxed mb-6">
                  “{rev.review}”
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-4 border-t border-[#F5F2EB] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-[#153323]">{rev.customerName}</span>
                    <span title="Verified Purchase">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                    </span>
                  </div>
                  <span className="text-[11px] text-[#8C8578] block">Purchased {rev.purchasedProduct}</span>
                </div>
                <span className="text-[10px] text-[#A69F91]">{rev.reviewDate}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
