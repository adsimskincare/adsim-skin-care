import React, { useState } from 'react';
import { ARTICLES } from '../data/initialData';
import { Article } from '../types';
import { Clock, Calendar, ArrowRight, X } from 'lucide-react';

export const JournalPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    'all',
    'Skincare Routine',
    'Oily Skin',
    'Acne Care',
    'Hydration'
  ];

  const filteredArticles = activeCategory === 'all'
    ? ARTICLES
    : ARTICLES.filter(a => a.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-[#ECE7DC] pb-8 mb-10">
          <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] mb-1.5 block">
            SKINCARE EDUCATION & JOURNAL
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#153323] font-normal tracking-tight mb-2">
            From the ADSIM CARE Journal
          </h1>
          <p className="text-sm text-[#706B62] font-light max-w-xl">
            Evidence-grounded guides, ingredient science, and routine advice formulated to demystify everyday facial skincare.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs rounded transition-all capitalize ${
                activeCategory === cat
                  ? 'bg-[#153323] text-white font-medium shadow-xs'
                  : 'bg-white text-[#5A554C] border border-[#ECE7DC] hover:border-[#153323]'
              }`}
            >
              {cat === 'all' ? 'All Articles' : cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white border border-[#E5DFD3] rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer group"
            >
              <div>
                <div className="aspect-[16/9] bg-[#EDE7DA] overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs px-2.5 py-0.5 rounded text-[10px] uppercase font-semibold text-[#153323] tracking-wider">
                    {article.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-[#8C8578] mb-2 font-light">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl text-[#153323] group-hover:text-[#1E422F] transition-colors leading-snug mb-3">
                    {article.title}
                  </h2>

                  <p className="text-xs text-[#635E55] leading-relaxed font-light line-clamp-3">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-[#F5F2EB] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#153323]">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>

        {/* Article Reader Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
            <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-lg border border-[#D9D3C5] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
              
              <div className="p-4 border-b border-[#ECE7DC] bg-white flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#8C8578] font-semibold">
                  ADSIM CARE Journal • {selectedArticle.category}
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1 rounded-full hover:bg-[#F2ECE1] text-[#4A4742]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl text-[#153323] mb-3 leading-tight">
                    {selectedArticle.title}
                  </h1>
                  <div className="flex items-center gap-3 text-xs text-[#8C8578]">
                    <span>{selectedArticle.date}</span>
                    <span>·</span>
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden border border-[#E5DFD3] aspect-[16/8]">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-4 text-sm text-[#4A4742] font-light leading-relaxed">
                  {selectedArticle.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-6 border-t border-[#ECE7DC] text-center">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-6 py-2.5 bg-[#153323] text-white text-xs uppercase tracking-wider rounded font-medium"
                  >
                    Back to Articles
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
