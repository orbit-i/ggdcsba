export type PageType = 
  | 'home' 
  | 'about' 
  | 'academics' 
  | 'fee-structure' 
  | 'facilities' 
  | 'staff' 
  | 'notifications' 
  | 'downloads' 
  | 'gallery' 
  | 'grievance' 
  | 'contact'
  | 'admin';

export interface SanctionedPost {
  id: string;
  designation: string;
  department: string;
  sanctionedQuota: number;
  qualificationRequired: string;
  role: string;
  status: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: 'Admissions' | 'Exams' | 'Notice' | 'Events' | 'Urgent';
  isNew?: boolean;
  fileUrl?: string;
  summary: string;
}

export interface FacilityItem {
  id: string;
  name: string;
  description: string;
  category: 'Academic' | 'Infrastructure' | 'Technology' | 'Sports & Culture' | 'Security & Amenities';
  iconName: string;
  highlight?: string;
  imageUrl?: string;
  features?: string[];
}

export interface ProgramItem {
  id: string;
  title: string;
  level: 'Intermediate (HSSC)' | 'Undergraduate (BS 4-Year)';
  duration: string;
  eligibility: string;
  seats: number;
  departments: string[];
  description: string;
}

export interface FeeItem {
  program: string;
  admissionFee: number;
  tuitionFeePerTerm: number;
  librarySecurityFee: number;
  sportsITFee: number;
  examFeePerTerm: number;
  totalFirstTerm: number;
  frequency: 'Annual' | 'Per Semester';
  notes?: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  category: 'Admission Forms' | 'Academic Policies' | 'Certificates & NOC' | 'Prospectus' | 'Challan';
  size: string;
  fileFormat: string;
  updatedDate: string;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Campus & Gardens' | 'Events & Sports' | 'Labs & Tech' | 'Auditorium' | 'Academics';
  imageUrl: string;
  date: string;
  caption: string;
  mediaType?: 'photo' | 'video';
}

export interface DepartmentStructure {
  id: string;
  name: string;
  hodTitle: string;
  hodMessage: string;
  sanctionedPosts: number;
  subjectsOffered: string[];
}

export interface UsefulLink {
  id: string;
  title: string;
  url: string;
  category: 'Government' | 'Board & Varsity' | 'Admission Portal' | 'Academic Resource';
}

export interface GrievanceTicket {
  ticketId: string;
  applicantName: string;
  cnicOrRoll: string;
  category: string;
  subject: string;
  details: string;
  status: 'Received' | 'Under Review' | 'Resolved';
  submittedAt: string;
}
