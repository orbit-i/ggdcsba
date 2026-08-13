import React from 'react';
import { GraduationCap, CheckCircle2, FileText, Landmark, Users2, Sigma } from 'lucide-react';

const faculties = [
  {
    name: 'Faculty of Science and Technology',
    icon: Sigma,
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
    icon: Users2,
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
    icon: Landmark,
    departments: [
      'Commerce Department',
      'Economics Department',
    ],
  },
];

const programOfferedRow1 = [
  'F.Sc. (Pre-Medical - Pre-Engineering)',
  'I.C.S',
  'I.COM',
];

const programOfferedRow2 = [
  'AD In Sciences',
  'AD In Arts',
];

export const AcademicsPage: React.FC = () => {
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

      {/* Faculties & Departments */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          Programs Offered
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {faculties.map((faculty, idx) => {
            const Icon = faculty.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-2xs hover:shadow-md transition-all border-t-4 border-t-emerald-700 space-y-4"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-emerald-100 text-emerald-800 p-2 rounded-lg shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold font-serif text-emerald-950 leading-snug">
                    {faculty.name}
                  </h3>
                </div>
                <ul className="space-y-1.5">
                  {faculty.departments.map((dept, i) => (
                    <li
                      key={i}
                      className="text-xs text-slate-700 flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                      {dept}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Programs Offered Table */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-serif text-emerald-950 text-center">
          Program Offered
        </h2>
        <p className="text-sm text-slate-700 text-center">
          GGDCN College Offered Following Programs:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {programOfferedRow1.map((prog, i) => (
            <div
              key={i}
              className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-4 text-center text-sm font-semibold text-emerald-900 hover:bg-emerald-100 transition-colors"
            >
              {prog}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {programOfferedRow2.map((prog, i) => (
            <div
              key={i}
              className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-4 text-center text-sm font-semibold text-sky-900 hover:bg-sky-100 transition-colors"
            >
              {prog}
            </div>
          ))}
        </div>
      </div>

      {/* Admission Procedure & Eligibility Criteria */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-serif text-emerald-950 text-center">
          Admission Procedure
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-emerald-950 uppercase tracking-wide">
              F.Sc. (Pre-Medical / Pre-Engineering) / I.C.S / I.COM / Arts
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                SSC or Equivalent
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                Minimum qualification for admission: 45% & above marks
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                Admission is Free of cost
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-emerald-950 uppercase tracking-wide">
              AD in Sciences (B.Sc-I & B.Sc-II) / AD in Arts (B.A-I & B.A-II)
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                HSC or Equivalent
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                Minimum qualification for admission: 45% & above marks
              </li>
            </ul>
          </div>
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
