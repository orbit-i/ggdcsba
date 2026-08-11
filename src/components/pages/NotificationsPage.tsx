import React, { useState } from 'react';
import { useSiteData } from '../../context/DataContext';
import { Bell, Calendar, Download, Search, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Modal } from '../Modal';
import { Announcement } from '../../types';

export const NotificationsPage: React.FC = () => {
  const { announcements } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeNotice, setActiveNotice] = useState<Announcement | null>(null);

  const categories = ['All', 'Admissions', 'Exams', 'Notice', 'Events'];

  const filteredNotices = announcements.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Title Header */}
      <div className="bg-emerald-900 text-white p-8 rounded-2xl shadow-md border-b-4 border-amber-400">
        <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
          <Bell className="w-4 h-4 animate-bounce" />
          E-Governance Public Notices
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
          Notifications, Circulars & Announcements
        </h1>
        <p className="text-sm text-emerald-200 mt-1 max-w-3xl">
          Official orders, examination datesheets, admission merit lists, and college circulars issued by Government Girls Degree College Nawabshah.
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
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-emerald-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => (
          <div 
            key={notice.id}
            className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-2xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-l-emerald-700"
          >
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase">
                  {notice.category}
                </span>
                {notice.isNew && (
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase animate-pulse">
                    NEW
                  </span>
                )}
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                  {notice.date}
                </span>
              </div>

              <h3 className="text-lg font-bold font-serif text-emerald-950">
                {notice.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {notice.summary}
              </p>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
              <span className="text-[11px] font-mono text-slate-400">Ref: {notice.id}</span>
              <button
                onClick={() => setActiveNotice(notice)}
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-2xs transition-all flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-amber-300" />
                <span>Read Full Document</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Notice Detail Modal */}
      <Modal
        isOpen={activeNotice !== null}
        onClose={() => setActiveNotice(null)}
        title={activeNotice ? `Official Notice (${activeNotice.id})` : ''}
        maxWidth="xl"
      >
        {activeNotice && (
          <div className="space-y-4 text-xs text-slate-800">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <span className="bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded">
                Category: {activeNotice.category}
              </span>
              <span className="text-slate-500 font-semibold">{activeNotice.date}</span>
            </div>

            <h2 className="text-lg font-serif font-bold text-emerald-950">
              {activeNotice.title}
            </h2>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-700 leading-relaxed space-y-2">
              <p><strong>Government Order Summary:</strong></p>
              <p>{activeNotice.summary}</p>
              <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                Issued by: Office of the Principal & Director Colleges Shaheed Benazirabad Region.
              </p>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                onClick={() => {
                  alert(`Downloading official PDF circular: ${activeNotice.id}.pdf`);
                  setActiveNotice(null);
                }}
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 shadow"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>Download Official PDF Circular</span>
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
