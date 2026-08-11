import React, { useState } from 'react';
import { ShieldCheck, Send, CheckCircle2, Search, FileText, Lock, MessageSquare, AlertCircle } from 'lucide-react';
import { useSiteData } from '../../context/DataContext';
import { GrievanceTicket } from '../../types';

export const GrievancePage: React.FC = () => {
  const { grievances, addGrievance } = useSiteData();
  const [formData, setFormData] = useState({
    applicantName: '',
    cnicOrRoll: '',
    phone: '',
    email: '',
    category: 'Academic & Faculty',
    subject: '',
    details: ''
  });

  const [submittedTicket, setSubmittedTicket] = useState<GrievanceTicket | null>(null);
  const [searchTicketId, setSearchTicketId] = useState<string>('');
  const [trackedTicket, setTrackedTicket] = useState<GrievanceTicket | null>(null);
  const [trackError, setTrackError] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `GRN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: GrievanceTicket = {
      ticketId: newId,
      applicantName: formData.applicantName,
      cnicOrRoll: formData.cnicOrRoll,
      category: formData.category,
      subject: formData.subject,
      details: formData.details,
      status: 'Received',
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };

    addGrievance(newTicket);
    setSubmittedTicket(newTicket);
    setFormData({
      applicantName: '',
      cnicOrRoll: '',
      phone: '',
      email: '',
      category: 'Academic & Faculty',
      subject: '',
      details: ''
    });
  };

  const handleTrackTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchTicketId.trim().toUpperCase();
    
    if (submittedTicket && submittedTicket.ticketId === cleanId) {
      setTrackedTicket(submittedTicket);
      setTrackError(false);
      return;
    }

    const found = grievances.find(t => t.ticketId.toUpperCase() === cleanId);
    if (found) {
      setTrackedTicket(found);
      setTrackError(false);
    } else {
      setTrackedTicket(null);
      setTrackError(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Title Header */}
      <div className="bg-emerald-900 text-white p-8 rounded-2xl shadow-md border-b-4 border-amber-400">
        <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4" />
          E-Governance Redressal System
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
          Grievance Redressal & Feedback Portal
        </h1>
        <p className="text-sm text-emerald-200 mt-1 max-w-3xl">
          Official digital complaint & inquiry system under Government of Sindh College Education Department directives.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Submit New Complaint / Grievance Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-6">
          <div className="border-b border-emerald-100 pb-4">
            <h2 className="text-xl font-bold font-serif text-emerald-950 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-700" />
              Submit Official Grievance or Feedback
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Every submission generates an official reference tracking ID monitored by the Principal's Office.
            </p>
          </div>

          {submittedTicket && (
            <div className="bg-emerald-800 text-white p-5 rounded-xl border border-emerald-600 shadow-md space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Grievance Registered Successfully!</span>
              </div>
              <p className="text-xs text-emerald-100">
                Your Tracking Reference ID: <strong className="text-amber-300 text-sm font-mono">{submittedTicket.ticketId}</strong>
              </p>
              <p className="text-[11px] text-emerald-200">
                Please save this reference number to track your resolution status.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name of Applicant *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Syeda Fatima"
                  value={formData.applicantName}
                  onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                  className="w-full bg-slate-50 border border-emerald-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">CNIC / Student Roll Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 44101-XXXXXXX-X or Roll No"
                  value={formData.cnicOrRoll}
                  onChange={(e) => setFormData({ ...formData, cnicOrRoll: e.target.value })}
                  className="w-full bg-slate-50 border border-emerald-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number (SMS Alert) *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0300-1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-emerald-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Grievance Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-50 border border-emerald-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Academic & Faculty">Academic & Faculty Matters</option>
                  <option value="Admission & Merit">Admission & Merit List Inquiry</option>
                  <option value="Fee & Scholarship">Fee Structure & Scholarship Claims</option>
                  <option value="Campus Facility & Labs">Campus Facility & IT Laboratories</option>
                  <option value="Security & Harassment">Security & Student Well-being</option>
                  <option value="General Inquiry">General Public Inquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Subject / Summary *</label>
              <input
                type="text"
                required
                placeholder="Brief title of your grievance..."
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-slate-50 border border-emerald-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Detailed Explanation *</label>
              <textarea
                rows={4}
                required
                placeholder="Provide complete facts and details regarding your complaint..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full bg-slate-50 border border-emerald-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>Register Official Grievance Ticket</span>
            </button>
          </form>
        </div>

        {/* Right: Ticket Tracking System & RTI Info */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Ticket Status Tracker Box */}
          <div className="bg-emerald-950 text-white p-6 rounded-2xl shadow-md space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Search className="w-4 h-4" />
              Real-time Ticket Status Check
            </div>

            <h3 className="font-serif font-bold text-lg text-white">
              Track Complaint Status
            </h3>

            <p className="text-xs text-emerald-200 leading-relaxed">
              Enter your Grievance Reference ID (e.g. GRN-2026-8812) to inspect the current review status by the college committee.
            </p>

            <form onSubmit={handleTrackTicket} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. GRN-2026-8812"
                  value={searchTicketId}
                  onChange={(e) => setSearchTicketId(e.target.value)}
                  className="w-full bg-emerald-900 border border-emerald-800 rounded-xl px-3 py-2 text-xs font-mono text-amber-300 uppercase placeholder:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl shrink-0 transition-colors"
                >
                  Track
                </button>
              </div>
            </form>

            {/* Display Search Result */}
            {trackedTicket && (
              <div className="bg-emerald-900 p-4 rounded-xl border border-emerald-800 space-y-2 text-xs animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-amber-300">{trackedTicket.ticketId}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    trackedTicket.status === 'Resolved' ? 'bg-emerald-600 text-white' : 'bg-amber-400 text-slate-950'
                  }`}>
                    {trackedTicket.status}
                  </span>
                </div>
                <p className="font-bold text-white">{trackedTicket.subject}</p>
                <p className="text-[11px] text-emerald-300">Applicant: {trackedTicket.applicantName} ({trackedTicket.category})</p>
                <p className="text-[10px] text-emerald-400">Date: {trackedTicket.submittedAt}</p>
              </div>
            )}

            {trackError && (
              <p className="text-xs text-amber-400 bg-emerald-900/80 p-3 rounded-lg border border-emerald-800">
                Ticket ID not found. Try testing sample ID: <strong>GRN-2026-8812</strong>
              </p>
            )}
          </div>

          {/* Right to Information (RTI) Officer Info */}
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl space-y-3">
            <h4 className="font-serif font-bold text-emerald-950 text-sm flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-700" />
              Right to Information (RTI) Officer
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Under Sindh Transparency and Right to Information Act, citizens can request official institutional records through the designated RTI Nodal Officer:
            </p>
            <div className="text-xs text-amber-950 font-semibold space-y-1 bg-amber-100/60 p-3 rounded-xl border border-amber-200">
              <p>• Officer: Vice Principal / RTI In-charge</p>
              <p>• Office Phone: 0244-9470174</p>
              <p>• Email: rti@ggdcnawabshah.edu.pk</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
