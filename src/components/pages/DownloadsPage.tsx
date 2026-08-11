import React, { useState } from 'react';
import { useSiteData } from '../../context/DataContext';
import { Download, FileText, Search, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { DownloadItem } from '../../types';

export const DownloadsPage: React.FC = () => {
  const { downloads } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const categories = ['All', 'Admission Forms', 'Prospectus', 'Challan', 'Certificates & NOC', 'Academic Policies'];

  const filteredDownloads = downloads.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSimulatedDownload = (item: DownloadItem) => {
    setDownloadSuccess(`Simulated download started for: "${item.title}" (${item.size})`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Title Header */}
      <div className="bg-emerald-900 text-white p-8 rounded-2xl shadow-md border-b-4 border-amber-400">
        <span className="bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
          E-Governance Downloads
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif mt-2 text-white">
          Forms, Applications & Prospectus Downloads
        </h1>
        <p className="text-sm text-emerald-200 mt-1 max-w-3xl">
          Official downloadable PDF resources, bank challans, leave applications, prospectus, and policy handbooks.
        </p>
      </div>

      {/* Download Alert Message */}
      {downloadSuccess && (
        <div className="bg-emerald-800 text-white p-4 rounded-xl border border-emerald-500 shadow-md flex items-center gap-2 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
          <span>{downloadSuccess}</span>
        </div>
      )}

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
            placeholder="Search downloads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-emerald-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

      </div>

      {/* Downloads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDownloads.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between hover:border-emerald-300"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase">
                  {item.category}
                </span>
                <span className="bg-slate-100 text-slate-700 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.fileFormat} • {item.size}
                </span>
              </div>

              <h3 className="text-base font-bold font-serif text-emerald-950 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>

              <p className="text-[10px] text-slate-400 font-medium">
                Official Government PDF Document
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4">
              <button
                onClick={() => handleSimulatedDownload(item)}
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-2.5 rounded-lg shadow-2xs transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>Download Official Form</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Information Box for Bank Fee Challan Submission */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-2">
        <h3 className="font-serif font-bold text-base text-amber-950 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-700" />
          Instructions for Fee Deposit & Bank Challans
        </h3>
        <p className="text-xs text-slate-700 leading-relaxed">
          Fee payments must be deposited at National Bank of Pakistan (NBP) Main Branch Nawabshah using the official 3-part bank challan. Return the College Copy and Student Accounts Copy to Room No. 2 (Accounts Branch) for fee clearance stamp.
        </p>
      </div>

    </div>
  );
};
