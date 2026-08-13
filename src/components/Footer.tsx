import React from 'react';
import { Phone, Mail, MapPin, Facebook, ExternalLink, Lock, ArrowUp } from 'lucide-react';
import { useSiteData } from '../context/DataContext';
import { PageType } from '../types';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { collegeInfo, usefulLinks } = useSiteData();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#075324] text-white pt-10 pb-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/10">
          
          {/* Col 1: College Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img 
                src={collegeInfo.logoUrl} 
                alt="Government Girls Degree College Nawabshah Official Seal" 
                className="w-12 h-12 object-contain rounded-full bg-white p-1"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="font-serif font-bold text-sm text-white leading-snug">
                  {collegeInfo.name}
                </h3>
                <p className="text-[11px] text-emerald-200">Est. 1966 • Government of Sindh</p>
              </div>
            </div>

            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Premier public sector institution dedicated to empowering young women through higher academic excellence, scientific innovation, and moral character in Shaheed Benazirabad.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-100">
              <li>
                <button onClick={() => { onNavigate('about'); scrollToTop(); }} className="hover:text-white transition-colors">
                  › About College & History
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('academics'); scrollToTop(); }} className="hover:text-white transition-colors">
                  › Academic Programs & BS Degrees
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('fee-structure'); scrollToTop(); }} className="hover:text-white transition-colors">
                  › Graduation Fee Schedule
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('facilities'); scrollToTop(); }} className="hover:text-white transition-colors">
                  › Campus Facilities & Labs
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('downloads'); scrollToTop(); }} className="hover:text-white transition-colors">
                  › Downloads & Admission Forms
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('grievance'); scrollToTop(); }} className="hover:text-white transition-colors">
                  › Grievance & Feedback Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official External Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              External Portals
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-100">
              {usefulLinks && usefulLinks.slice(0, 5).map((link) => (
                <li key={link.id}>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>› {link.title}</span>
                    <ExternalLink className="w-3 h-3 text-emerald-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Contact Desk
            </h4>
            <div className="space-y-2 text-xs text-emerald-100">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>{collegeInfo.location}</span>
              </p>
              <p className="flex items-center gap-2 font-mono">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <span>0244-9470174 | 0244-9470173</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <span>{collegeInfo.email}</span>
              </p>
              <a 
                href={collegeInfo.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 text-xs text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-all mt-1"
              >
                <Facebook className="w-3.5 h-3.5 text-white" />
                <span>Official Facebook Page</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Secret Superadmin Portal Access */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200 pt-2">
          <p>
            © {new Date().getFullYear()} Government Girls Degree College Nawabshah. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {/* Secret Hidden Superadmin Lock Button */}
            <button
              onClick={() => { onNavigate('admin'); scrollToTop(); }}
              className="text-emerald-200/60 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
              title="Secret Administrative Access"
            >
              <Lock className="w-3 h-3 text-emerald-300" />
               
            </button>

            <button
              onClick={scrollToTop}
              className="bg-white/10 hover:bg-white/20 text-white p-1.5 rounded transition-colors"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
