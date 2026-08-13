import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Announcement, 
  FacilityItem, 
  ProgramItem, 
  FeeItem, 
  DownloadItem, 
  GalleryPhoto, 
  DepartmentStructure,
  GrievanceTicket,
  SanctionedPost,
  UsefulLink
} from '../types';
import { 
  COLLEGE_INFO, 
  ANNOUNCEMENTS, 
  FACILITIES, 
  ACADEMIC_PROGRAMS, 
  GRADUATION_FEE_STRUCTURE, 
  DEPARTMENTS, 
  DOWNLOADS, 
  GALLERY_PHOTOS,
  USEFUL_LINKS
} from '../data/collegeData';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const DEFAULT_SANCTIONED_POSTS: SanctionedPost[] = [
  {
    id: "POST-01",
    designation: "Principal (BS-20)",
    department: "College Administration",
    sanctionedQuota: 1,
    qualificationRequired: "M.Phil / Ph.D in Academic Subject",
    role: "Institutional Head & Academic Administrator",
    status: "Active Position"
  },
  {
    id: "POST-02",
    designation: "Vice Principal (BS-19)",
    department: "College Administration",
    sanctionedQuota: 1,
    qualificationRequired: "M.A / M.Sc with 15+ Years Service",
    role: "Academic Coordination & Discipline In-charge",
    status: "Active Position"
  },
  {
    id: "POST-03",
    designation: "Head of Department - Computer Science (BS-19/18)",
    department: "Computer Science & IT",
    sanctionedQuota: 1,
    qualificationRequired: "MS / M.Sc in Computer Science",
    role: "BS Computer Science Academic & Lab In-charge",
    status: "Active Position"
  },
  {
    id: "POST-04",
    designation: "Assistant Professors / Lecturers - Computer Science (BS-17/18)",
    department: "Computer Science & IT",
    sanctionedQuota: 4,
    qualificationRequired: "BS (4-Years) / M.Sc Computer Science",
    role: "Teaching Programming, DB, & Web Technologies",
    status: "Active Position"
  },
  {
    id: "POST-05",
    designation: "Head of Department - Chemistry (BS-19/18)",
    department: "Chemistry",
    sanctionedQuota: 1,
    qualificationRequired: "M.Phil / Ph.D in Chemistry",
    role: "Chemistry Lab Supervision & BS Degree In-charge",
    status: "Active Position"
  },
  {
    id: "POST-06",
    designation: "Lecturers - Chemistry (BS-17)",
    department: "Chemistry",
    sanctionedQuota: 5,
    qualificationRequired: "M.Sc Chemistry",
    role: "Theoretical & Organic Practical Instruction",
    status: "Active Position"
  },
  {
    id: "POST-07",
    designation: "Head of Department - Botany & Zoology (BS-19/18)",
    department: "Biological Sciences",
    sanctionedQuota: 2,
    qualificationRequired: "M.Sc / Ph.D in Botany / Zoology",
    role: "Pre-Medical & BS Biology In-charge",
    status: "Active Position"
  },
  {
    id: "POST-08",
    designation: "Head of Department - English (BS-19/18)",
    department: "English Literature",
    sanctionedQuota: 1,
    qualificationRequired: "M.A English / M.Phil Linguistics",
    role: "Functional English & BS Literature Head",
    status: "Active Position"
  },
  {
    id: "POST-09",
    designation: "Head of Department - Economics & Commerce (BS-19/18)",
    department: "Commerce & Humanities",
    sanctionedQuota: 1,
    qualificationRequired: "M.A Economics / M.Com",
    role: "I.Com & BS Economics Head",
    status: "Active Position"
  },
  {
    id: "POST-10",
    designation: "Librarian (BS-17)",
    department: "Library & Digital Resources",
    sanctionedQuota: 1,
    qualificationRequired: "M.LIS (Library & Info Science)",
    role: "Central & HEC Digital Library Manager",
    status: "Active Position"
  },
  {
    id: "POST-11",
    designation: "Director Physical Education / DPE (BS-17)",
    department: "Sports Directorate",
    sanctionedQuota: 1,
    qualificationRequired: "M.A Physical Education",
    role: "Inter-College Athletics & Games In-charge",
    status: "Active Position"
  },
  {
    id: "POST-12",
    designation: "Senior Clerk / Accounts Officer (BS-14)",
    department: "Accounts & Administration",
    sanctionedQuota: 2,
    qualificationRequired: "B.Com / B.A with Computer Certification",
    role: "Student Fee Collection & Salary Accounts",
    status: "Active Position"
  }
];

