import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Clock, Send, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';
import { useSiteData } from '../../context/DataContext';

export const ContactPage: React.FC = () => {
  const { collegeInfo } = useSiteData();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Title Header */}
      <div className="bg-emerald-900 text-white p-8 rounded-2xl shadow-md border-b-4 border-amber-400">
        <span className="bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
          Official Helpdesk
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif mt-2 text-white">
          Contact Government Girls Degree College Nawabshah
        </h1>
        <p className="text-sm text-emerald-200 mt-1 max-w-3xl">
          Get in touch with the Principal's Office, Admissions Desk, or Departmental Enquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Contact Information & Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-sm space-y-4">
            <h2 className="font-serif font-bold text-xl text-emerald-950 border-b border-emerald-100 pb-3">
              Official Landlines & Location
            </h2>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm">Official College Helplines</h4>
                  <p className="text-xs font-bold text-emerald-800 font-mono mt-0.5">Ph: 0244-9470174</p>
                  <p className="text-xs font-bold text-emerald-800 font-mono">Ph: 0244-9470173</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Available during official college hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm">Campus Postal Address</h4>
                  <p className="text-xs text-slate-800 mt-0.5 font-medium">{collegeInfo.location}</p>
                  <p className="text-[11px] text-slate-500">Nawabshah, Shaheed Benazirabad, Sindh, Pakistan</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm">Email Inquiries</h4>
                  <p className="text-xs font-medium text-emerald-800 mt-0.5">{collegeInfo.email}</p>
                  <p className="text-xs text-slate-600">{collegeInfo.principalEmail}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm">Working Hours</h4>
                  <p className="text-xs text-slate-800 mt-0.5">{collegeInfo.workingHours}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-100">
              <a 
                href={collegeInfo.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-3 rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2"
              >
                <Facebook className="w-4 h-4 text-blue-300" />
                <span>Visit Official Facebook Page</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
              </a>
            </div>
          </div>

          <div className="bg-emerald-950 text-white p-6 rounded-2xl shadow-sm space-y-2">
            <h4 className="font-serif font-bold text-base text-amber-300 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              Visitor Entry & Security Notice
            </h4>
            <p className="text-xs text-emerald-200 leading-relaxed">
              All visitors, parents, and guardians must present original CNIC at Gate No. 1 and obtain a visitor pass before entering campus administrative blocks.
            </p>
          </div>

        </div>

        {/* Right: Direct Inquiry Form & Map View */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-6">
          <div className="border-b border-emerald-100 pb-3">
            <h2 className="text-xl font-bold font-serif text-emerald-950">
              Send an Instant Inquiry Message
            </h2>
            <p className="text-xs text-slate-600">
              Direct form for general queries regarding admissions, fee payments, and academic calendars.
            </p>
          </div>

          {submitted && (
            <div className="bg-emerald-800 text-white p-4 rounded-xl text-xs font-bold flex items-center gap-2 shadow">
              <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
              <span>Thank you! Your inquiry has been dispatched to the College Information Desk.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fatima Ali"
                  className="w-full bg-slate-50 border border-emerald-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0300-1234567"
                  className="w-full bg-slate-50 border border-emerald-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="e.g. fatima@example.com"
                className="w-full bg-slate-50 border border-emerald-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Inquiry Topic</label>
              <select className="w-full bg-slate-50 border border-emerald-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600">
                <option>BS Graduation Programs Admission</option>
                <option>Intermediate (HSSC) Admission</option>
                <option>Fee Structure & Bank Challan Query</option>
                <option>Examination & Transcript Request</option>
                <option>General Campus Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Your Message *</label>
              <textarea
                rows={4}
                required
                placeholder="Type your inquiry or question here..."
                className="w-full bg-slate-50 border border-emerald-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>Send Inquiry to Helpdesk</span>
            </button>
          </form>

          {/* Interactive Map Representation */}
          <div className="pt-4 border-t border-emerald-100">
            <h4 className="font-bold text-sm text-emerald-950 font-serif mb-2">Campus Map Location</h4>
            <div className="bg-emerald-900 text-emerald-100 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-xs">
                <p className="font-bold text-white">Government Girls Degree College Nawabshah</p>
                <p className="text-[11px] text-emerald-300">Shaheed Benazirabad District, Sindh, Pakistan</p>
              </div>
              <a
                href="https://maps.google.com/?q=Nawabshah+Sindh"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg shrink-0 flex items-center gap-1"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open Google Maps</span>
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
