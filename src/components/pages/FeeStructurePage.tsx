import React, { useState } from 'react';
import { useSiteData } from '../../context/DataContext';
import { Receipt, CheckCircle2, ShieldCheck, Download, Calculator, HelpCircle } from 'lucide-react';
import { PageType } from '../../types';

interface FeePageProps {
  onNavigate: (page: PageType) => void;
}

export const FeeStructurePage: React.FC<FeePageProps> = ({ onNavigate }) => {
  const { feeStructure } = useSiteData();
  const feeSchedule = feeStructure || [];
  const [selectedProgram, setSelectedProgram] = useState(feeSchedule[0]?.program || 'BS Computer Science');

  const activeFeeItem = feeSchedule.find(f => f.program === selectedProgram) || feeSchedule[0] || {
    program: 'BS Computer Science',
    admissionFee: 1500,
    tuitionFeePerTerm: 4000,
    librarySecurityFee: 1000,
    sportsITFee: 800,
    examFeePerTerm: 1200,
    totalFirstTerm: 8500,
    frequency: 'Semester'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Title Header */}
      <div className="bg-emerald-900 text-white p-8 rounded-2xl shadow-md border-b-4 border-amber-400">
        <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
          <Receipt className="w-4 h-4" />
          Government Subsidized Rates
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
          Official Fee Structure of Graduation & Intermediate Programs
        </h1>
        <p className="text-sm text-emerald-200 mt-1 max-w-3xl">
          Compliant with Department of College Education, Government of Sindh notifications for academic session 2026-2027.
        </p>
      </div>

      {/* Main Fee Table */}
      <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm overflow-hidden">
        <div className="bg-emerald-950 text-white p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-xl text-white">Graduation & Intermediate Fee Schedule</h2>
            <p className="text-xs text-emerald-300">Payable at designated branches of National Bank of Pakistan (NBP) Nawabshah</p>
          </div>

          <button
            onClick={() => onNavigate('downloads')}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download Bank Challan PDF</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-emerald-800 text-white uppercase text-[11px] font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Program Title</th>
                <th className="py-3.5 px-3">Admission Fee</th>
                <th className="py-3.5 px-3">Tuition Fee</th>
                <th className="py-3.5 px-3">Library & Security</th>
                <th className="py-3.5 px-3">Sports & IT Fund</th>
                <th className="py-3.5 px-3">Exam Fee</th>
                <th className="py-3.5 px-4 sm:px-6 text-emerald-300 font-bold">Total 1st Term</th>
                <th className="py-3.5 px-3">Frequency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100 text-slate-800">
              {feeSchedule.map((item, index) => (
                <tr key={index} className="hover:bg-emerald-50/60 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-bold text-emerald-950">
                    {item.program}
                    {item.notes && <p className="text-[10px] text-slate-500 font-normal mt-0.5">{item.notes}</p>}
                  </td>
                  <td className="py-4 px-3 font-mono">Rs. {item.admissionFee.toLocaleString()}</td>
                  <td className="py-4 px-3 font-mono">Rs. {item.tuitionFeePerTerm.toLocaleString()}</td>
                  <td className="py-4 px-3 font-mono">Rs. {item.librarySecurityFee.toLocaleString()}</td>
                  <td className="py-4 px-3 font-mono">Rs. {item.sportsITFee.toLocaleString()}</td>
                  <td className="py-4 px-3 font-mono">Rs. {item.examFeePerTerm.toLocaleString()}</td>
                  <td className="py-4 px-4 sm:px-6 font-bold font-mono text-emerald-800 text-base bg-emerald-50">
                    Rs. {item.totalFirstTerm.toLocaleString()}
                  </td>
                  <td className="py-4 px-3">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {item.frequency}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-emerald-50 p-4 text-xs text-slate-600 border-t border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Note: Security fees (Rs. 1,000) are refundable upon graduation or completion of course.</span>
          </p>
          <span className="text-emerald-800 font-bold text-[11px]">Authorized by Accounts Branch GGDCN</span>
        </div>
      </div>

      {/* Interactive Term Fee Calculator */}
      <div className="bg-white rounded-2xl border border-emerald-200 p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-amber-500" />
            Interactive Estimate
          </div>
          <h3 className="text-2xl font-bold font-serif text-emerald-950">
            Student Fee Estimator
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Select your graduation program to view an itemized breakdown of initial term payable dues.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Program:</label>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full bg-slate-50 border border-emerald-300 rounded-xl p-3 text-xs font-semibold text-emerald-950 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              {feeSchedule.map((f, i) => (
                <option key={i} value={f.program}>{f.program}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="lg:col-span-7 bg-emerald-900 text-white rounded-xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
            <h4 className="font-bold text-base text-white font-serif">{activeFeeItem.program}</h4>
            <span className="bg-amber-400 text-slate-950 text-xs font-bold px-2.5 py-0.5 rounded uppercase">
              {activeFeeItem.frequency}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-emerald-950 p-2.5 rounded border border-emerald-800">
              <span className="text-emerald-300 text-[11px]">Admission Registration:</span>
              <p className="text-sm font-mono font-bold text-white">Rs. {activeFeeItem.admissionFee}</p>
            </div>
            <div className="bg-emerald-950 p-2.5 rounded border border-emerald-800">
              <span className="text-emerald-300 text-[11px]">Tuition Fee:</span>
              <p className="text-sm font-mono font-bold text-white">Rs. {activeFeeItem.tuitionFeePerTerm}</p>
            </div>
            <div className="bg-emerald-950 p-2.5 rounded border border-emerald-800">
              <span className="text-emerald-300 text-[11px]">Library Deposit:</span>
              <p className="text-sm font-mono font-bold text-white">Rs. {activeFeeItem.librarySecurityFee}</p>
            </div>
            <div className="bg-emerald-950 p-2.5 rounded border border-emerald-800">
              <span className="text-emerald-300 text-[11px]">Sports & IT Fund:</span>
              <p className="text-sm font-mono font-bold text-white">Rs. {activeFeeItem.sportsITFee}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-emerald-800 flex items-center justify-between">
            <span className="text-xs text-emerald-200 font-bold uppercase tracking-wider">Total Initial Payment Dues:</span>
            <span className="text-2xl font-extrabold font-mono text-amber-300">Rs. {activeFeeItem.totalFirstTerm.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Scholarship & Merit Concession Policies */}
      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 space-y-3">
        <h3 className="font-serif font-bold text-lg text-emerald-950 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          Government Scholarships & Fee Concessions
        </h3>
        <p className="text-xs text-slate-700 leading-relaxed">
          Government Girls Degree College Nawabshah facilitates various government and endowment scholarships for deserving female students:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-800 pt-1">
          <li className="bg-white p-3 rounded-lg border border-emerald-100 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            Sindh Endowment Fund Scholarship
          </li>
          <li className="bg-white p-3 rounded-lg border border-emerald-100 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            HEC Need-Based Graduation Grants
          </li>
          <li className="bg-white p-3 rounded-lg border border-emerald-100 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            Merit Fee Stipends for Top Position Holders
          </li>
        </ul>
      </div>

    </div>
  );
};