const DEFAULT_GRIEVANCES: GrievanceTicket[] = [
  {
    ticketId: "GRV-2026-8801",
    applicantName: "Fatima Zehra",
    cnicOrRoll: "44101-9876543-2",
    category: "Academic & Class Schedule",
    subject: "Request for Chemistry Lab Timings Adjustment",
    details: "Respectfully requested to align BS Chemistry 3rd semester lab hours with morning bus shuttle service.",
    status: "Under Review",
    submittedAt: "2026-08-08 10:15 AM"
  },
  {
    ticketId: "GRV-2026-8802",
    applicantName: "Ayesha Khan",
    cnicOrRoll: "44101-1234567-1",
    category: "Fee & Challan Verification",
    subject: "BS Computer Science Semester 1 Challan Verification",
    details: "Payment submitted at NBP College Road Branch on 02-Aug-2026. Requesting clearance confirmation.",
    status: "Resolved",
    submittedAt: "2026-08-05 02:30 PM"
  }
];

export interface DataContextType {
  collegeInfo: typeof COLLEGE_INFO;
  announcements: Announcement[];
  facilities: FacilityItem[];
  programs: ProgramItem[];
  feeStructure: FeeItem[];
  departments: DepartmentStructure[];
  downloads: DownloadItem[];
  galleryPhotos: GalleryPhoto[];
  sanctionedPosts: SanctionedPost[];
  grievances: GrievanceTicket[];
  usefulLinks: UsefulLink[];

  // Actions
  updateCollegeInfo: (info: Partial<typeof COLLEGE_INFO>) => void;

