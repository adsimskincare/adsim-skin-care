import React from 'react';
import { ShieldCheck, Sparkles, Heart, FlaskConical, Check, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  const coreValues = [
    {
      num: '01',
      title: 'Purity',
      desc: 'Carefully selected ingredients chosen for safety, consistency and effective daily skincare.'
    },
    {
      num: '02',
      title: 'Science',
      desc: 'Thoughtfully formulated with clinically proven active ingredients that respect natural skin biology.'
    },
    {
      num: '03',
      title: 'Responsible Formulation',
      desc: 'Developed with strict quality controls, dermatological safety validation, and conscious ingredient selection.'
    },
    {
      num: '04',
      title: 'Care',
      desc: 'Created to support a variety of diverse Indian skin types across changing seasons and everyday routines.'
    }
  ];

  const labToShelfSteps = [
    {
      step: '01',
      title: 'Research',
      desc: 'Identify active ingredients and targeted skin needs for Indian climate conditions.'
    },
    {
      step: '02',
      title: 'Formulation',
      desc: 'Lab-scale formulation, texture optimization and stability testing across temperature extremes.'
    },
    {
      step: '03',
      title: 'Dermat Testing',
      desc: 'Clinical safety and efficacy validation to ensure skin tolerance on sensitive barriers.'
    },
    {
      step: '04',
      title: 'Manufacturing',
      desc: 'GMP-certified production at scale with pure DM water and pharmaceutical-grade blending.'
    },
    {
      step: '05',
      title: 'Quality Check',
      desc: 'Strict batch testing for pH, viscosity, and microbial purity before dispatch from Delhi.'
    }
  ];

  const comparison = [
    {
      criteria: 'Ingredient Transparency',
      adsim: 'Transparent, full INCI ingredient declarations on every single product',
      mass: 'May highlight only selected marketing ingredients, concealing bases'
    },
    {
      criteria: 'Product Philosophy',
      adsim: 'Thoughtful, quality-focused formulations engineered around biological skin concerns',
      mass: 'Often trend-driven, copying short-lived viral fads without stability validation'
    },
    {
      criteria: 'Packaging & Comfort',
      adsim: 'Premium, functional pump and jar packaging designed for convenient everyday use',
      mass: 'Standard functional packaging prone to leakage or oxidization'
    },
    {
      criteria: 'Pricing Strategy',
      adsim: 'Premium, accessible direct pricing for honest Indian skincare households',
      mass: 'Extravagant luxury markups or cheap mass compromises'
    },
    {
      criteria: 'Customer Experience',
      adsim: 'Customer-first approach with direct consultation and genuine review verification',
      mass: 'Broad mass-market positioning with disconnected customer care'
    }
  ];

  const leadership = [
    {
      initials: 'JJ',
      name: 'Mr. Jay Shankar Jha',
      role: 'Proprietor, CEO ADSIM CARE',
      bio: 'The original idea, funding, and overall management of ADSIM SKIN CARE — driving company vision, brand strategy, and day-to-day leadership.'
    },
    {
      initials: 'HC',
      name: 'Mr. Harsh Chaudhary',
      role: 'Proprietor, ADSIM CARE',
      bio: 'Supports in building and scaling ADSIM SKIN CARE through operations, retail distribution partnerships, and business development.'
    }
  ];

  const roadmap = [
    {
      year: '2026',
      title: 'Expand Core Range',
      desc: 'Launch broad-spectrum sunscreens & concentrated serums alongside existing 4 face washes and yogurt moisturizer.'
    },
    {
      year: '2027',
      title: 'Pan-India Retail Push',
      desc: 'Scale to 1,500+ retail pharmacy and beauty chain touchpoints across Tier 1–3 cities.'
    },
    {
      year: '2028',
      title: 'Export Markets',
      desc: 'Enter Middle East & Southeast Asian skincare markets with targeted climate formulations.'
    },
    {
      year: '2029',
      title: 'R&D Innovation Lab',
      desc: 'Establish an in-house dermatological research center for proprietary next-gen personal care formulations.'
    }
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero Brand Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] block">
              CORPORATE & BRAND OVERVIEW • 2026
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#153323] font-normal tracking-tight leading-[1.14]">
              Premium Skincare, Crafted with Care.
            </h1>
            <p className="text-base text-[#5A554C] font-light leading-relaxed">
              ADSIM CARE is an Indian skincare brand developing thoughtfully formulated skincare for modern lifestyles. Headquartered in New Delhi, India, with a vision to serve customers through retail and digital channels.
            </p>
            <p className="text-sm text-[#706B62] font-light leading-relaxed">
              We bridge science-backed actives with comfortable everyday rituals. Every formulation is tested and approved by dermatologists to ensure long-term barrier health.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentPage('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 bg-[#153323] text-white text-xs uppercase tracking-[0.2em] font-medium rounded hover:bg-[#1E422F] transition-all flex items-center gap-2"
              >
                <span>EXPLORE OUR PRODUCTS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-lg overflow-hidden border border-[#E5DFD3] shadow-md bg-[#EDE7DA] aspect-[4/3]">
              <img
                src="/src/assets/images/brand_story_botanical_jars_1791141864816.jpg"
                alt="ADSIM CARE Laboratory & botanical formulations"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision (Page 3 of brochure) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#153323] text-white p-8 sm:p-10 rounded-lg shadow-sm space-y-4">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#C4A468] font-semibold block">
              PURPOSE
            </span>
            <h2 className="font-serif text-3xl text-[#FAF7F2]">Our Mission</h2>
            <p className="text-sm sm:text-base text-[#C2BDB2] font-light leading-relaxed">
              To make dermatologically safe, premium skincare accessible to every household — formulated with clean, traceable ingredients and backed by science.
            </p>
          </div>

          <div className="bg-[#153323] text-white p-8 sm:p-10 rounded-lg shadow-sm space-y-4">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#C4A468] font-semibold block">
              ASPIRATION
            </span>
            <h2 className="font-serif text-3xl text-[#FAF7F2]">Our Vision</h2>
            <p className="text-sm sm:text-base text-[#C2BDB2] font-light leading-relaxed">
              To become India's most trusted homegrown skincare brand, recognised globally for purity, innovation and sustainable beauty.
            </p>
          </div>
        </div>

        {/* Core Values (Page 4 of brochure) */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] mb-2 block">
              WHAT GUIDES US
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#153323] font-normal tracking-tight mb-2">
              Core Values
            </h2>
            <p className="text-sm text-[#706B62] font-light">
              The principles behind every formulation we create.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((v) => (
              <div key={v.num} className="bg-white border border-[#ECE7DC] p-6 rounded-lg shadow-xs hover:border-[#153323] transition-all">
                <div className="w-10 h-10 rounded-full border border-[#D9D3C5] flex items-center justify-center font-serif text-lg font-medium text-[#153323] mb-4 bg-[#FAF7F2]">
                  {v.num}
                </div>
                <h3 className="font-serif text-xl text-[#153323] mb-2 font-medium">{v.title}</h3>
                <p className="text-xs text-[#635E55] leading-relaxed font-light">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Formulation Process: From Lab to Shelf (Page 18 of brochure) */}
        <div className="bg-[#F5F1E8] border border-[#ECE7DC] p-8 sm:p-12 rounded-lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] mb-2 block">
              FORMULATION PROCESS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#153323] font-normal tracking-tight mb-2">
              From Lab to Shelf
            </h2>
            <p className="text-sm text-[#706B62] font-light">
              Our quality-driven formulation pipeline guarantees batch consistency and clinical safety.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {labToShelfSteps.map((step) => (
              <div key={step.step} className="bg-[#FAF7F2] p-5 rounded border border-[#E0D9CC] flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-full bg-[#153323] text-white flex items-center justify-center font-mono text-xs font-semibold mb-3">
                    {step.step}
                  </div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#153323] mb-1">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-[#635E55] leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table: ADSIM CARE vs Mass Brands (Page 21 of brochure) */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] mb-2 block">
              THE COMPARISON
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#153323] font-normal tracking-tight mb-2">
              Why Choose ADSIM CARE
            </h2>
            <p className="text-sm text-[#706B62] font-light">
              Thoughtfully formulated. Transparently presented. Built for everyday skincare.
            </p>
          </div>

          <div className="overflow-x-auto bg-white border border-[#ECE7DC] rounded-lg shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] border-b border-[#ECE7DC] text-[#153323] uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4 sm:p-5 font-semibold">Criteria</th>
                  <th className="p-4 sm:p-5 font-semibold text-[#153323] bg-[#F3EDE2]">ADSIM CARE</th>
                  <th className="p-4 sm:p-5 font-semibold text-[#8C8578]">Typical Mass Brands</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F2EB] text-[#5A554C]">
                {comparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FCFAF7]">
                    <td className="p-4 sm:p-5 font-semibold text-[#153323]">{row.criteria}</td>
                    <td className="p-4 sm:p-5 bg-[#FAF7F2]/50 font-medium text-[#153323]">
                      <div className="flex items-start gap-1.5">
                        <Check className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                        <span>{row.adsim}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-[#7A756B]">{row.mass}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Leadership (Page 23 of brochure) */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] mb-2 block">
              LEADERSHIP
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#153323] font-normal tracking-tight mb-2">
              Meet the Founders
            </h2>
            <p className="text-sm text-[#706B62] font-light">
              The leadership driving ADSIM SKIN CARE forward across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leadership.map((leader, i) => (
              <div key={i} className="bg-white border border-[#ECE7DC] p-8 rounded-lg shadow-xs flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#EFE9DD] border border-[#C4A468] text-[#153323] font-serif text-2xl font-semibold flex items-center justify-center mb-4">
                  {leader.initials}
                </div>
                <h3 className="font-serif text-2xl text-[#153323] font-medium">{leader.name}</h3>
                <span className="text-xs uppercase tracking-wider text-[#C4A468] font-semibold mt-0.5 mb-3">
                  {leader.role}
                </span>
                <p className="text-xs text-[#635E55] leading-relaxed font-light">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Future Roadmap (Page 22 of brochure) */}
        <div className="border-t border-[#ECE7DC] pt-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] mb-2 block">
              LOOKING AHEAD
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#153323] font-normal tracking-tight mb-2">
              Future Roadmap
            </h2>
            <p className="text-sm text-[#706B62] font-light">
              Where ADSIM CARE is headed next.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmap.map((rm) => (
              <div key={rm.year} className="bg-white border-t-2 border-t-[#153323] border border-[#ECE7DC] p-6 rounded shadow-xs">
                <span className="font-serif text-3xl font-semibold text-[#153323] block mb-2">
                  {rm.year}
                </span>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2C2C2A] mb-2">
                  {rm.title}
                </h4>
                <p className="text-xs text-[#706B62] leading-relaxed font-light">
                  {rm.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
