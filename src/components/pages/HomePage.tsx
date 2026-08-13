import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Receipt, 
  Users, 
  Building2, 
  Bell, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  ExternalLink,
  Laptop,
  Trophy,
  Sun,
  Tv,
  Wifi,
  Wind,
  FlaskConical,
  UserCheck,
  HeartPulse,
  Utensils,
  Trees,
  Award,
  ChevronRight,
  Info
} from 'lucide-react';
import { useSiteData } from '../../context/DataContext';
import { PageType, FacilityItem } from '../../types';
import { FacilityDetailModal } from '../FacilityDetailModal';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { collegeInfo, announcements, facilities, programs, usefulLinks } = useSiteData();
  const [selectedNotice, setSelectedNotice] = useState<any | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);

  // Map icon strings to Lucide components safely
  const renderFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-[#0B6E31] group-hover:text-amber-300 transition-colors" />;
      case 'Laptop': return <Laptop className="w-5 h-5 text-[#0B6E31] group-hover:text-amber-300 transition-colors" />;
      case 'Users': return <Users className="w-5 h-5 text-[#0B6E31] group-hover:text-amber-300 transition-colors" />;
      case 'Tv': return <Tv className="w-5 h-5 text-[#0B6E31] group-hover:text-amber-300 transition-colors" />;
      case 'Wifi': return <Wifi className="w-5 h-5 text-[#0B6E31] group-hover:text-amber-300 transition-colors" />;
      case 'Wind': return <Wind className="w-5 h-5 text-[#0B6E31] group-hover:text-amber-300 transition-colors" />;
      case 'Sun': return <Sun className="w-5 h-5 text-[#0B6E31] group-hover:text-amber-300 transition-colors" />;
      case 'FlaskConical': return <FlaskConical className="w-5 h-5 text-[#0B6E31] group-hover:text-amber-300 transition-colors" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-[#0B6E31] group-hover:text-amber-300 transition-colors" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-[#0B6E31] group-hover:text-amber-300 transition-colors" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-[#0B6E31] group-hover:text-amber-300 transition-colors" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-[#0B6E31] group-hover:text-amber-300 transition-colors" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-[#0B6E31] group-hover:text-amber-300 transition-colors" />;
      case 'Trees': return <Trees className="w-5 h-5 text-[#0B6E31] group-hover:text-amber-300 transition-colors" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#0B6E31] group-hover:text-amber-300 transition-colors" />;
      default: return <Building2 className="w-5 h-5 text-[#0B6E31] group-hover:text-amber-300 transition-colors" />;
    }
  };

  return (
    <div className="bg-[#F8FAF9] min-h-screen pb-16 space-y-12">
      
      {/* 1. Hero Banner */}
      <section className="bg-gradient-to-b from-[#0B6E31] to-[#075324] text-white py-12 sm:py-16 px-4 sm:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 bg-emerald-900/80 border border-emerald-500/30 text-amber-300 font-bold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              Government of Sindh • Est. 1966
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif leading-tight text-white drop-shadow-2xs">
              Empowering Women Through Excellence in Education
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed">
              Government Girls Degree College Nawabshah offers accredited Intermediate (HSC) and Undergraduate degree programs in a safe, state-of-the-art academic environment.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('academics')}
                className="bg-white text-[#0B6E31] hover:bg-emerald-50 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-[#0B6E31]" />
                <span>Academic Programs</span>
              </button>
              <button
                onClick={() => onNavigate('fee-structure')}
                className="bg-emerald-800/60 hover:bg-emerald-800 border border-white/20 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-all flex items-center gap-2"
              >
                <Receipt className="w-4 h-4" />
                <span>Fee Structure</span>
              </button>
              <button
                onClick={() => onNavigate('downloads')}
                className="bg-emerald-800/60 hover:bg-emerald-800 border border-white/20 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Admission Forms</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl bg-emerald-900 group">
              <img
                src={collegeInfo.heroCampusUrl}
                alt="Government Girls Degree College Nawabshah Campus"
                className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 bg-[#075324] text-xs text-center font-semibold text-emerald-100 flex items-center justify-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>Main Campus • District Shaheed Benazirabad, Sindh</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Regional Director's Message */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Regional Director Image & Badge */}
          <div className="md:col-span-4 flex flex-col items-center text-center space-y-3 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
            <div className="w-40 h-48 rounded-xl overflow-hidden border-2 border-[#0B6E31] shadow-2xs bg-slate-100 flex items-center justify-center">
              {collegeInfo.regionalDirectorPhotoUrl ? (
                <img
                  src={collegeInfo.regionalDirectorPhotoUrl}
                  alt={collegeInfo.regionalDirectorName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Users className="w-16 h-16 text-slate-300" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-serif">
                {collegeInfo.regionalDirectorName}
              </h3>
              <p className="text-xs font-semibold text-[#0B6E31] uppercase tracking-wide mt-0.5">
                {collegeInfo.regionalDirectorTitle}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                College Education Department, Government of Sindh
              </p>
            </div>
          </div>

          {/* Regional Director Message Content */}
          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0B6E31] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100">
              <Award className="w-4 h-4 text-[#0B6E31]" />
              <span>Regional Director's Message</span>
            </div>

            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              {collegeInfo.regionalDirectorMessage}
            </p>
          </div>
        </div>
      </section>

      {/* 2b. Principal's Message & Leadership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Principal Image & Badge */}
          <div className="md:col-span-4 flex flex-col items-center text-center space-y-3 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
            <div className="w-40 h-48 rounded-xl overflow-hidden border-2 border-[#0B6E31] shadow-2xs bg-slate-100">
              <img
                src={collegeInfo.principalPhotoUrl || collegeInfo.heroCampusUrl}
                alt={collegeInfo.principalName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-serif">
                {collegeInfo.principalName}
              </h3>
              <p className="text-xs font-semibold text-[#0B6E31] uppercase tracking-wide mt-0.5">
                {collegeInfo.principalTitle}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Govt Girls Degree College Nawabshah
              </p>
            </div>
          </div>

          {/* Principal Message Content */}
          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0B6E31] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100">
              <Award className="w-4 h-4 text-[#0B6E31]" />
              <span>Principal's Message</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif leading-snug">
              "{collegeInfo.principalQuote || 'Empowering Female Scholars Through Quality Academic Rigor'}"
            </h2>

            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              {collegeInfo.principalMessage}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-600 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0B6E31]" />
                BISE Shaheed Benazirabad Affiliated
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0B6E31]" />
                BS 4-Year Degree Programs
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0B6E31]" />
                Sindh Govt SECCAP Portal
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Facilities at College (Interactive Modal Cards Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B6E31]">
              Campus Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              College Facilities & Infrastructure
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Click any facility card below to view full details, high-res photos, and bulleted features.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('facilities')}
            className="text-xs font-bold text-[#0B6E31] hover:underline flex items-center gap-1 shrink-0 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
          >
            <span>Explore All Facilities</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5 Featured Facilities Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {(facilities || []).slice(0, 5).map((fac: FacilityItem) => (
            <div 
              key={fac.id}
              onClick={() => setSelectedFacility(fac)}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:border-[#0B6E31] hover:shadow-md transition-all flex flex-col justify-between space-y-3 cursor-pointer group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-emerald-50 rounded-xl group-hover:bg-[#0B6E31] transition-colors">
                    {renderFacilityIcon(fac.iconName)}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {fac.category}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#0B6E31] transition-colors">
                  {fac.name}
                </h3>
                <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                  {fac.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[#0B6E31]">
                <span className="truncate max-w-[120px]">{fac.highlight || "Features list"}</span>
                <span className="text-[10px] bg-emerald-50 px-2 py-0.5 rounded text-[#0B6E31] group-hover:bg-[#0B6E31] group-hover:text-white transition-all font-bold shrink-0">
                  Details →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Facilities Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => onNavigate('facilities')}
            className="bg-[#0B6E31] hover:bg-[#085224] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-2xs transition-all flex items-center gap-2"
          >
            <span>View All Campus Facilities ({(facilities || []).length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. Latest News, Notifications & Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Latest Announcements (8 Columns) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B6E31]">
                Official Notices
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                Latest Circulars & Announcements
              </h2>
            </div>
            <button
              onClick={() => onNavigate('notifications')}
              className="text-xs font-bold text-[#0B6E31] hover:underline flex items-center gap-1"
            >
              <span>View All Notices</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {(announcements || []).slice(0, 4).map((ann) => (
              <div 
                key={ann.id}
                onClick={() => setSelectedNotice(ann)}
                className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs hover:border-[#0B6E31] hover:shadow-xs transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-100 text-[#0B6E31] text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase">
                      {ann.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {ann.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#0B6E31] transition-colors">
                    {ann.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-1">
                    {ann.summary}
                  </p>
                </div>

                <div className="shrink-0 text-xs font-bold text-[#0B6E31] flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg group-hover:bg-[#0B6E31] group-hover:text-white transition-all">
                  <span>Read Notice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Links & Official Portals (4 Columns) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B6E31]">
              Government Portals
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
              Useful External Links
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-4 divide-y divide-slate-100">
            {usefulLinks && usefulLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 hover:text-[#0B6E31] transition-colors group"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#0B6E31]">
                    {link.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">
                    {link.category}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0B6E31] shrink-0" />
              </a>
            ))}
          </div>

          {/* Quick Helpline Box */}
          <div className="bg-[#0B6E31] text-white rounded-xl p-5 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-amber-300" />
              <h3 className="font-bold text-sm">College Contact Helplines</h3>
            </div>
            <p className="text-xs text-emerald-100">
              For admissions, fee inquiries, or transcript verification:
            </p>
            <div className="space-y-1 font-mono text-xs font-bold bg-emerald-900/60 p-2.5 rounded-lg border border-white/10">
              <p>Primary: 0244-9470174</p>
              <p>Secondary: 0244-9470173</p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full bg-white text-[#0B6E31] font-bold text-xs py-2 rounded-lg shadow-2xs hover:bg-emerald-50 transition-all text-center mt-2"
            >
              Contact Office
            </button>
          </div>
        </div>
      </section>

      {/* 5. Academic Degree Programs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B6E31]">
              Academics & Degrees
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              Offered Academic Programs
            </h2>
          </div>
          <button 
            onClick={() => onNavigate('fee-structure')}
            className="text-xs font-bold text-[#0B6E31] hover:underline flex items-center gap-1 shrink-0 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
          >
            <span>View Fee Structure</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(programs || []).slice(0, 6).map((prog) => (
            <div 
              key={prog.id}
              className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs hover:border-[#0B6E31] transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="bg-emerald-50 text-[#0B6E31] text-[10px] font-bold px-2.5 py-0.5 rounded border border-emerald-100 uppercase">
                  {prog.level}
                </span>
                <h3 className="font-bold text-slate-900 text-base font-serif">
                  {prog.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {prog.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-700 space-y-1">
                <p><strong>Duration:</strong> {prog.duration}</p>
                <p><strong>Seats Quota:</strong> {prog.seats} Seats</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Facility Detail Interactive Modal */}
      <FacilityDetailModal
        facility={selectedFacility}
        isOpen={!!selectedFacility}
        onClose={() => setSelectedFacility(null)}
        onNavigate={onNavigate}
      />

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="bg-emerald-100 text-[#0B6E31] text-xs font-bold px-2.5 py-0.5 rounded">
                {selectedNotice.category}
              </span>
              <span className="text-xs text-slate-500 font-medium">{selectedNotice.date}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 font-serif">
              {selectedNotice.title}
            </h3>

            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedNotice.summary}
            </p>

            <div className="pt-3 border-t flex justify-end">
              <button
                onClick={() => setSelectedNotice(null)}
                className="bg-[#0B6E31] text-white font-bold text-xs px-5 py-2 rounded-lg hover:bg-emerald-800 transition-all"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

