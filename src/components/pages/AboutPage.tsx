import React from 'react';
import { useSiteData } from '../../context/DataContext';
import { Award, BookOpen, Building2, CheckCircle2, ShieldCheck, Users, Compass, History } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { collegeInfo, departments } = useSiteData();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Page Title Header Bento Card */}
      <div className="bg-[#006837] text-white p-8 rounded-3xl shadow-sm border-2 border-[#006837]/20">
        <span className="bg-amber-400 text-slate-950 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
          Institutional Profile
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif mt-3 text-white">
          About {collegeInfo.fullName}
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-3xl">
          Est. {collegeInfo.established || 1966} • {collegeInfo.affiliation} • {collegeInfo.address}
        </p>
      </div>

      {/* History & Heritage Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#006837]/10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-[#006837] text-xs font-black uppercase tracking-wider">
            <History className="w-4 h-4 text-amber-500" />
            Historical Background (Est. 1966)
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-slate-900">
            A Legacy of Six Decades of Female Empowerment in Higher Education
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Government Girls Degree College Nawabshah was established in 1966 with the foundational objective of delivering accessible, high-quality post-secondary education to young women across Shaheed Benazirabad district and surrounding regions of Sindh.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Over the past six decades, the institution has evolved from an intermediate college into a premier degree-awarding college, offering four-year BS Graduation programs in Computer Science, English Literature, Chemistry, Botany, Zoology, and Economics alongside traditional Intermediate (F.Sc, F.A, I.Com) streams.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-[#dcfce7] p-4 rounded-2xl border border-emerald-200 text-center">
              <span className="text-3xl font-black text-[#006837] font-serif">1966</span>
              <p className="text-xs text-[#006837] font-extrabold mt-0.5 uppercase tracking-wider">Established Year</p>
            </div>
            <div className="bg-[#dcfce7] p-4 rounded-2xl border border-emerald-200 text-center">
              <span className="text-3xl font-black text-[#006837] font-serif">1000+</span>
              <p className="text-xs text-[#006837] font-extrabold mt-0.5 uppercase tracking-wider">Alumnae Graduates</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl overflow-hidden border-2 border-[#006837]/20 shadow-md">
            <img 
              src={collegeInfo.heroCampusUrl} 
              alt="GGDCN Historic Campus" 
              className="w-full h-72 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="bg-[#006837] text-white p-4 text-xs">
              <p className="font-bold text-white">{collegeInfo.fullName} Campus</p>
              <p className="text-[11px] text-emerald-100 mt-0.5">Lush green courtyard, solar power grid, and historic academic blocks.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision, Mission & Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#006837] text-white p-6 sm:p-8 rounded-3xl shadow-sm border-2 border-[#006837]/20 space-y-3">
          <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black">
            <Compass className="w-5 h-5 text-slate-950" />
          </div>
          <h3 className="text-xl font-extrabold font-serif text-white">Our Vision</h3>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            To be recognized as a center of academic excellence and female leadership in Sindh, fostering intellectual curiosity, scientific research, and societal responsibility among young women.
          </p>
        </div>

        <div className="bg-[#004e28] text-white p-6 sm:p-8 rounded-3xl shadow-sm border-2 border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-black">
            <Award className="w-5 h-5 text-slate-950" />
          </div>
          <h3 className="text-xl font-extrabold font-serif text-white">Our Mission</h3>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            To provide inclusive, subsidized, and modern higher education equipped with digital infrastructure, state-of-the-art laboratories, and ethical leadership training in compliance with Government of Sindh policies.
          </p>
        </div>
      </div>

      {/* Principal's Message */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#006837]/10 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#dcfce7] text-[#006837] flex items-center justify-center font-bold">
            <Users className="w-6 h-6 text-[#006837]" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-xl text-[#006837]">Principal's Welcome Address</h3>
            <p className="text-xs font-semibold text-slate-600">Office of the Principal, Govt Girls Degree College Nawabshah</p>
          </div>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p className="italic font-serif text-[#006837] bg-[#dcfce7] p-4 rounded-2xl border-l-4 border-[#006837] text-base">
            "Dear Students, Parents, and Visitors, Welcome to the official portal of Government Girls Degree College Nawabshah."
          </p>
          <p>
            Education is not merely the acquisition of degree certificates; it is the transformation of character, intellect, and vision. At Govt Girls Degree College Nawabshah, our dedicated faculty strives every day to create a nurturing academic environment where young female minds can explore science, humanities, arts, and technology with confidence.
          </p>
          <p>
            In alignment with the Department of College Education, Government of Sindh, we have modernized our academic facilities with solar power backup, computer laboratories, digital library access, and e-governance grievance redressal portals. We invite all female students of Shaheed Benazirabad to embark on an inspiring journey with us.
          </p>
        </div>
      </div>




      {/* Regulatory Governance & Affiliation Details */}
      <div className="bg-[#006837] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-300" />
          Regulatory Affiliations & Governance
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
          Government Girls Degree College Nawabshah operates strictly under the administration of the Department of College Education, Government of Sindh.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-xs">
            <p className="font-bold text-white mb-1">BISE Shaheed Benazirabad</p>
            <p className="text-emerald-100">Affiliated for Intermediate HSSC (Part-I & Part-II) Examinations & Certification.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-xs">
            <p className="font-bold text-white mb-1">Shaheed benazir bhutto University Shaheed Benazirabad / SBBU SBA</p>
            <p className="text-emerald-100">Degree awarding university affiliation Degree Programs.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-xs">
            <p className="font-bold text-white mb-1">Government of Sindh CED</p>
            <p className="text-emerald-100">Department of College Education administrative governance and standardized rules.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
