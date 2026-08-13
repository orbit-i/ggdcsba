import React, { useState } from 'react';
import { Receipt, CheckCircle2, ShieldCheck, Download, Calculator, HelpCircle } from 'lucide-react';
import { PageType } from '../../types';

interface FeePageProps {
  onNavigate: (page: PageType) => void;
}

interface FeeRow {
  program: string;
  admissionFee: number | null;
  tuitionFee: number;
  totalGovtAC: number;
  developmentFund: number;
  gymkhanaFund: number;
  scienceFund: number | null;
  cmdFund: number | null;
  magazineFund: number;
  libraryFund: number;
  iCardFund: number;
  swFund: number;
  scienceEquipFund: number | null;
  utilitiesFund: number;
  ptaFund: number;
  totalPrivateFund: number;
  grandTotal: number;
}

const feesStructureData: FeeRow[] = [
  {
    program: 'B.Sc-I',
    admissionFee: 75,
    tuitionFee: 900,
    totalGovtAC: 975,
    developmentFund: 50,
    gymkhanaFund: 40,
    scienceFund: 10,
    cmdFund: 20,
    magazineFund: 30,
    libraryFund: 30,
    iCardFund: 10,
    swFund: 40,
    scienceEquipFund: 40,
    utilitiesFund: 50,
    ptaFund: 100,
    totalPrivateFund: 420,
    grandTotal: 1395,
  },
  {
    program: 'B.Sc-II',
    admissionFee: null,
    tuitionFee: 900,
    totalGovtAC: 900,
    developmentFund: 50,
    gymkhanaFund: 40,
    scienceFund: null,
    cmdFund: null,
    magazineFund: 30,
    libraryFund: 30,
    iCardFund: 10,
    swFund: 40,
    scienceEquipFund: 40,
    utilitiesFund: 50,
    ptaFund: 100,
    totalPrivateFund: 390,
    grandTotal: 1290,
  },
  {
    program: 'B.A-I',
    admissionFee: 60,
    tuitionFee: 720,
    totalGovtAC: 780,
    developmentFund: 50,
    gymkhanaFund: 40,
    scienceFund: 10,
    cmdFund: 20,
    magazineFund: 30,
    libraryFund: 30,
    iCardFund: 10,
    swFund: 40,
    scienceEquipFund: null,
    utilitiesFund: 50,
    ptaFund: 100,
    totalPrivateFund: 380,
    grandTotal: 1160,
  },
  {
    program: 'B.A-II',
    admissionFee: null,
    tuitionFee: 720,
    totalGovtAC: 720,
    developmentFund: 50,
    gymkhanaFund: 40,
    scienceFund: null,
    cmdFund: null,
    magazineFund: 30,
    libraryFund: 30,
    iCardFund: 10,
    swFund: 40,
    scienceEquipFund: null,
    utilitiesFund: 50,
    ptaFund: 100,
    totalPrivateFund: 350,
    grandTotal: 1070,
  },
];

const fmt = (val: number | null) => (val === null ? '-' : `Rs. ${val}`);

