import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  maxWidth = 'lg' 
}) => {
  if (!isOpen) return null;

  const widthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl'
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className={`bg-white rounded-2xl shadow-2xl border border-emerald-100 w-full ${widthClass} overflow-hidden max-h-[90vh] flex flex-col transform transition-all`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between border-b border-emerald-800 shrink-0">
          <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-emerald-200 hover:text-white hover:bg-emerald-800 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto text-slate-800">
          {children}
        </div>
      </div>
    </div>
  );
};
