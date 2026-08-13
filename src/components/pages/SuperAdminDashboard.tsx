import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Settings, 
  Bell, 
  BookOpen, 
  Receipt, 
  Building2, 
  Download, 
  Image, 
  Users, 
  MessageSquare, 
  Database, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  FileText,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Search,
  Upload,
  Lock,
  LogOut,
  ExternalLink,
  Award
} from 'lucide-react';
import { useSiteData } from '../../context/DataContext';
import { supabase, isSupabaseConfigured, uploadMedia } from '../../lib/supabaseClient';
import { Announcement, FacilityItem, ProgramItem, FeeItem, DownloadItem, GalleryPhoto, DepartmentStructure, SanctionedPost, UsefulLink } from '../../types';

export const SuperAdminDashboard: React.FC = () => {
  const {
    collegeInfo,
    announcements,
    facilities,
    programs,
    feeStructure,
    departments,
    downloads,
    galleryPhotos,
    sanctionedPosts,
    grievances,
    usefulLinks,
    updateCollegeInfo,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    addFacility,
    updateFacility,
    deleteFacility,
    addProgram,
    updateProgram,
    deleteProgram,
    addFeeItem,
    updateFeeItem,
    deleteFeeItem,
    updateDepartment,
    addDownload,
    updateDownload,
    deleteDownload,
    addGalleryPhoto,
    updateGalleryPhoto,
    deleteGalleryPhoto,
    addSanctionedPost,
    updateSanctionedPost,
    deleteSanctionedPost,
    addUsefulLink,
    updateUsefulLink,
    deleteUsefulLink,
    updateGrievanceStatus,
    deleteGrievance,
    resetToDefaults,
    exportDataJSON,
    importDataJSON
  } = useSiteData();

  // Authentication state — uses real Supabase Auth when the backend is
  // connected. Falls back to a local demo passcode only when no backend
  // is configured yet (so the panel remains explorable before go-live).
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => sessionStorage.getItem('ggdcn_admin_auth') === 'true'
  );
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Keep session in sync with Supabase Auth (handles token refresh / logout elsewhere)
  React.useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setIsAuthenticated(true);
        sessionStorage.setItem('ggdcn_admin_auth', 'true');
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuthenticated(true);
        sessionStorage.setItem('ggdcn_admin_auth', 'true');
      } else {
        setIsAuthenticated(false);
        sessionStorage.removeItem('ggdcn_admin_auth');
      }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');

    if (isSupabaseConfigured && supabase) {
      setAuthLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password: passcode });
      setAuthLoading(false);
      if (error) {
        setPassError(error.message || 'Invalid email or password.');
        return;
      }
      setIsAuthenticated(true);
      sessionStorage.setItem('ggdcn_admin_auth', 'true');
      return;
    }

    // Demo-mode fallback (no backend connected yet)
    const storedPass = localStorage.getItem('ggdcn_admin_passcode') || 'ggdcn2026';
    if (passcode === storedPass || passcode === 'admin123' || passcode === 'ggdcn2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('ggdcn_admin_auth', 'true');
    } else {
      setPassError('Invalid Administrative Passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    sessionStorage.removeItem('ggdcn_admin_auth');
  };

  const [activeTab, setActiveTab] = useState<
    'info' | 'announcements' | 'programs' | 'fees' | 'facilities' | 'downloads' | 'gallery' | 'departments' | 'posts' | 'grievances' | 'backup'
  >('info');

  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  // State for adding new Announcement
  const [newNotice, setNewNotice] = useState<Omit<Announcement, 'id'>>({
    title: '',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
    category: 'Notice',
    isNew: true,
    summary: ''
  });

  // State for adding new Facility
  const [newFacility, setNewFacility] = useState<Omit<FacilityItem, 'id'>>({
    name: '',
    description: '',
    category: 'Academic',
    iconName: 'Building2',
    highlight: ''
  });

  // State for adding new Academic Program
  const [newProg, setNewProg] = useState<Omit<ProgramItem, 'id'>>({
    title: '',
    level: 'Undergraduate (BS 4-Year)',
    duration: '4 Years (8 Semesters)',
    eligibility: '',
    seats: 50,
    departments: ['Computer Science'],
    description: ''
  });

  // State for adding new Fee Item
  const [newFee, setNewFee] = useState<FeeItem>({
    program: '',
    admissionFee: 1500,
    tuitionFeePerTerm: 4000,
    librarySecurityFee: 1000,
    sportsITFee: 800,
    examFeePerTerm: 1200,
    totalFirstTerm: 8500,
    frequency: 'Per Semester',
    notes: 'Subsidized fee schedule'
  });

  // State for adding new Download Item
  const [newDownload, setNewDownload] = useState<Omit<DownloadItem, 'id'>>({
    title: '',
    category: 'Admission Forms',
    size: '1.2 MB',
    fileFormat: 'PDF',
    updatedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
    description: ''
  });

  // State for adding new Gallery Photo
  const [newPhoto, setNewPhoto] = useState<Omit<GalleryPhoto, 'id'>>({
    title: '',
    category: 'Campus & Gardens',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000',
    date: '2026',
    caption: '',
    mediaType: 'photo'
  });
  const [mediaUploading, setMediaUploading] = useState(false);
  const [mediaUploadError, setMediaUploadError] = useState('');

  // State for adding new Sanctioned Post
  const [newPost, setNewPost] = useState<Omit<SanctionedPost, 'id'>>({
    designation: '',
    department: 'Computer Science & IT',
    sanctionedQuota: 1,
    qualificationRequired: '',
    role: '',
    status: 'Active Position'
  });

  // JSON Import State
  const [importJsonInput, setImportJsonInput] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 p-6 sm:p-8 bg-white rounded-xl shadow-md border border-slate-200 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-[#0B6E31]">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-lg font-serif">Administrative Portal</h2>
            <p className="text-xs text-slate-500">Authorized Personnel Gateway</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {isSupabaseConfigured ? (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="principal@ggdcnawabshah.edu.pk"
                className="w-full border border-slate-300 rounded p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6E31]"
                required
                autoComplete="username"
              />
            </div>
          ) : (
            <div className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded p-2.5">
              Backend not connected yet — running in local demo mode. Data entered here will not be saved permanently until a Supabase project is connected (see README).
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {isSupabaseConfigured ? 'Password' : 'Passcode / PIN'}
            </label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder={isSupabaseConfigured ? 'Enter your password' : 'Enter PIN (default: ggdcn2026)'}
              className="w-full border border-slate-300 rounded p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6E31]"
              required
              autoComplete="current-password"
            />
          </div>

          {passError && (
            <p className="text-xs text-red-600 font-semibold bg-red-50 p-2 rounded border border-red-200">
              {passError}
            </p>
          )}

          <button
            type="submit"
            disabled={authLoading}
            className="w-full bg-[#0B6E31] hover:bg-emerald-800 text-white font-bold text-xs py-3 rounded transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{authLoading ? 'Verifying…' : 'Access Administrative CMS'}</span>
          </button>
        </form>

        <p className="text-[11px] text-slate-500 text-center border-t border-slate-100 pt-3">
          Managed by College Education Department, Government of Sindh.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed top-20 right-4 z-50 bg-[#0B6E31] text-white px-5 py-3 rounded-lg shadow-xl border border-white/20 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
          <span className="text-xs font-bold">{notificationMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#0B6E31] text-white p-6 sm:p-8 rounded-xl shadow-sm border border-emerald-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-white text-[#0B6E31] text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
              Superadmin CMS
            </span>
            <span className="text-xs text-emerald-100 font-medium">• Live Institutional Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif mt-2 text-white">
            Website Content & System Management
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-2xl">
            Edit and manage all site text, Principal's message, notices, programs, fee schedules, downloads, photos, and grievances directly.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to reset all site data to default official records?")) {
                resetToDefaults();
                showToast("All website content reset to default state!");
              }
            }}
            className="border border-white/30 hover:bg-white/10 text-white font-bold text-xs px-3.5 py-2 rounded transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Defaults</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="bg-white text-[#0B6E31] hover:bg-emerald-50 font-bold text-xs px-4 py-2 rounded transition-all flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Tab Controls Bar */}
      <div className="bg-white p-2 rounded-3xl border-2 border-[#006837]/10 shadow-sm flex items-center gap-1.5 overflow-x-auto">
        {[
          { id: 'info', label: 'College Profile', icon: Settings },
          { id: 'announcements', label: 'Notices & Circulars', icon: Bell },
          { id: 'programs', label: 'Academic Degrees', icon: BookOpen },
          { id: 'fees', label: 'Fee Schedule', icon: Receipt },
          { id: 'facilities', label: 'Facilities (15+)', icon: Building2 },
          { id: 'downloads', label: 'Downloads & Forms', icon: Download },
          { id: 'gallery', label: 'Photo Gallery', icon: Image },
          { id: 'departments', label: 'Departments & HODs', icon: Users },
          { id: 'posts', label: 'Staff Roster Posts', icon: FileText },
          { id: 'grievances', label: 'Grievance Desk', icon: MessageSquare },
          { id: 'backup', label: 'Backup / JSON', icon: Database }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-extrabold shrink-0 transition-all ${
                isActive
                  ? 'bg-[#006837] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-[#dcfce7] hover:text-[#006837]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: COLLEGE PROFILE INFO */}
      {activeTab === 'info' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#006837]/10 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black font-serif text-slate-900">General Institutional Metadata</h2>
              <p className="text-xs text-slate-500">Update official contact numbers, address, urdu title, and header logo links.</p>
            </div>
            <span className="bg-[#dcfce7] text-[#006837] text-xs font-black px-3 py-1 rounded-full uppercase">
              Live Synchronized
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">College Name (English)</label>
              <input
                type="text"
                value={collegeInfo.name}
                onChange={(e) => updateCollegeInfo({ name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006837]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">College Title (Urdu)</label>
              <input
                type="text"
                value={collegeInfo.urduName}
                onChange={(e) => updateCollegeInfo({ urduName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-xs font-bold text-slate-900 dir-rtl focus:outline-none focus:ring-2 focus:ring-[#006837]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">Short Identifier Code</label>
              <input
                type="text"
                value={collegeInfo.shortName}
                onChange={(e) => updateCollegeInfo({ shortName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006837]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-extrabold text-slate-700 mb-1">Official Address Location</label>
              <input
                type="text"
                value={collegeInfo.location}
                onChange={(e) => updateCollegeInfo({ location: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006837]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">Primary Phone Number</label>
              <input
                type="text"
                value={collegeInfo?.phones?.[0] || ''}
                onChange={(e) => {
                  const updatedPhones = [...(collegeInfo?.phones || ['0244-9470174', '0244-9470173'])];
                  updatedPhones[0] = e.target.value;
                  updateCollegeInfo({ phones: updatedPhones });
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-xs font-bold text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#006837]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">Secondary Phone Number</label>
              <input
                type="text"
                value={collegeInfo?.phones?.[1] || ''}
                onChange={(e) => {
                  const updatedPhones = [...(collegeInfo?.phones || ['0244-9470174', '0244-9470173'])];
                  updatedPhones[1] = e.target.value;
                  updateCollegeInfo({ phones: updatedPhones });
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-xs font-bold text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#006837]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">Official Public Email</label>
              <input
                type="email"
                value={collegeInfo.email}
                onChange={(e) => updateCollegeInfo({ email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006837]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">Principal Email</label>
              <input
                type="email"
                value={collegeInfo.principalEmail}
                onChange={(e) => updateCollegeInfo({ principalEmail: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006837]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">Official Facebook Page Link</label>
              <input
                type="text"
                value={collegeInfo.facebookUrl}
                onChange={(e) => updateCollegeInfo({ facebookUrl: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006837]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-extrabold text-slate-700 mb-1">Official Affiliation Statement</label>
              <input
                type="text"
                value={collegeInfo.affiliation}
                onChange={(e) => updateCollegeInfo({ affiliation: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006837]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-extrabold text-slate-700 mb-1">Governing Department</label>
              <input
                type="text"
                value={collegeInfo.department}
                onChange={(e) => updateCollegeInfo({ department: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006837]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">Working Hours Text</label>
              <input
                type="text"
                value={collegeInfo.workingHours}
                onChange={(e) => updateCollegeInfo({ workingHours: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006837]"
              />
            </div>

            {/* Principal Leadership & Message Editor */}
            <div className="sm:col-span-3 pt-4 border-t border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm font-serif mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#0B6E31]" />
                Principal Leadership & Homepage Message
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Principal Name</label>
                  <input
                    type="text"
                    value={collegeInfo.principalName}
                    onChange={(e) => updateCollegeInfo({ principalName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B6E31]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Principal Official Title</label>
                  <input
                    type="text"
                    value={collegeInfo.principalTitle}
                    onChange={(e) => updateCollegeInfo({ principalTitle: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B6E31]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Principal Photo Image URL</label>
                  <input
                    type="text"
                    value={collegeInfo.principalPhotoUrl}
                    onChange={(e) => updateCollegeInfo({ principalPhotoUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B6E31]"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Principal Headline Statement</label>
                  <input
                    type="text"
                    value={collegeInfo.principalQuote}
                    onChange={(e) => updateCollegeInfo({ principalQuote: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B6E31]"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Principal Detailed Message</label>
                  <textarea
                    rows={4}
                    value={collegeInfo.principalMessage}
                    onChange={(e) => updateCollegeInfo({ principalMessage: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B6E31]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              onClick={() => showToast("College Metadata Saved Successfully!")}
              className="bg-[#006837] hover:bg-[#004e28] text-white font-extrabold text-xs px-6 py-2.5 rounded-full shadow-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-amber-300" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: ANNOUNCEMENTS MANAGEMENT */}
      {activeTab === 'announcements' && (
        <div className="space-y-6">
          {/* Add New Notice Form */}
          <div className="bg-white rounded-3xl p-6 border-2 border-[#006837]/10 shadow-sm space-y-4">
            <h2 className="text-lg font-black font-serif text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#006837]" />
              Publish New Circular / Notice
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Notice Title</label>
                <input
                  type="text"
                  placeholder="e.g. BS Computer Science Midterm Exam Schedule 2026..."
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newNotice.category}
                  onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                >
                  <option value="Admissions">Admissions</option>
                  <option value="Exams">Exams</option>
                  <option value="Notice">Notice</option>
                  <option value="Events">Events</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Date String</label>
                <input
                  type="text"
                  value={newNotice.date}
                  onChange={(e) => setNewNotice({ ...newNotice, date: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-700 mb-1">Summary Description</label>
                <input
                  type="text"
                  placeholder="Detailed instructions for students..."
                  value={newNotice.summary}
                  onChange={(e) => setNewNotice({ ...newNotice, summary: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    if (!newNotice.title.trim()) return alert("Please enter notice title!");
                    addAnnouncement(newNotice);
                    setNewNotice({
                      title: '',
                      date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
                      category: 'Notice',
                      isNew: true,
                      summary: ''
                    });
                    showToast("Notice Published to Homepage & Portal!");
                  }}
                  className="w-full bg-[#006837] hover:bg-[#004e28] text-white font-black text-xs py-2.5 rounded-2xl shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>Publish Notice</span>
                </button>
              </div>
            </div>
          </div>

          {/* Existing Notices List */}
          <div className="bg-white rounded-3xl p-6 border-2 border-[#006837]/10 shadow-sm space-y-4">
            <h2 className="text-lg font-black font-serif text-slate-900">Active Published Circulars ({announcements.length})</h2>

            <div className="space-y-3">
              {announcements.map((item) => (
                <div key={item.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#006837] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full font-mono">
                        {item.id}
                      </span>
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-semibold">{item.date}</span>
                    </div>

                    <button
                      onClick={() => {
                        deleteAnnouncement(item.id);
                        showToast(`Notice ${item.id} Deleted`);
                      }}
                      className="text-red-600 hover:text-red-800 text-xs font-bold flex items-center gap-1 self-end sm:self-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateAnnouncement(item.id, { title: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-black text-slate-900"
                  />

                  <textarea
                    rows={2}
                    value={item.summary}
                    onChange={(e) => updateAnnouncement(item.id, { summary: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs text-slate-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ACADEMIC PROGRAM DEGREES */}
      {activeTab === 'programs' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border-2 border-[#006837]/10 shadow-sm space-y-4">
            <h2 className="text-lg font-black font-serif text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#006837]" />
              Add New Academic Degree Program
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Degree Title</label>
                <input
                  type="text"
                  placeholder="e.g. BS Software Engineering"
                  value={newProg.title}
                  onChange={(e) => setNewProg({ ...newProg, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Level</label>
                <select
                  value={newProg.level}
                  onChange={(e) => setNewProg({ ...newProg, level: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                >
                  <option value="Undergraduate (BS 4-Year)">Undergraduate (BS 4-Year)</option>
                  <option value="Intermediate (HSSC)">Intermediate (HSSC)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={newProg.duration}
                  onChange={(e) => setNewProg({ ...newProg, duration: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sanctioned Seats</label>
                <input
                  type="number"
                  value={newProg.seats}
                  onChange={(e) => setNewProg({ ...newProg, seats: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Eligibility Criteria</label>
                <input
                  type="text"
                  placeholder="e.g. HSSC Intermediate min 50% marks"
                  value={newProg.eligibility}
                  onChange={(e) => setNewProg({ ...newProg, eligibility: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-700 mb-1">Description & Overview</label>
                <input
                  type="text"
                  value={newProg.description}
                  onChange={(e) => setNewProg({ ...newProg, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (!newProg.title.trim()) return alert("Enter program title!");
                addProgram(newProg);
                setNewProg({
                  title: '',
                  level: 'Undergraduate (BS 4-Year)',
                  duration: '4 Years (8 Semesters)',
                  eligibility: '',
                  seats: 50,
                  departments: ['Computer Science'],
                  description: ''
                });
                showToast("Degree Program Added!");
              }}
              className="bg-[#006837] text-white font-extrabold text-xs px-5 py-2 rounded-full flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Add Degree Program</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-[#006837]/10 shadow-sm space-y-4">
            <h2 className="text-lg font-black font-serif text-slate-900">Manage Existing Programs ({programs.length})</h2>

            <div className="space-y-3">
              {programs.map((prog) => (
                <div key={prog.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-[#006837] font-mono">{prog.id}</span>
                    <button
                      onClick={() => {
                        deleteProgram(prog.id);
                        showToast("Program Deleted");
                      }}
                      className="text-red-600 font-bold text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={prog.title}
                      onChange={(e) => updateProgram(prog.id, { title: e.target.value })}
                      className="bg-white border border-slate-200 rounded-xl p-2 text-xs font-black text-slate-900"
                    />
                    <input
                      type="text"
                      value={prog.eligibility}
                      onChange={(e) => updateProgram(prog.id, { eligibility: e.target.value })}
                      className="bg-white border border-slate-200 rounded-xl p-2 text-xs text-slate-800"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FEE SCHEDULE MANAGEMENT */}
      {activeTab === 'fees' && (
        <div className="bg-white rounded-3xl p-6 border-2 border-[#006837]/10 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl font-black font-serif text-slate-900">Government Subsidized Fee Schedules</h2>
              <p className="text-xs text-slate-500">Edit tuition, admission fees, and first term totals directly.</p>
            </div>
            <button
              onClick={() => {
                addFeeItem(newFee);
                showToast("New Fee Schedule Row Added");
              }}
              className="bg-[#006837] text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Add Fee Row</span>
            </button>
          </div>

          <div className="space-y-4">
            {feeStructure.map((fee, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold text-[#006837]">Fee Schedule Item #{idx + 1}</span>
                  <button
                    onClick={() => {
                      deleteFeeItem(idx);
                      showToast("Fee Schedule Item Removed");
                    }}
                    className="text-red-600 text-xs font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-500">Program Title</label>
                    <input
                      type="text"
                      value={fee.program}
                      onChange={(e) => updateFeeItem(idx, { ...fee, program: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500">Admission Fee (Rs)</label>
                    <input
                      type="number"
                      value={fee.admissionFee}
                      onChange={(e) => updateFeeItem(idx, { ...fee, admissionFee: parseInt(e.target.value) || 0 })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500">Tuition Fee Per Term (Rs)</label>
                    <input
                      type="number"
                      value={fee.tuitionFeePerTerm}
                      onChange={(e) => updateFeeItem(idx, { ...fee, tuitionFeePerTerm: parseInt(e.target.value) || 0 })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500">Library Security (Rs)</label>
                    <input
                      type="number"
                      value={fee.librarySecurityFee}
                      onChange={(e) => updateFeeItem(idx, { ...fee, librarySecurityFee: parseInt(e.target.value) || 0 })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500">Sports & IT Fee (Rs)</label>
                    <input
                      type="number"
                      value={fee.sportsITFee}
                      onChange={(e) => updateFeeItem(idx, { ...fee, sportsITFee: parseInt(e.target.value) || 0 })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500">Exam Fee (Rs)</label>
                    <input
                      type="number"
                      value={fee.examFeePerTerm}
                      onChange={(e) => updateFeeItem(idx, { ...fee, examFeePerTerm: parseInt(e.target.value) || 0 })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500">Total 1st Term (Rs)</label>
                    <input
                      type="number"
                      value={fee.totalFirstTerm}
                      onChange={(e) => updateFeeItem(idx, { ...fee, totalFirstTerm: parseInt(e.target.value) || 0 })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-black text-[#006837]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: FACILITIES MANAGEMENT */}
      {activeTab === 'facilities' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border-2 border-[#006837]/10 shadow-sm space-y-4">
            <h2 className="text-lg font-black font-serif text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#006837]" />
              Add Campus Facility
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Facility Name</label>
                <input
                  type="text"
                  placeholder="e.g. Digital Robotics Lab"
                  value={newFacility.name}
                  onChange={(e) => setNewFacility({ ...newFacility, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newFacility.category}
                  onChange={(e) => setNewFacility({ ...newFacility, category: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                >
                  <option value="Academic">Academic</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Technology">Technology</option>
                  <option value="Sports & Culture">Sports & Culture</option>
                  <option value="Security & Amenities">Security & Amenities</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Highlight Badge</label>
                <input
                  type="text"
                  placeholder="e.g. High-Speed Access"
                  value={newFacility.highlight}
                  onChange={(e) => setNewFacility({ ...newFacility, highlight: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-700 mb-1">Facility Description</label>
                <input
                  type="text"
                  placeholder="Comprehensive description of equipment and access rules..."
                  value={newFacility.description}
                  onChange={(e) => setNewFacility({ ...newFacility, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (!newFacility.name.trim()) return alert("Enter facility name!");
                addFacility(newFacility);
                setNewFacility({
                  name: '',
                  description: '',
                  category: 'Academic',
                  iconName: 'Building2',
                  highlight: ''
                });
                showToast("Campus Facility Added!");
              }}
              className="bg-[#006837] text-white font-extrabold text-xs px-5 py-2 rounded-full flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Add Facility</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-[#006837]/10 shadow-sm space-y-4">
            <h2 className="text-lg font-black font-serif text-slate-900">Manage Campus Amenities ({facilities.length})</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {facilities.map((fac) => (
                <div key={fac.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold bg-[#dcfce7] text-[#006837] px-2 py-0.5 rounded-full">{fac.category}</span>
                    <button
                      onClick={() => {
                        deleteFacility(fac.id);
                        showToast("Facility Deleted");
                      }}
                      className="text-red-600 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={fac.name}
                    onChange={(e) => updateFacility(fac.id, { name: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-1.5 text-xs font-black text-slate-900"
                  />

                  <textarea
                    rows={2}
                    value={fac.description}
                    onChange={(e) => updateFacility(fac.id, { description: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-1.5 text-xs text-slate-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: DOWNLOADS & PROSPECTUS */}
      {activeTab === 'downloads' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border-2 border-[#006837]/10 shadow-sm space-y-4">
            <h2 className="text-lg font-black font-serif text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#006837]" />
              Add Downloadable Document / Form
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Document Title</label>
                <input
                  type="text"
                  placeholder="e.g. BS Computer Science Admission Form 2026..."
                  value={newDownload.title}
                  onChange={(e) => setNewDownload({ ...newDownload, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newDownload.category}
                  onChange={(e) => setNewDownload({ ...newDownload, category: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                >
                  <option value="Admission Forms">Admission Forms</option>
                  <option value="Academic Policies">Academic Policies</option>
                  <option value="Certificates & NOC">Certificates & NOC</option>
                  <option value="Prospectus">Prospectus</option>
                  <option value="Challan">Challan</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Brief details regarding instructions for filling..."
                  value={newDownload.description}
                  onChange={(e) => setNewDownload({ ...newDownload, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (!newDownload.title.trim()) return alert("Enter document title!");
                addDownload(newDownload);
                setNewDownload({
                  title: '',
                  category: 'Admission Forms',
                  size: '1.2 MB',
                  fileFormat: 'PDF',
                  updatedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
                  description: ''
                });
                showToast("Downloadable Form Added!");
              }}
              className="bg-[#006837] text-white font-extrabold text-xs px-5 py-2 rounded-full flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Add Document</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-[#006837]/10 shadow-sm space-y-4">
            <h2 className="text-lg font-black font-serif text-slate-900">Manage Download Files ({downloads.length})</h2>

            <div className="space-y-3">
              {downloads.map((dl) => (
                <div key={dl.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">{dl.category}</span>
                    <button
                      onClick={() => {
                        deleteDownload(dl.id);
                        showToast("Document Deleted");
                      }}
                      className="text-red-600 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    value={dl.title}
                    onChange={(e) => updateDownload(dl.id, { title: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-black text-slate-900"
                  />

                  <input
                    type="text"
                    value={dl.description}
                    onChange={(e) => updateDownload(dl.id, { description: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs text-slate-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: PHOTO GALLERY */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border-2 border-[#006837]/10 shadow-sm space-y-4">
            <h2 className="text-lg font-black font-serif text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#006837]" />
              Add Photo to Gallery
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Media Type</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setNewPhoto({ ...newPhoto, mediaType: 'photo' })}
                    className={`flex-1 text-xs font-bold py-2 rounded-2xl border ${newPhoto.mediaType !== 'video' ? 'bg-[#006837] text-white border-[#006837]' : 'bg-slate-50 text-slate-600 border-slate-200'}`}
                  >
                    Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewPhoto({ ...newPhoto, mediaType: 'video' })}
                    className={`flex-1 text-xs font-bold py-2 rounded-2xl border ${newPhoto.mediaType === 'video' ? 'bg-[#006837] text-white border-[#006837]' : 'bg-slate-50 text-slate-600 border-slate-200'}`}
                  >
                    Video
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Science Exhibition 2026..."
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newPhoto.category}
                  onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                >
                  <option value="Campus & Gardens">Campus & Gardens</option>
                  <option value="Events & Sports">Events & Sports</option>
                  <option value="Labs & Tech">Labs & Tech</option>
                  <option value="Auditorium">Auditorium</option>
                  <option value="Academics">Academics</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Upload {newPhoto.mediaType === 'video' ? 'Video' : 'Photo'} File {!isSupabaseConfigured && '(requires backend connection)'}
                </label>
                <input
                  type="file"
                  accept={newPhoto.mediaType === 'video' ? 'video/*' : 'image/*'}
                  disabled={!isSupabaseConfigured || mediaUploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setMediaUploadError('');
                    setMediaUploading(true);
                    try {
                      const url = await uploadMedia(file, newPhoto.mediaType === 'video' ? 'videos' : 'photos');
                      setNewPhoto(prev => ({ ...prev, imageUrl: url }));
                    } catch (err: any) {
                      setMediaUploadError(err.message || 'Upload failed.');
                    } finally {
                      setMediaUploading(false);
                    }
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900 disabled:opacity-50"
                />
                {mediaUploading && <p className="text-[10px] text-slate-500 mt-1">Uploading…</p>}
                {mediaUploadError && <p className="text-[10px] text-red-600 mt-1">{mediaUploadError}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {newPhoto.mediaType === 'video' ? 'Video URL' : 'Image URL'} (auto-filled after upload, or paste your own)
                </label>
                <input
                  type="text"
                  value={newPhoto.imageUrl}
                  onChange={(e) => setNewPhoto({ ...newPhoto, imageUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-700 mb-1">Caption / Details</label>
                <input
                  type="text"
                  placeholder="Description of event..."
                  value={newPhoto.caption}
                  onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (!newPhoto.title.trim()) return alert("Enter a title!");
                addGalleryPhoto(newPhoto);
                setNewPhoto({
                  title: '',
                  category: 'Campus & Gardens',
                  imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000',
                  date: '2026',
                  caption: '',
                  mediaType: 'photo'
                });
                showToast(newPhoto.mediaType === 'video' ? "Video Added to Gallery!" : "Gallery Photo Added!");
              }}
              className="bg-[#006837] text-white font-extrabold text-xs px-5 py-2 rounded-full flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Add {newPhoto.mediaType === 'video' ? 'Video' : 'Photo'}</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-[#006837]/10 shadow-sm space-y-4">
            <h2 className="text-lg font-black font-serif text-slate-900">Manage Gallery ({galleryPhotos.length})</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryPhotos.map((g) => (
                <div key={g.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="h-32 rounded-xl overflow-hidden bg-slate-200">
                    {g.mediaType === 'video' ? (
                      <video src={g.imageUrl} className="w-full h-full object-cover" controls muted />
                    ) : (
                      <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" />
                    )}
                  </div>

                  <input
                    type="text"
                    value={g.title}
                    onChange={(e) => updateGalleryPhoto(g.id, { title: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-1.5 text-xs font-black text-slate-900"
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-500 font-bold">{g.category}</span>
                    <button
                      onClick={() => {
                        deleteGalleryPhoto(g.id);
                        showToast("Photo Deleted");
                      }}
                      className="text-red-600 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: DEPARTMENTS & HOD MESSAGES */}
      {activeTab === 'departments' && (
        <div className="bg-white rounded-3xl p-6 border-2 border-[#006837]/10 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-black font-serif text-slate-900">Departmental Structure & HOD Messages</h2>
            <p className="text-xs text-slate-500">Edit department names, sanctioned posts, and HOD welcome messages.</p>
          </div>

          <div className="space-y-4">
            {departments.map((dept) => (
              <div key={dept.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-[#006837]">{dept.id}</span>
                  <span className="text-xs font-bold text-slate-500">{dept.sanctionedPosts} Posts</span>
                </div>

                <input
                  type="text"
                  value={dept.name}
                  onChange={(e) => updateDepartment(dept.id, { name: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-black text-slate-900"
                />

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">HOD Title & Welcome Message</label>
                  <textarea
                    rows={2}
                    value={dept.hodMessage}
                    onChange={(e) => updateDepartment(dept.id, { hodMessage: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs text-slate-800"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: STAFF ROSTER POSTS */}
      {activeTab === 'posts' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border-2 border-[#006837]/10 shadow-sm space-y-4">
            <h2 className="text-lg font-black font-serif text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#006837]" />
              Add Sanctioned Staff Designation
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Designation & Grade</label>
                <input
                  type="text"
                  placeholder="e.g. Associate Professor (BS-19)"
                  value={newPost.designation}
                  onChange={(e) => setNewPost({ ...newPost, designation: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  value={newPost.department}
                  onChange={(e) => setNewPost({ ...newPost, department: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sanctioned Quota Count</label>
                <input
                  type="number"
                  value={newPost.sanctionedQuota}
                  onChange={(e) => setNewPost({ ...newPost, sanctionedQuota: parseInt(e.target.value) || 1 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-700 mb-1">Role & Responsibilities</label>
                <input
                  type="text"
                  placeholder="Key responsibilities..."
                  value={newPost.role}
                  onChange={(e) => setNewPost({ ...newPost, role: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (!newPost.designation.trim()) return alert("Enter designation!");
                addSanctionedPost(newPost);
                setNewPost({
                  designation: '',
                  department: 'Computer Science & IT',
                  sanctionedQuota: 1,
                  qualificationRequired: '',
                  role: '',
                  status: 'Active Position'
                });
                showToast("Sanctioned Position Added!");
              }}
              className="bg-[#006837] text-white font-extrabold text-xs px-5 py-2 rounded-full flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Add Sanctioned Post</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-[#006837]/10 shadow-sm space-y-4">
            <h2 className="text-lg font-black font-serif text-slate-900">Manage Sanctioned Posts ({sanctionedPosts.length})</h2>

            <div className="space-y-3">
              {sanctionedPosts.map((sp) => (
                <div key={sp.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold bg-slate-200 px-2 py-0.5 rounded">{sp.id}</span>
                    <h3 className="text-xs font-extrabold text-slate-900">{sp.designation}</h3>
                    <p className="text-[11px] text-slate-600">{sp.department} • {sp.sanctionedQuota} Seat(s)</p>
                  </div>

                  <button
                    onClick={() => {
                      deleteSanctionedPost(sp.id);
                      showToast("Post Deleted");
                    }}
                    className="text-red-600 text-xs font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 10: STUDENT GRIEVANCE DESK */}
      {activeTab === 'grievances' && (
        <div className="bg-white rounded-3xl p-6 border-2 border-[#006837]/10 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black font-serif text-slate-900">Digital Grievance Ticket Management</h2>
              <p className="text-xs text-slate-500">Review student inquiries, track ticket statuses, and update resolution states.</p>
            </div>
            <span className="bg-[#006837] text-white text-xs font-black px-3 py-1 rounded-full font-mono">
              Total Tickets: {grievances.length}
            </span>
          </div>

          <div className="space-y-4">
            {grievances.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No student grievances currently pending.</p>
            ) : (
              grievances.map((g) => (
                <div key={g.ticketId} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#006837] text-amber-300 font-mono text-xs font-black px-2.5 py-0.5 rounded-full">
                        {g.ticketId}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{g.applicantName}</span>
                      <span className="text-[11px] text-slate-500 font-mono">({g.cnicOrRoll})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={g.status}
                        onChange={(e) => {
                          updateGrievanceStatus(g.ticketId, e.target.value as any);
                          showToast(`Ticket ${g.ticketId} Status Updated to ${e.target.value}`);
                        }}
                        className={`text-xs font-black px-3 py-1 rounded-full focus:outline-none ${
                          g.status === 'Resolved' 
                            ? 'bg-emerald-200 text-[#006837]' 
                            : g.status === 'Under Review' 
                            ? 'bg-amber-200 text-amber-900' 
                            : 'bg-blue-100 text-blue-900'
                        }`}
                      >
                        <option value="Received">Received</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Resolved">Resolved</option>
                      </select>

                      <button
                        onClick={() => {
                          deleteGrievance(g.ticketId);
                          showToast("Ticket Deleted");
                        }}
                        className="text-red-600 text-xs font-bold p-1 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black text-slate-900">{g.subject}</p>
                    <p className="text-xs text-slate-700 mt-1 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                      "{g.details}"
                    </p>
                  </div>

                  <p className="text-[10px] text-slate-400">Submitted: {g.submittedAt} • Category: {g.category}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 11: DATABASE BACKUP & JSON IMPORT/EXPORT */}
      {activeTab === 'backup' && (
        <div className="bg-white rounded-3xl p-6 border-2 border-[#006837]/10 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-black font-serif text-slate-900">Database Backup & Portability</h2>
            <p className="text-xs text-slate-500">Export the entire website configuration as a JSON snapshot or import a backup.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Export */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-black text-[#006837]">Export Website JSON Database</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Copy or download the complete state of notices, degree programs, fee schedules, gallery photos, and settings.
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(exportDataJSON());
                  showToast("Complete Website Database JSON copied to Clipboard!");
                }}
                className="bg-[#006837] hover:bg-[#004e28] text-white font-extrabold text-xs px-5 py-2.5 rounded-full flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>Copy Full Data JSON</span>
              </button>
            </div>

            {/* Import */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-black text-[#006837]">Import JSON Database Backup</h3>
              <textarea
                rows={3}
                placeholder="Paste JSON content here..."
                value={importJsonInput}
                onChange={(e) => setImportJsonInput(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-mono text-slate-800"
              />
              <button
                onClick={() => {
                  if (!importJsonInput.trim()) return alert("Please paste valid JSON string!");
                  const ok = importDataJSON(importJsonInput);
                  if (ok) {
                    showToast("Database Restored Successfully!");
                    setImportJsonInput('');
                  } else {
                    alert("Failed to parse JSON. Please verify syntax.");
                  }
                }}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sm"
              >
                <Upload className="w-4 h-4 text-slate-950" />
                <span>Restore From JSON</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
