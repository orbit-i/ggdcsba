import React from 'react';
import { Phone, Facebook } from 'lucide-react';
import { useSiteData } from '../context/DataContext';
import { PageType } from '../types';

interface HeaderProps {
  onNavigate: (page: PageType) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { collegeInfo } = useSiteData();
  const phonePrimary = collegeInfo?.phonePrimary || "0244-9470174";

  return (
    <header className="w-full bg-white text-slate-900 border-b border-slate-200">
      {/* Top Thin Green Bar */}
      <div className="bg-[#075324] text-white text-[11px] py-1 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-emerald-100 font-medium truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
            <span>Government of Sindh • College Education Department • Est. 1966</span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-emerald-100">
            <a 
              href={`tel:${phonePrimary}`} 
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-300" />
              <span className="font-semibold font-mono">{phonePrimary}</span>
            </a>
            <span className="text-white/30 hidden sm:inline">|</span>
            <a 
              href={collegeInfo?.facebookUrl || "https://www.facebook.com/share/1Dtr7stS8i/?mibextid=wwXIfr"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden sm:flex items-center gap-1 hover:text-white transition-colors"
            >
              <Facebook className="w-3 h-3 text-amber-300" />
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Clean Brand Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-between gap-3">
        {/* Official Seal Logo & Institution Title */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
          <img 
            src={collegeInfo.logoUrl} 
            alt="Government Girls Degree College Nawabshah Official Seal" 
            className="w-11 h-11 sm:w-12 sm:h-12 object-contain shrink-0"
            referrerPolicy="no-referrer"
          />

          <div>
            <h1 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-slate-900 font-serif leading-tight">
              Government Girls Degree College Nawabshah
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
              District Shaheed Benazirabad, Sindh, Pakistan
            </p>
          </div>
        </div>

        {/* Right side contact phone badge */}
        <div className="hidden md:flex items-center gap-2 text-right">
          <div className="text-xs">
            <span className="text-slate-400 font-medium block text-[10px] uppercase tracking-wider">Admission Helpline</span>
            <span className="font-bold text-[#0B6E31] font-mono">{phonePrimary}</span>
          </div>
        </div>
      </div>
    </header>
  );
};


