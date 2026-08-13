import React from 'react';
import { FacilityItem, PageType } from '../types';
import { Modal } from './Modal';
import { CheckCircle2, Building2, ShieldCheck, PhoneCall, Sparkles, MapPin } from 'lucide-react';

interface FacilityDetailModalProps {
  facility: FacilityItem | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: PageType) => void;
}

export const FacilityDetailModal: React.FC<FacilityDetailModalProps> = ({
  facility,
  isOpen,
  onClose,
  onNavigate
}) => {
  if (!facility) return null;

  const hasImage = Boolean(facility.imageUrl);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={facility.name}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Facility Main Banner Image */}
        <div className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden border border-slate-200 shadow-xs group bg-emerald-50">
          {hasImage ? (
            <img
              src={facility.imageUrl}
              alt={facility.name}
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                // Hide broken image and fall back to icon placeholder instead of an invalid src
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}

          {/* Icon placeholder — shown when there's no image, or the image fails to load */}
          <div className={`w-full h-full flex items-center justify-center ${hasImage ? 'hidden' : ''}`}>
            <Building2 className="w-12 h-12 text-emerald-300" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

          {/* Badges on Banner */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className="bg-[#0B6E31] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              {facility.category}
            </span>
            {facility.highlight && (
              <span className="bg-amber-400 text-slate-950 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {facility.highlight}
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h2 className="text-xl sm:text-2xl font-serif font-bold drop-shadow-md">
              {facility.name}
            </h2>
            <p className="text-xs text-emerald-100 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              Main Campus Block • Govt Girls Degree College Nawabshah
            </p>
          </div>
        </div>

        {/* Short 1-2 Line Overview */}
        <div className="bg-emerald-50/70 border-l-4 border-[#0B6E31] p-4 rounded-r-xl">
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            {facility.description}
          </p>
        </div>

        {/* Feature Highlights Bullet List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0B6E31]" />
              Key Features & Infrastructure Highlights
            </h3>
            <span className="text-[11px] text-slate-500 font-semibold">Verified Facility</span>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-1 gap-2.5">
            {(facility.features && facility.features.length > 0 ? facility.features : [
              "Dedicated modern space equipped according to Sindh Government Higher Education standards.",
              "Maintained with regular maintenance and safety protocols.",
              "Accessible to all enrolled students and faculty members during college working hours."
            ]).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 hover:border-emerald-300 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-[#0B6E31] shrink-0 mt-0.5" />
                <span className="leading-normal font-medium">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-500">
            For operational timings or queries, visit the campus admin office.
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onNavigate && (
              <button
                onClick={() => {
                  onClose();
                  onNavigate('contact');
                }}
                className="flex-1 sm:flex-none bg-[#0B6E31] hover:bg-[#085224] text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Inquire Office
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
