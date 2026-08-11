import React, { useState } from 'react';
import { 
  Home, 
  Info, 
  GraduationCap, 
  Receipt, 
  Building2, 
  Users, 
  Bell, 
  Download, 
  Image as ImageIcon, 
  MessageSquare, 
  PhoneCall, 
  Menu, 
  X
} from 'lucide-react';
import { PageType } from '../types';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Clean, public menu items without public Admin CMS link
  const navItems: { id: PageType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'fee-structure', label: 'Fee Structure', icon: Receipt },
    { id: 'facilities', label: 'Facilities', icon: Building2 },
    { id: 'staff', label: 'Staff Directory', icon: Users },
    { id: 'notifications', label: 'Notices', icon: Bell },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'grievance', label: 'Grievance', icon: MessageSquare },
    { id: 'contact', label: 'Contact Us', icon: PhoneCall },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#0B6E31] text-white border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-12">
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-[#0B6E31] font-bold shadow-xs'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0B6E31]' : 'text-white/80'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Navigation Header Bar */}
          <div className="flex lg:hidden items-center justify-between w-full py-1.5">
            <span className="text-white font-bold text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Navigation Menu
            </span>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-2.5 py-1 text-white bg-white/10 hover:bg-white/20 rounded-md text-xs font-bold flex items-center gap-1 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span>{mobileMenuOpen ? "Close" : "Menu"}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#075324] border-t border-white/10 px-4 py-3 space-y-1 shadow-lg">
          <div className="grid grid-cols-2 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded text-xs font-semibold text-left transition-colors ${
                    isActive
                      ? 'bg-white text-[#0B6E31] font-bold'
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};
