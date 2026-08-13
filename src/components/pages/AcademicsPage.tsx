import React, { useState } from 'react';
import { useSiteData } from '../../context/DataContext';
import { GraduationCap, BookOpen, CheckCircle2, FileText, ArrowRight, Clock, Users, Laptop } from 'lucide-react';
import { ProgramItem } from '../../types';

const faculties = [
  {
    name: 'Faculty of Science and Technology',
    departments: [
      'Computer Science Department',
      'Chemistry Department',
      'Mathematics Department',
      'Physics Department',
      'Zoology Department',
      'Botany Department',
      'Geography Department',
    ],
  },
  {
    name: 'Faculty of Social Sciences and Humanities',
    departments: [
      'Political Science Department',
      'Islamic Culture Department',
      'Sociology Department',
      'Islamic Studies Department',
      'English Department',
      'Urdu Department',
    ],
  },
  {
    name: 'Faculty of Management Sciences',
    departments: [
      'Commerce Department',
      'Economics Department',
    ],
  },
];

export const AcademicsPage: React.FC = () => {
  const { programs } = useSiteData();
  const [activeTab, setActiveTab] = useState<'All' | 'Undergraduate (BS 4-Year)' | 'Intermediate (HSSC)'>('All');

  const filteredPrograms = activeTab === 'All' 
    ? programs 
    : programs.filter(p => p.level === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Title Banner */}
      <div className="bg-emerald-900 text-white p-8 rounded-2xl shadow-md border-b-4 border-amber-400 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
            Academic Excellence
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif mt-2 text-white">
            Academic Programs & Degree Courses
          </h1>
          <p className="text-sm text-emerald-200 mt-1">
            Standardized Intermediate (HSSC) & Undergraduate 4-Year Graduation Programs (BS Degree)
          </p>
        </div>

        <div className="bg-emerald-950 p-4 rounded-xl border border-emerald-800 text-xs text-emerald-200 shrink-0">
          <p className="font-bold text-white mb-1">Online Admission Desk</p>
          <p>SECCAP Sindh Govt Portal active</p>
        </div>
      </div>

      {/* Program Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-emerald-200 pb-2">
        {(['All', 'Undergraduate (BS 4-Year)', 'Intermediate (HSSC)'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab
                ? 'bg-emerald-800 text-white shadow'
                : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            {tab === 'All' ? 'All Academic Programs' : tab}
          </button>
        ))}
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPrograms.map((prog) => (
          <div 
            key={prog.id}
            className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-2xs hover:shadow-md transition-all border-l-4 border-l-emerald-600 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-2.5 py-0.5 rounded">
                  {prog.level}
                </span>
                <span className="text-xs text-amber-700 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {prog.duration}
                </span>
              </div>

              <h3 className="text-xl font-bold font-serif text-emerald-950">
                {prog.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {prog.description}
              </p>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-slate-700">
                    <strong className="text-slate-900">Eligibility:</strong> {prog.eligibility}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-600 shrink-0" />
                  <p className="text-slate-700">
                    <strong className="text-slate-900">Sanctioned Seats:</strong> {prog.seats} Seats per batch
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Subjects & Departments:</p>
                <div className="flex flex-wrap gap-1">
                  {prog.departments.map((dept, i) => (
                    <span key={i} className="bg-emerald-50 text-emerald-800 text-[11px] font-medium px-2 py-0.5 rounded border border-emerald-100">
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">Code: {prog.id}</span>
              <button className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1">
                Admission Rules <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Faculties & Departments */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          Programs Offered
        </div>

        <div className="bg-sky-400/80 rounded-2xl p-6 space-y-6">
          {faculties.map((faculty, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-base font-bold font-serif text-slate-900">
                {faculty.name}
              </h3>
              <ul className="space-y-1.5">
                {faculty.departments.map((dept, i) => (
                  <li key={i} className="text-sm text-slate-900">
                    • {dept}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Programs Offered Table */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-serif text-emerald-950 text-center underline decoration-2">
          Program Offered
        </h2>
        <p className="text-sm text-slate-700">
          GGDCN College Offered Following Programs:
        </p>

        <div className="rounded-xl overflow-hidden border border-emerald-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 bg-emerald-50 border-b border-emerald-200">
            <div className="px-4 py-3 text-sm font-semibold text-slate-800 text-center border-b sm:border-b-0 sm:border-r border-emerald-200 underline decoration-1">
              F.Sc. (Pre-Medical - Pre-Engineering)
            </div>
            <div className="px-4 py-3 text-sm font-semibold text-slate-800 text-center border-b sm:border-b-0 sm:border-r border-emerald-200">
              I.C.S
            </div>
            <div className="px-4 py-3 text-sm font-semibold text-slate-800 text-center">
              I.COM
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 bg-blue-50">
            <div className="px-4 py-3 text-sm font-semibold text-slate-800 text-center border-b sm:border-b-0 sm:border-r border-emerald-200">
              AD In Sciences
            </div>
            <div className="px-4 py-3 text-sm font-semibold text-slate-800 text-center">
              AD In Arts
            </div>
          </div>
        </div>
      </div>

      {/* Admission Procedure & Eligibility Criteria */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-serif text-emerald-950 text-center">
          Admission Procedure
        </h2>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">Eligibility Criteria</h3>

          <ol className="list-decimal list-inside space-y-3 text-sm text-slate-800">
            <li>
              <span className="font-semibold underline">F.Sc. (Pre-Medical - Pre-Engineering)/ I.C.S/ I.COM/ARTS</span>
              <ul className="list-disc list-inside pl-6 mt-1 space-y-1 text-slate-700">
                <li>SSC or Equivalent</li>
                <li>Minimum qualification for admission 45% & above marks are required.</li>
                <li>Admission is Free of cost</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">
                AD in Sciences (<span className="underline">B.Sc-I</span> & <span className="underline">B.Sc-II</span>) / AD in Arts (B.A-I & <span className="underline">B.A</span>-II)
              </span>
              <ul className="list-disc list-inside pl-6 mt-1 space-y-1 text-slate-700">
                <li>HSC or Equivalent</li>
                <li>Minimum Qualification for admission 45% & above marks are required.</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>

      {/* Online Admission & Document Checklist */}
      <div className="bg-emerald-950 text-emerald-100 rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            Admissions Procedure & SECCAP Guidelines
          </div>
          <h2 className="text-2xl font-bold font-serif text-white">
            How to Apply for Admissions
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
            Admissions for Intermediate HSSC and BS Graduation programs are processed online through the Sindh Electronic Centralized College Admission Process (SECCAP) portal and physically at the college admission desk.
          </p>

          <div className="space-y-2 text-xs text-emerald-100">
            <p className="font-bold text-amber-300">Mandatory Document Checklist for Verification:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <li className="flex items-center gap-1.5 bg-emerald-900/80 p-2 rounded border border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Matric/SSC Marks Sheet (Original + 3 copies)</span>
              </li>
              <li className="flex items-center gap-1.5 bg-emerald-900/80 p-2 rounded border border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Character Certificate from last school</span>
              </li>
              <li className="flex items-center gap-1.5 bg-emerald-900/80 p-2 rounded border border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Father / Guardian CNIC Copy</span>
              </li>
              <li className="flex items-center gap-1.5 bg-emerald-900/80 p-2 rounded border border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Student B-Form / CNIC Copy</span>
              </li>
              <li className="flex items-center gap-1.5 bg-emerald-900/80 p-2 rounded border border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>District Domicile & PRC (Form-C)</span>
              </li>
              <li className="flex items-center gap-1.5 bg-emerald-900/80 p-2 rounded border border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>6 Recent Passport Size Photographs</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-5 bg-emerald-900 p-6 rounded-xl border border-emerald-800 space-y-3">
          <h3 className="font-bold text-white text-base font-serif">Admission Help Desk</h3>
          <p className="text-xs text-emerald-200">
            For assistance with form submission or merit list inquiries, visit the admission office during working hours.
          </p>
          <div className="text-xs text-amber-300 font-semibold space-y-1 pt-2 border-t border-emerald-800">
            <p>📍 Location: Room No. 4, Admission Wing, GGDCN</p>
            <p>📞 Admission Desk Phone: 0244-9470174</p>
            <p>⏰ Timings: 08:30 AM – 01:30 PM (Mon - Sat)</p>
          </div>
        </div>
      </div>

    </div>
  );
};