  addAnnouncement: (item: Omit<Announcement, 'id'>) => void;
  updateAnnouncement: (id: string, item: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;

  addFacility: (item: Omit<FacilityItem, 'id'>) => void;
  updateFacility: (id: string, item: Partial<FacilityItem>) => void;
  deleteFacility: (id: string) => void;

  addProgram: (item: Omit<ProgramItem, 'id'>) => void;
  updateProgram: (id: string, item: Partial<ProgramItem>) => void;
  deleteProgram: (id: string) => void;

  addFeeItem: (item: FeeItem) => void;
  updateFeeItem: (index: number, item: FeeItem) => void;
  deleteFeeItem: (index: number) => void;

  updateDepartment: (id: string, item: Partial<DepartmentStructure>) => void;

  addDownload: (item: Omit<DownloadItem, 'id'>) => void;
  updateDownload: (id: string, item: Partial<DownloadItem>) => void;
  deleteDownload: (id: string) => void;

  addGalleryPhoto: (item: Omit<GalleryPhoto, 'id'>) => void;
  updateGalleryPhoto: (id: string, item: Partial<GalleryPhoto>) => void;
  deleteGalleryPhoto: (id: string) => void;

  addSanctionedPost: (item: Omit<SanctionedPost, 'id'>) => void;
  updateSanctionedPost: (id: string, item: Partial<SanctionedPost>) => void;
  deleteSanctionedPost: (id: string) => void;

  addUsefulLink: (item: Omit<UsefulLink, 'id'>) => void;
  updateUsefulLink: (id: string, item: Partial<UsefulLink>) => void;
  deleteUsefulLink: (id: string) => void;

  addGrievance: (item: Omit<GrievanceTicket, 'ticketId' | 'submittedAt' | 'status'>) => string;
  updateGrievanceStatus: (ticketId: string, status: 'Received' | 'Under Review' | 'Resolved') => void;
  deleteGrievance: (ticketId: string) => void;

  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'ggdcn_website_data_v2';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collegeInfo, setCollegeInfo] = useState<typeof COLLEGE_INFO>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.collegeInfo) return { ...COLLEGE_INFO, ...parsed.collegeInfo };
      }
    } catch (e) {
      console.error("Failed loading from localStorage", e);
    }
    return COLLEGE_INFO;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.announcements)) return parsed.announcements;
      }
    } catch (e) {}
    return ANNOUNCEMENTS;
  });

  const [facilities, setFacilities] = useState<FacilityItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.facilities)) return parsed.facilities;
      }
    } catch (e) {}
    return FACILITIES;
  });

  const [programs, setPrograms] = useState<ProgramItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.programs)) return parsed.programs;
      }
    } catch (e) {}
    return ACADEMIC_PROGRAMS;
  });

  const [feeStructure, setFeeStructure] = useState<FeeItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.feeStructure)) return parsed.feeStructure;
      }
    } catch (e) {}
    return GRADUATION_FEE_STRUCTURE;
  });

  const [departments, setDepartments] = useState<DepartmentStructure[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.departments)) return parsed.departments;
      }
    } catch (e) {}
    return DEPARTMENTS;
  });

  const [downloads, setDownloads] = useState<DownloadItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.downloads)) return parsed.downloads;
      }
    } catch (e) {}
    return DOWNLOADS;
  });

  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.galleryPhotos)) return parsed.galleryPhotos;
      }
    } catch (e) {}
    return GALLERY_PHOTOS;
  });

  const [sanctionedPosts, setSanctionedPosts] = useState<SanctionedPost[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.sanctionedPosts)) return parsed.sanctionedPosts;
      }
    } catch (e) {}
    return DEFAULT_SANCTIONED_POSTS;
  });

  const [grievances, setGrievances] = useState<GrievanceTicket[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.grievances)) return parsed.grievances;
      }
    } catch (e) {}
    return DEFAULT_GRIEVANCES;
  });

  const [usefulLinks, setUsefulLinks] = useState<UsefulLink[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.usefulLinks)) return parsed.usefulLinks;
      }
    } catch (e) {}
    return USEFUL_LINKS;
  });

  // Save to localStorage on any state update
  useEffect(() => {
    try {
      const stateToSave = {
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
        usefulLinks
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Failed saving to localStorage", e);
    }
  }, [
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
    usefulLinks
  ]);

  // Actions
  const updateCollegeInfo = (info: Partial<typeof COLLEGE_INFO>) => {
    setCollegeInfo(prev => ({ ...prev, ...info }));
  };

  // --- Supabase sync: on load, pull real data from the database if the site
  // owner has connected one. If not connected, the site keeps running on the
  // bundled static/local data below with zero errors.
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    (async () => {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('published_date', { ascending: false });
      if (!error && data) {
        setAnnouncements(
          data.map((n: any) => ({
            id: n.id,
            title: n.title,
            date: new Date(n.published_date).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
            category: n.category,
            isNew: n.is_new,
            fileUrl: n.file_url || undefined,
            summary: n.summary,
          }))
        );
      }
    })();

    (async () => {
      const { data, error } = await supabase
        .from('gallery_media')
        .select('*')
        .order('media_date', { ascending: false });
      if (!error && data) {
        setGalleryPhotos(
          data.map((g: any) => ({
            id: g.id,
            title: g.title,
            category: g.category,
            imageUrl: g.media_url,
            date: new Date(g.media_date).getFullYear().toString(),
            caption: g.caption || '',
            mediaType: g.media_type,
          }))
        );
      }
    })();
  }, []);

  const addAnnouncement = (item: Omit<Announcement, 'id'>) => {
    const newId = `N-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    setAnnouncements(prev => [{ id: newId, ...item }, ...prev]);

    if (isSupabaseConfigured && supabase) {
      (async () => {
        const { data, error } = await supabase
          .from('notices')
          .insert({
            title: item.title,
            category: item.category,
            summary: item.summary,
            file_url: item.fileUrl || null,
            is_new: item.isNew ?? true,
          })
          .select()
          .single();
        if (!error && data) {
          // Replace the optimistic local id with the real database id
          setAnnouncements(prev => prev.map(a => a.id === newId ? { ...a, id: data.id } : a));
        }
      })();
    }
  };

  const updateAnnouncement = (id: string, item: Partial<Announcement>) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, ...item } : a));

    if (isSupabaseConfigured && supabase) {
      const payload: Record<string, any> = {};
      if (item.title !== undefined) payload.title = item.title;
      if (item.category !== undefined) payload.category = item.category;
      if (item.summary !== undefined) payload.summary = item.summary;
      if (item.fileUrl !== undefined) payload.file_url = item.fileUrl;
      if (item.isNew !== undefined) payload.is_new = item.isNew;
      if (Object.keys(payload).length > 0) {
        supabase.from('notices').update(payload).eq('id', id).then(() => {});
      }
    }
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));

    if (isSupabaseConfigured && supabase) {
      supabase.from('notices').delete().eq('id', id).then(() => {});
    }
  };

  const addFacility = (item: Omit<FacilityItem, 'id'>) => {
    const newId = `fac-${Date.now()}`;
    setFacilities(prev => [...prev, { id: newId, ...item }]);
  };

  const updateFacility = (id: string, item: Partial<FacilityItem>) => {
    setFacilities(prev => prev.map(f => f.id === id ? { ...f, ...item } : f));
  };

  const deleteFacility = (id: string) => {
    setFacilities(prev => prev.filter(f => f.id !== id));
  };

  const addProgram = (item: Omit<ProgramItem, 'id'>) => {
    const newId = `prog-${Date.now()}`;
    setPrograms(prev => [...prev, { id: newId, ...item }]);
  };

  const updateProgram = (id: string, item: Partial<ProgramItem>) => {
    setPrograms(prev => prev.map(p => p.id === id ? { ...p, ...item } : p));
  };

  const deleteProgram = (id: string) => {
    setPrograms(prev => prev.filter(p => p.id !== id));
  };

  const addFeeItem = (item: FeeItem) => {
    setFeeStructure(prev => [...prev, item]);
  };

  const updateFeeItem = (index: number, item: FeeItem) => {
    setFeeStructure(prev => prev.map((f, i) => i === index ? item : f));
  };

  const deleteFeeItem = (index: number) => {
    setFeeStructure(prev => prev.filter((_, i) => i !== index));
  };

  const updateDepartment = (id: string, item: Partial<DepartmentStructure>) => {
    setDepartments(prev => prev.map(d => d.id === id ? { ...d, ...item } : d));
  };

  const addDownload = (item: Omit<DownloadItem, 'id'>) => {
    const newId = `dl-${Date.now()}`;
    setDownloads(prev => [...prev, { id: newId, ...item }]);
  };

  const updateDownload = (id: string, item: Partial<DownloadItem>) => {
    setDownloads(prev => prev.map(d => d.id === id ? { ...d, ...item } : d));
  };

  const deleteDownload = (id: string) => {
    setDownloads(prev => prev.filter(d => d.id !== id));
  };

  const addGalleryPhoto = (item: Omit<GalleryPhoto, 'id'>) => {
    const newId = `g-${Date.now()}`;
    setGalleryPhotos(prev => [...prev, { id: newId, ...item }]);

    if (isSupabaseConfigured && supabase) {
      (async () => {
        const { data, error } = await supabase
          .from('gallery_media')
          .insert({
            title: item.title,
            category: item.category,
            media_url: item.imageUrl,
            caption: item.caption,
            media_type: item.mediaType || 'photo',
          })
          .select()
          .single();
        if (!error && data) {
          setGalleryPhotos(prev => prev.map(g => g.id === newId ? { ...g, id: data.id } : g));
        }
      })();
    }
  };

  const updateGalleryPhoto = (id: string, item: Partial<GalleryPhoto>) => {
    setGalleryPhotos(prev => prev.map(g => g.id === id ? { ...g, ...item } : g));

    if (isSupabaseConfigured && supabase) {
      const payload: Record<string, any> = {};
      if (item.title !== undefined) payload.title = item.title;
      if (item.category !== undefined) payload.category = item.category;
      if (item.imageUrl !== undefined) payload.media_url = item.imageUrl;
      if (item.caption !== undefined) payload.caption = item.caption;
      if (item.mediaType !== undefined) payload.media_type = item.mediaType;
      if (Object.keys(payload).length > 0) {
        supabase.from('gallery_media').update(payload).eq('id', id).then(() => {});
      }
    }
  };

  const deleteGalleryPhoto = (id: string) => {
    setGalleryPhotos(prev => prev.filter(g => g.id !== id));

    if (isSupabaseConfigured && supabase) {
      supabase.from('gallery_media').delete().eq('id', id).then(() => {});
    }
  };

  const addSanctionedPost = (item: Omit<SanctionedPost, 'id'>) => {
    const newId = `POST-${Math.floor(10 + Math.random() * 90)}`;
    setSanctionedPosts(prev => [...prev, { id: newId, ...item }]);
  };

  const updateSanctionedPost = (id: string, item: Partial<SanctionedPost>) => {
    setSanctionedPosts(prev => prev.map(sp => sp.id === id ? { ...sp, ...item } : sp));
  };

  const deleteSanctionedPost = (id: string) => {
    setSanctionedPosts(prev => prev.filter(sp => sp.id !== id));
  };

  const addGrievance = (item: Omit<GrievanceTicket, 'ticketId' | 'submittedAt' | 'status'>) => {
    const ticketId = `GRV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newTicket: GrievanceTicket = {
      ticketId,
      ...item,
      status: 'Received',
      submittedAt: formattedDate
    };
    setGrievances(prev => [newTicket, ...prev]);
    return ticketId;
  };

  const updateGrievanceStatus = (ticketId: string, status: 'Received' | 'Under Review' | 'Resolved') => {
    setGrievances(prev => prev.map(g => g.ticketId === ticketId ? { ...g, status } : g));
  };

  const deleteGrievance = (ticketId: string) => {
    setGrievances(prev => prev.filter(g => g.ticketId !== ticketId));
  };

  const addUsefulLink = (item: Omit<UsefulLink, 'id'>) => {
    const newId = `ul-${Date.now()}`;
    setUsefulLinks(prev => [...prev, { id: newId, ...item }]);
  };

  const updateUsefulLink = (id: string, item: Partial<UsefulLink>) => {
    setUsefulLinks(prev => prev.map(u => u.id === id ? { ...u, ...item } : u));
  };

  const deleteUsefulLink = (id: string) => {
    setUsefulLinks(prev => prev.filter(u => u.id !== id));
  };

  const resetToDefaults = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setCollegeInfo(COLLEGE_INFO);
    setAnnouncements(ANNOUNCEMENTS);
    setFacilities(FACILITIES);
    setPrograms(ACADEMIC_PROGRAMS);
    setFeeStructure(GRADUATION_FEE_STRUCTURE);
    setDepartments(DEPARTMENTS);
    setDownloads(DOWNLOADS);
    setGalleryPhotos(GALLERY_PHOTOS);
    setSanctionedPosts(DEFAULT_SANCTIONED_POSTS);
    setGrievances(DEFAULT_GRIEVANCES);
    setUsefulLinks(USEFUL_LINKS);
  };

  const exportDataJSON = () => {
    return JSON.stringify({
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
      usefulLinks
    }, null, 2);
  };

  const importDataJSON = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.collegeInfo) setCollegeInfo(parsed.collegeInfo);
      if (parsed.announcements) setAnnouncements(parsed.announcements);
      if (parsed.facilities) setFacilities(parsed.facilities);
      if (parsed.programs) setPrograms(parsed.programs);
      if (parsed.feeStructure) setFeeStructure(parsed.feeStructure);
      if (parsed.departments) setDepartments(parsed.departments);
      if (parsed.downloads) setDownloads(parsed.downloads);
      if (parsed.galleryPhotos) setGalleryPhotos(parsed.galleryPhotos);
      if (parsed.sanctionedPosts) setSanctionedPosts(parsed.sanctionedPosts);
      if (parsed.grievances) setGrievances(parsed.grievances);
      if (parsed.usefulLinks) setUsefulLinks(parsed.usefulLinks);
      return true;
    } catch (e) {
      console.error("Invalid JSON format", e);
      return false;
    }
  };

  return (
    <DataContext.Provider value={{
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
      addGrievance,
      updateGrievanceStatus,
      deleteGrievance,
      resetToDefaults,
      exportDataJSON,
      importDataJSON
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a DataProvider');
  }
  return context;
};
