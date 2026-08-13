import React, { useState } from 'react';
import { Users, ShieldCheck, Upload, Search, CheckCircle2, AlertCircle, FileText, Building2, GraduationCap } from 'lucide-react';
import { useSiteData } from '../../context/DataContext';
import { HODS_LIST } from '../../data/collegeData';

export const StaffDirectoryPage: React.FC = () => {
  const { sanctionedPosts } = useSiteData();
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const departments = ['All', 'College Administration', 'Computer Science & IT', 'Chemistry', 'Biological Sciences', 'English Literature', 'Commerce & Humanities', 'Library & Digital Resources', 'Sports Directorate', 'Accounts & Administration'];

  const filteredPosts = sanctionedPosts.filter(post => {
    const matchesDept = departmentFilter === 'All' || post.department === departmentFilter;
    const matchesSearch = post.designation.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Title Header */}
      <div className="bg-emerald-900 text-white p-8 rounded-2xl shadow-md border-b-4 border-amber-400">
        <span className="bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
          E-Governance Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif mt-2 text-white">
          Staff Directory & Organizational Structure
        </h1>
        <p className="text-sm text-emerald-200 mt-1 max-w-3xl">
          Official sanctioned posts and departmental faculty organization for Government Girls Degree College Nawabshah.
        </p>
      </div>

      {/* HODs of Various Departments (Verified Faculty Data) */}
      <div className="bg-white rounded-2xl border border-emerald-200 shadow-2xs overflow-hidden">
        <div className="bg-emerald-950 text-white p-4 sm:p-6 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="font-serif font-bold text-lg text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-300" />
              Heads of Various Departments (HODs)
            </h2>
            <p className="text-xs text-emerald-300">Departmental leadership, Government Girls Degree College Nawabshah</p>
          </div>
          <span className="bg-emerald-800 text-amber-300 text-xs font-mono font-bold px-3 py-1 rounded border border-emerald-700">
            {HODS_LIST.length} Departments
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-emerald-100">
          {HODS_LIST.map((hod) => (
            <div key={hod.id} className="bg-white p-4 sm:p-5 hover:bg-emerald-50/60 transition-colors flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0">
                <Users className="w-4.5 h-4.5 text-[#0B6E31]" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm text-emerald-950 font-serif leading-snug truncate">
                  {hod.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{hod.designation}</p>
                <p className="text-xs font-semibold text-[#0B6E31] mt-1">
                  HOD: {hod.department}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Department Filter Dropdown */}
        <div className="w-full md:w-auto flex items-center gap-2">
          <label className="text-xs font-bold text-slate-700 shrink-0">Department:</label>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="bg-slate-50 border border-emerald-300 rounded-xl p-2 text-xs font-semibold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            {departments.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search designation or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-emerald-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

    
      </div>

    </div>
  );
};
