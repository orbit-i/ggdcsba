import React, { useState } from 'react';
import { useSiteData } from '../../context/DataContext';
import { FacilityItem, PageType } from '../../types';
import { FacilityDetailModal } from '../FacilityDetailModal';
import { Building2, Search, CheckCircle2, ShieldCheck, Sun, ArrowRight, Sparkles } from 'lucide-react';

interface FacilitiesPageProps {
  onNavigate?: (page: PageType) => void;
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({ onNavigate }) => {
  const { facilities } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);

  const categories = ['All', 'Academic', 'Infrastructure', 'Technology', 'Sports & Culture', 'Security & Amenities'];

  const filteredFacilities = (facilities || []).filter(fac => {
    const matchesCategory = selectedCategory === 'All' || fac.category === selectedCategory;
    const matchesSearch = fac.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          fac.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Page Title */}
      <div className="bg-emerald-900 text-white p-8 rounded-2xl shadow-md border-b-4 border-amber-400">
        <span className="bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
          Campus Infrastructure
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif mt-2 text-white">
          Facilities Offered at Govt Girls Degree College Nawabshah
        </h1>
        <p className="text-sm text-emerald-200 mt-1 max-w-3xl">
          Comprehensive modern infrastructure designed to support academic excellence, scientific experimentation, and holistic student well-being. Click any card to explore full features and high-res photos.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search facility..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-emerald-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFacilities.map((fac) => (
          <div 
            key={fac.id}
            onClick={() => setSelectedFacility(fac)}
            className="bg-white rounded-2xl border border-emerald-100 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-emerald-300 overflow-hidden cursor-pointer"
          >
            {/* Card Image Thumbnail Header */}
            {fac.imageUrl && (
              <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                <img
                  src={fac.imageUrl}
                  alt={fac.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                <span className="absolute top-3 right-3 bg-[#0B6E31] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase shadow-2xs">
                  {fac.category}
                </span>
                {fac.highlight && (
                  <span className="absolute bottom-3 left-3 bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {fac.highlight}
                  </span>
                )}
              </div>
            )}

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                {!fac.imageUrl && (
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold group-hover:bg-[#0B6E31] group-hover:text-amber-300 transition-colors">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded border border-emerald-200 uppercase">
                      {fac.category}
                    </span>
                  </div>
                )}

                <h3 className="text-lg font-bold font-serif text-slate-900 group-hover:text-[#0B6E31] transition-colors">
                  {fac.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {fac.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-3 text-xs font-bold text-[#0B6E31]">
                <span className="text-[11px] font-semibold text-emerald-800">
                  {fac.features?.length || 0} Key Highlights
                </span>
                <span className="flex items-center gap-1 bg-emerald-50 group-hover:bg-[#0B6E31] group-hover:text-white px-3 py-1 rounded-lg transition-all text-xs font-bold">
                  View Features
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Highlight Box for Key Campus Amenities */}
      <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2 border-b md:border-b-0 md:border-r border-emerald-800 pb-4 md:pb-0 md:pr-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
            <Sun className="w-4 h-4" />
            Green Energy Campus
          </div>
          <h4 className="font-bold text-base text-white font-serif">100% Solar Power System</h4>
          <p className="text-xs text-emerald-200 leading-relaxed">
            Off-grid solar installation guarantees continuous electricity for science experiments, computer labs, and digital library sessions.
          </p>
        </div>

        <div className="space-y-2 border-b md:border-b-0 md:border-r border-emerald-800 pb-4 md:pb-0 md:pr-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
            <Building2 className="w-4 h-4" />
            500 Capacity Auditorium
          </div>
          <h4 className="font-bold text-base text-white font-serif">Central Cultural Hall</h4>
          <p className="text-xs text-emerald-200 leading-relaxed">
            Spacious air-conditioned auditorium hosting provincial debates, convocations, science exhibitions, and inter-college competitions.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
            <ShieldCheck className="w-4 h-4" />
            Student Protection
          </div>
          <h4 className="font-bold text-base text-white font-serif">24/7 Security & CCTV</h4>
          <p className="text-xs text-emerald-200 leading-relaxed">
            Full boundary wall perimeter, trained female & male security staff at all gates, and comprehensive HD CCTV surveillance.
          </p>
        </div>
      </div>

      {/* Facility Detail Interactive Modal */}
      <FacilityDetailModal
        facility={selectedFacility}
        isOpen={!!selectedFacility}
        onClose={() => setSelectedFacility(null)}
        onNavigate={onNavigate}
      />

    </div>
  );
};