export const FeeStructurePage: React.FC<FeePageProps> = ({ onNavigate }) => {
  const [selectedProgram, setSelectedProgram] = useState(feesStructureData[0].program);

  const activeFeeItem =
    feesStructureData.find((f) => f.program === selectedProgram) || feesStructureData[0];

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
            <h2 className="font-serif font-bold text-xl text-white">Fees Structure</h2>
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
          <table className="w-full text-left text-[11px] sm:text-xs">
            <thead className="bg-emerald-800 text-white uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-3 sm:px-4">Program</th>
                <th className="py-3.5 px-2">Admission Fee</th>
                <th className="py-3.5 px-2">Tuition Fee</th>
                <th className="py-3.5 px-2 text-emerald-300">Total Govt A/C</th>
                <th className="py-3.5 px-2">Development Fund</th>
                <th className="py-3.5 px-2">Gymkhana Fund</th>
                <th className="py-3.5 px-2">Science Fund</th>
                <th className="py-3.5 px-2">C.M.D Fund</th>
                <th className="py-3.5 px-2">Magazine Fund</th>
                <th className="py-3.5 px-2">Library Fund</th>
                <th className="py-3.5 px-2">I/Card Fund</th>
                <th className="py-3.5 px-2">S.W Fund</th>
                <th className="py-3.5 px-2">Science Equip Fund</th>
                <th className="py-3.5 px-2">Utilities Fund</th>
                <th className="py-3.5 px-2">P.T.A Fund</th>
                <th className="py-3.5 px-2 text-emerald-300">Total Private Fund</th>
                <th className="py-3.5 px-3 sm:px-4 text-amber-300 font-bold">Grand Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100 text-slate-800">
              {feesStructureData.map((item, index) => (
                <tr key={index} className="hover:bg-emerald-50/60 transition-colors">
                  <td className="py-4 px-3 sm:px-4 font-bold text-emerald-950 underline decoration-1">
                    {item.program}
                  </td>
                  <td className="py-4 px-2 font-mono">{fmt(item.admissionFee)}</td>
                  <td className="py-4 px-2 font-mono">{fmt(item.tuitionFee)}</td>
                  <td className="py-4 px-2 font-mono font-bold bg-emerald-50">{fmt(item.totalGovtAC)}</td>
                  <td className="py-4 px-2 font-mono">{fmt(item.developmentFund)}</td>
                  <td className="py-4 px-2 font-mono">{fmt(item.gymkhanaFund)}</td>
                  <td className="py-4 px-2 font-mono">{fmt(item.scienceFund)}</td>
                  <td className="py-4 px-2 font-mono">{fmt(item.cmdFund)}</td>
                  <td className="py-4 px-2 font-mono">{fmt(item.magazineFund)}</td>
                  <td className="py-4 px-2 font-mono">{fmt(item.libraryFund)}</td>
                  <td className="py-4 px-2 font-mono">{fmt(item.iCardFund)}</td>
                  <td className="py-4 px-2 font-mono">{fmt(item.swFund)}</td>
                  <td className="py-4 px-2 font-mono">{fmt(item.scienceEquipFund)}</td>
                  <td className="py-4 px-2 font-mono">{fmt(item.utilitiesFund)}</td>
                  <td className="py-4 px-2 font-mono">{fmt(item.ptaFund)}</td>
                  <td className="py-4 px-2 font-mono font-bold bg-emerald-50">{fmt(item.totalPrivateFund)}</td>
                  <td className="py-4 px-3 sm:px-4 font-bold font-mono text-emerald-800 text-sm bg-emerald-50">
                    {fmt(item.grandTotal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-emerald-50 p-4 text-xs text-slate-600 border-t border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Note: Security fees are refundable upon graduation or completion of course.</span>
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
            Select your program to view an itemized breakdown of payable dues.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Program:</label>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full bg-slate-50 border border-emerald-300 rounded-xl p-3 text-xs font-semibold text-emerald-950 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              {feesStructureData.map((f, i) => (
                <option key={i} value={f.program}>{f.program}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="lg:col-span-7 bg-emerald-900 text-white rounded-xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
            <h4 className="font-bold text-base text-white font-serif">{activeFeeItem.program}</h4>
            <span className="bg-amber-400 text-slate-950 text-xs font-bold px-2.5 py-0.5 rounded uppercase">
              Govt A/C: Rs. {activeFeeItem.totalGovtAC}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-emerald-950 p-2.5 rounded border border-emerald-800">
              <span className="text-emerald-300 text-[11px]">Admission Fee:</span>
              <p className="text-sm font-mono font-bold text-white">{fmt(activeFeeItem.admissionFee)}</p>
            </div>
            <div className="bg-emerald-950 p-2.5 rounded border border-emerald-800">
              <span className="text-emerald-300 text-[11px]">Tuition Fee:</span>
              <p className="text-sm font-mono font-bold text-white">{fmt(activeFeeItem.tuitionFee)}</p>
            </div>
            <div className="bg-emerald-950 p-2.5 rounded border border-emerald-800">
              <span className="text-emerald-300 text-[11px]">Development Fund:</span>
              <p className="text-sm font-mono font-bold text-white">{fmt(activeFeeItem.developmentFund)}</p>
            </div>
            <div className="bg-emerald-950 p-2.5 rounded border border-emerald-800">
              <span className="text-emerald-300 text-[11px]">Gymkhana Fund:</span>
              <p className="text-sm font-mono font-bold text-white">{fmt(activeFeeItem.gymkhanaFund)}</p>
            </div>
            <div className="bg-emerald-950 p-2.5 rounded border border-emerald-800">
              <span className="text-emerald-300 text-[11px]">Science Fund:</span>
              <p className="text-sm font-mono font-bold text-white">{fmt(activeFeeItem.scienceFund)}</p>
            </div>
            <div className="bg-emerald-950 p-2.5 rounded border border-emerald-800">
              <span className="text-emerald-300 text-[11px]">C.M.D Fund:</span>
              <p className="text-sm font-mono font-bold text-white">{fmt(activeFeeItem.cmdFund)}</p>
            </div>
            <div className="bg-emerald-950 p-2.5 rounded border border-emerald-800">
              <span className="text-emerald-300 text-[11px]">Magazine Fund:</span>
              <p className="text-sm font-mono font-bold text-white">{fmt(activeFeeItem.magazineFund)}</p>
            </div>
            <div className="bg-emerald-950 p-2.5 rounded border border-emerald-800">
              <span className="text-emerald-300 text-[11px]">Library Fund:</span>
              <p className="text-sm font-mono font-bold text-white">{fmt(activeFeeItem.libraryFund)}</p>
            </div>
            <div className="bg-emerald-950 p-2.5 rounded border border-emerald-800">
              <span className="text-emerald-300 text-[11px]">I/Card Fund:</span>
              <p className="text-sm font-mono font-bold text-white">{fmt(activeFeeItem.iCardFund)}</p>
            </div>
            <div className="bg-emerald-950 p-2.5 rounded border border-emerald-800">
              <span className="text-emerald-300 text-[11px]">S.W Fund:</span>
              <p className="text-sm font-mono font-bold text-white">{fmt(activeFeeItem.swFund)}</p>
            </div>
            <div className="bg-emerald-950 p-2.5 rounded border border-emerald-800">
              <span className="text-emerald-300 text-[11px]">Science Equip Fund:</span>
              <p className="text-sm font-mono font-bold text-white">{fmt(activeFeeItem.scienceEquipFund)}</p>
            </div>
            <div className="bg-emerald-950 p-2.5 rounded border border-emerald-800">
              <span className="text-emerald-300 text-[11px]">Utilities Fund:</span>
              <p className="text-sm font-mono font-bold text-white">{fmt(activeFeeItem.utilitiesFund)}</p>
            </div>
            <div className="bg-emerald-950 p-2.5 rounded border border-emerald-800">
              <span className="text-emerald-300 text-[11px]">P.T.A Fund:</span>
              <p className="text-sm font-mono font-bold text-white">{fmt(activeFeeItem.ptaFund)}</p>
            </div>
            <div className="bg-emerald-950 p-2.5 rounded border border-emerald-800 col-span-2 sm:col-span-1">
              <span className="text-emerald-300 text-[11px]">Total Private Fund:</span>
              <p className="text-sm font-mono font-bold text-white">{fmt(activeFeeItem.totalPrivateFund)}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-emerald-800 flex items-center justify-between">
            <span className="text-xs text-emerald-200 font-bold uppercase tracking-wider">Grand Total:</span>
            <span className="text-2xl font-extrabold font-mono text-amber-300">Rs. {activeFeeItem.grandTotal.toLocaleString()}</span>
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
