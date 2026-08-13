import { 
  Announcement, 
  FacilityItem, 
  ProgramItem, 
  FeeItem, 
  DownloadItem, 
  GalleryPhoto, 
  DepartmentStructure 
} from '../types';

export const COLLEGE_INFO = {
  name: "Government Girls Degree College Nawabshah",
  fullName: "Government Girls Degree College Nawabshah, Sindh, Pakistan",
  urduName: "",
  shortName: "GGDCN",
  established: 1966,
  location: "Hospital Road / College Road, Nawabshah, District Shaheed Benazirabad, Sindh, Pakistan",
  address: "District Shaheed Benazirabad, Sindh, Pakistan",
  phones: ["0244-9470174", "0244-9470173"],
  phonePrimary: "0244-9470174",
  phoneSecondary: "0244-9470173",
  email: "info@ggdcnawabshah.edu.pk",
  principalEmail: "principal@ggdcnawabshah.edu.pk",
  facebookUrl: "https://www.facebook.com/share/1JbrdXcJ5u/",
  affiliation: "Affiliated with Board of Intermediate & Secondary Education (BISE) Shaheed Benazirabad & Shaheed Benazir Bhutto University Shaheed Benazirabad / SBBU SBA",
  department: "College Education Department, Government of Sindh",
  workingHours: "Monday to Saturday: 08:00 AM – 02:00 PM (Friday: 08:00 AM – 12:30 PM)",
  logoUrl: "/images/college_official_logo.png",
  heroCampusUrl: "/images/campus_main_2026.jpg",
  libraryUrl: "/images/Library.jpeg",
  
  // Principal's Message Section


  
// Principal's Message Section
  principalName: "Prof. Nasreen Wagan",
  principalTitle: "Principal & Institutional Head",
  principalPhotoUrl: "/images/principle.jpg",
  principalMessage: "The principle of Government Girls Degree College Nawabshah is overjoyed to welcome the young masons of the Nation to a never failing stream of learning as The institution ever since its creation in 1966 is true to its commitment to the highest standard of all-inclusive and wide ranging education. The fair prestige of the college manifests itself in its achievements and its contribution to the nation building by producing responsible individuals who prove to be assets for our society. The college has no compromise on curriculum; it has been a symbol of success and pride for our youth as it offers multi-dimensional opportunities to students to find out their real genius and to make it known to the world. The institution is big name of satisfaction to the students and parents alike as it has awe inspiring qualities of discipline, great administration and security with Matchless standards of conducive learning environment. The teachers are highly qualified and dedicated too, who develop a positive teacher-student communication which makes this college highly esteemed place of learning desirable for everyone.",
  principalQuote: "Empowering Women Through Quality Higher Education, Leadership & Character Excellence.",

  // Regional Director's Message Section (placeholder — awaiting name, photo, and message text from college administration)
  regionalDirectorName: "Prof. Lala Rukh Baloch ",
  regionalDirectorTitle: "Regional Director, Colleges, (BS-20), Shaheed Benazirabad Region",
  regionalDirectorPhotoUrl: "/images/Regional_Director.jpeg",
  regionalDirectorMessage: "Girls’ education is the foundation of an educated, empowered, and progressive society. I am pleased to acknowledge the role of Government Girls Degree College, Nawabshah in providing young women with quality education and opportunities to achieve their academic and professional aspirations.I encourage our students to pursue knowledge with dedication, confidence, and a spirit of excellence. Education empowers girls to become capable, independent, and responsible citizens who can contribute meaningfully to society and the development of our nation. I appreciate the dedicated efforts of the faculty and administration in promoting quality education and creating a supportive academic environment for our students.I wish all our students continued success and a bright future."

};

export interface HeadOfDepartment {
  id: string;
  name: string;
  designation: string;
  department: string;
}

export const HODS_LIST: HeadOfDepartment[] = [
  { id: 'hod-1', name: 'Prof. Khadija Jamali', designation: 'Assistant Professor', department: 'Commerce Department' },
  { id: 'hod-2', name: 'Prof. Shazia Muzaffar', designation: 'Associate Professor', department: 'Chemistry Department' },
  { id: 'hod-3', name: 'Prof. Lubna Jamali', designation: 'Associate Professor', department: 'Computer Science' },
  { id: 'hod-4', name: 'Prof. Dr. Qurat-Ul-Ain', designation: 'Assistant Professor', department: 'Economics Department' },
  { id: 'hod-5', name: 'Prof. Yasmeen Channar', designation: 'Assistant Professor', department: 'Islamic Culture Department' },
  { id: 'hod-6', name: 'Prof. Hameeda Sehto', designation: 'Associate Professor', department: 'Botany Department' },
  { id: 'hod-7', name: 'Prof. Saima Parveen', designation: 'Assistant Professor', department: 'Geography Department' },
  { id: 'hod-8', name: 'Prof. Shazia Dilber', designation: 'Associate Professor', department: 'Urdu Department' },
  { id: 'hod-9', name: 'Prof. Asmat Bano', designation: 'Assistant Professor', department: 'Zoology Department' },
  { id: 'hod-10', name: 'Prof. Ambreen Fatima', designation: 'Associate Professor', department: 'Physics Department' },
  { id: 'hod-11', name: 'Prof. Rukhsana', designation: 'Assistant Professor', department: 'Mathematics Department' },
  { id: 'hod-12', name: 'Prof. Saima Jamali', designation: 'Assistant Professor', department: 'English Department' },
  { id: 'hod-13', name: 'Prof. Salma Jatt', designation: 'Assistant Professor', department: 'Sociology Department' },
  { id: 'hod-14', name: 'Prof. Shaista Jamali', designation: 'Lecturer', department: 'Pakistan Studies' },
  { id: 'hod-15', name: 'Prof. Shaheen Shah', designation: 'Assistant Professor', department: 'Sindhi Department' },
  { id: 'hod-16', name: 'Prof. Qurat-Ul-Ain', designation: 'Lecturer', department: 'Islamiyat Department' },
  { id: 'hod-17', name: 'Prof. Shazia Lund Balouch', designation: 'Assistant Professor', department: 'Political Science Department' },
];

export interface UsefulLink {
  id: string;
  title: string;
  url: string;
  category: 'Government' | 'Board & Varsity' | 'Admission Portal' | 'Academic Resource';
}

export const USEFUL_LINKS: UsefulLink[] = [
  { id: 'ul-1', title: 'College Education Department, Govt of Sindh', url: 'https://college.sindh.gov.pk/', category: 'Government' },
  { id: 'ul-2', title: 'BISE Shaheed Benazirabad (Board of Intermediate)', url: 'https://bisesba.edu.pk/', category: 'Board & Varsity' },
  { id: 'ul-3', title: 'SECCAP Online Admission Portal Sindh', url: 'https://seccap.dgcs.gos.pk/', category: 'Admission Portal' },
  { id: 'ul-4', title: 'Higher Education Commission (HEC) Pakistan', url: 'https://www.hec.gov.pk/', category: 'Academic Resource' },
  { id: 'ul-5', title: 'Government of Sindh Official Portal', url: 'https://sindh.gov.pk/', category: 'Government' }
];

export const ANNOUNCEMENTS: Announcement[] = [
 /* {
   // id: "N-2026-001",
   // title: "Admissions Open for BS 4-Year Graduation Programs under Sindh Online Admission System",
   // date: "Session 2025-2026",
   // category: "Admissions",
   // isNew: true,
   // summary: "Applications are invited for BS Computer Science, BS English, BS Chemistry, BS Botany, BS Zoology, and BS Economics. Apply online via SECCAP portal or submit form at admission desk."
  },
  {
   // id: "N-2026-002",
   // title: "HSSC Intermediate Part-I & Part-II Annual Examination Date Sheet Published by BISE Shaheed Benazirabad",
   // date: "Current Session",
   // category: "Exams",
   // isNew: true,
   // summary: "Students must collect their official Admit Cards from the college dispatch room after clearing dues."
  },
  {
    //id: "N-2026-003",
   // title: "Government Merit Scholarship Notification for Underprivileged & Top Performing Female Students",
   // date: "Academic Year 2025-26",
//    category: "Notice",
   // isNew: false,
  //  summary: "Government of Sindh College Education Department scholarship application deadline is extended."
  },
  {
    // id: "N-2026-004",
   // title: "E-Governance Portal & Digital Grievance Redressal System Active for Students & Guardians",
   // date: "Active Circular",
   // category: "Notice",
   // isNew: false,
   // summary: "Direct submission of feedback, inquiries, and grievances with automated tracking ID numbers."
  } */
];

export const FACILITIES: FacilityItem[] = [
  {
    id: "fac-1",
    name: "Central Library",
    description: "Equipped with thousands of textbooks, references, academic journals, encyclopedias, and quiet reading areas.",
    category: "Academic",
    iconName: "BookOpen",
    highlight: "15,000+ Academic Volumes",
    imageUrl: "/images/Library.jpeg",
   /* features: [
      "Over 15,000 physical textbooks and references for Science, Arts, Commerce & BS degrees",
      "Quiet, climate-controlled reading hall with comfortable seating for 150+ students",
      "Subscribed daily national newspapers, research journals, and academic periodicals",
      "Digital cataloguing system for rapid book search, issue, and automated return tracking",
      "Dedicated reference desk and librarian guidance for research and project work"
     ] */
  },
  {
    id: "fac-2",
    name: "Digital Library",
    description: "High-speed internet terminals connected to HEC Digital Library resources, research papers, and e-books.",
    category: "Technology",
    iconName: "Laptop",
    highlight: "Free HEC E-Resource Access",
    imageUrl: "/images/Digital_library.jpeg",
   /* features: [
      "High-speed optical fiber internet computer terminals for student research",
      "Digital lecture archives and online course material downloading center",
      "High-capacity printing and scanning services for academic project submissions"
     ] */
  },
  {
    id: "fac-3",
    name: "Well Furnished Staff Rooms",
    description: "Spacious and comfortable departmental staff rooms for faculty meetings, research, and academic counseling.",
    category: "Infrastructure",
    iconName: "Users",
    highlight: "Departmental Lounges",
    imageUrl: "Staffroom.jpeg",
   /* features: [
      "Dedicated departmental staff rooms for Science, Humanities, Commerce & IT faculty",
      "Ergonomic seating and private workstations for lesson preparation and paper grading",
      "Individual student-faculty counseling desks for academic mentoring",
      "High-speed Wi-Fi network and desktop terminals for faculty administrative tasks"
    ]  */
  },
  {
    id: "fac-4",
    name: "Soft Boards / Smart Boards",
    description: "Classrooms equipped with modern interactive soft boards and visual aids for effective multimedia teaching.",
    category: "Technology",
    iconName: "Tv",
    highlight: "Interactive Teaching Aids",
    imageUrl: "Smart_board.jpeg",
    /*features: [
      "Interactive smart projectors and digital whiteboards in BS degree lecture halls",
      "High-resolution visual multimedia aids for complex scientific diagrams and presentations",
      "Departmental soft display boards for student poster exhibitions and academic notices",
      "Audio-visual learning tools designed to enhance conceptual retention"
    ] */
  },
  {
    id: "fac-5",
    name: "Wi-Fi Connectivity",
    description: "Campus-wide fiber-optic Wi-Fi network for academic research, digital submission, and online learning.",
    category: "Technology",
    iconName: "Wifi",
    highlight: "High-Speed Campus Network",
    imageUrl: "Wifi.jpeg",
   /* features: [
      "Optical fiber internet backbone offering high-speed connectivity across campus",
      "Secure student credential login for safe educational browsing",
      "Full coverage across Central Library, Computer Labs, Auditorium, and Staff Lounges",
      "24/7 network monitoring guaranteeing reliable uptime for e-learning"
    ]   */
  },
  {
    id: "fac-8",
    name: "Physics Laboratory",
    description: "Fully equipped Physics practical laboratory with apparatus for mechanics, optics, and electronics experiments.",
    category: "Academic",
    iconName: "FlaskConical",
    highlight: "Fully Equipped Practical Lab",
    imageUrl: "/images/physics_lab.jpg",
    /* features: [
      "Dedicated practical workstations for HSSC and BS Physics experiments",
      "Calibrated instruments for mechanics, optics, electricity, and electronics experiments",
      "Reference charts, historical scientific displays, and demonstration models",
      "Strict safety protocols supervised by qualified lab assistants and technical staff"
    ] */
  },
  {
    id: "fac-8b",
    name: "Chemistry Laboratory",
    description: "Fully equipped Chemistry practical laboratory with apparatus and reagents for organic, inorganic, and physical chemistry.",
    category: "Academic",
    iconName: "FlaskConical",
    highlight: "Fully Equipped Practical Lab",
    imageUrl: "/images/chemistry_lab.jpg",
   /* features: [
      "Dedicated practical workstations with individual fume extraction and water taps",
      "Chemical apparatus, reagents, and glassware for organic, inorganic, and physical chemistry",
      "Reference charts and displays on foundational chemistry concepts and pioneers",
      "Strict safety protocols supervised by qualified lab assistants and technical staff"
    ]   */
  },
  {
    id: "fac-8c",
    name: "Zoology Laboratory",
    description: "Fully equipped Zoology practical laboratory with specimens, models, and microscopy stations for animal biology.",
    category: "Academic",
    iconName: "FlaskConical",
    highlight: "Fully Equipped Practical Lab",
    imageUrl: "/images/zoology_lab.jpg",
   /* features: [
      "Dedicated practical workstations for HSSC and BS Zoology students",
      "Preserved specimens, anatomical models, and classification charts",
      "Calibrated optical microscopes for cellular and specimen study",
      "Strict safety protocols supervised by qualified lab assistants and technical staff"
   ]   */
  },
  {
    id: "fac-8d",
    name: "Computer Lab",
    description: "State-of-the-art computer laboratory equipped with modern systems for programming and IT coursework.",
    category: "Academic",
    iconName: "FlaskConical",
    highlight: "Fully Equipped Practical Lab",
    imageUrl: "Computer_lab.jpeg",
   /* features: [
      "High-performance computer systems loaded with programming compilers and IDEs",
      "Dedicated practical workstations for HSSC and BS Computer Science students",
      "High-speed internet connectivity for research and project submissions",
      "Strict safety protocols supervised by qualified lab assistants and technical staff"
   /] */

  },
  {
    id: "fac-11",
    name: "Auditorium (Capacity Of 500)",
    description: "Grand multipurpose hall with a seating capacity of 500 for convocations, seminars, debates, and events.",
    category: "Infrastructure",
    iconName: "Building2",
    highlight: "500-Seat Multipurpose Hall",
    imageUrl: "/images/auditorium.jpeg",

  }
  
];

export const ACADEMIC_PROGRAMS: ProgramItem[] = [
  {
    id: "prog-1",
    title: "F.Sc Pre-Medical",
    level: "Intermediate (HSSC)",
    duration: "2 Years (Part I & II)",
    eligibility: "Matriculation (SSC) Science with min 60% marks from BISE Shaheed Benazirabad or equivalent",
    seats: 250,
    departments: ["Biology", "Physics", "Chemistry", "English", "Urdu / Sindhi", "Islamic Education / Pakistan Studies"],
    description: "Comprehensive pre-medical curriculum designed for aspiring medical, dental, nursing, and allied health professionals."
  },
  {
    id: "prog-2",
    title: "F.Sc Pre-Engineering",
    level: "Intermediate (HSSC)",
    duration: "2 Years (Part I & II)",
    eligibility: "Matriculation (SSC) Science with Mathematics min 60% marks",
    seats: 150,
    departments: ["Mathematics", "Physics", "Chemistry", "English", "Urdu / Sindhi"],
    description: "Rigorous foundation in advanced calculus, mechanics, physical principles, and analytical reasoning for engineering candidates."
  },
  {
    id: "prog-3",
    title: "F.A (Arts & Humanities)",
    level: "Intermediate (HSSC)",
    duration: "2 Years (Part I & II)",
    eligibility: "Matriculation (SSC) Arts or Science with minimum 45% marks",
    seats: 200,
    departments: ["Economics", "Islamic Studies", "Political Science", "Sociology", "Education", "Fine Arts", "Languages"],
    description: "Diverse academic pathways in humanities, social sciences, governance, and creative arts."
  },
  {
    id: "prog-4",
    title: "I.Com (Commerce)",
    level: "Intermediate (HSSC)",
    duration: "2 Years (Part I & II)",
    eligibility: "Matriculation (SSC) with minimum 50% marks",
    seats: 100,
    departments: ["Principles of Accounting", "Commerce", "Economics", "Business Math"],
    description: "Foundational training in business bookkeeping, trade economics, and financial principles."
  },
  {
    id: "prog-5",
    title: "BS Computer Science (BS CS)",
    level: "Undergraduate (BS 4-Year)",
    duration: "4 Years (8 Semesters)",
    eligibility: "HSSC Intermediate Science (Pre-Engg / Computer Science / General Science) min 50% marks",
    seats: 50,
    departments: ["Computer Science", "Software Engineering", "Mathematics"],
    description: "Degree covering programming, database management, web development, network security, and AI fundamentals."
  },
  {
    id: "prog-6",
    title: "BS English Literature & Linguistics",
    level: "Undergraduate (BS 4-Year)",
    duration: "4 Years (8 Semesters)",
    eligibility: "HSSC (F.A / F.Sc / I.Com) with min 45% marks",
    seats: 50,
    departments: ["English Language & Literature"],
    description: "Advanced literary studies, communication skills, sociolinguistics, and global literature."
  },
  {
    id: "prog-7",
    title: "BS Chemistry",
    level: "Undergraduate (BS 4-Year)",
    duration: "4 Years (8 Semesters)",
    eligibility: "HSSC F.Sc Pre-Medical / Pre-Engineering with min 50% marks",
    seats: 50,
    departments: ["Chemistry"],
    description: "In-depth research and practical laboratory study in organic, inorganic, analytical, and physical chemistry."
  },
  {
    id: "prog-8",
    title: "BS Botany & Zoology",
    level: "Undergraduate (BS 4-Year)",
    duration: "4 Years (8 Semesters)",
    eligibility: "HSSC F.Sc Pre-Medical with min 50% marks",
    seats: 60,
    departments: ["Botany", "Zoology"],
    description: "Biological science graduation programs focusing on plant genetics, environmental ecology, and animal physiology."
  }
];

export const GRADUATION_FEE_STRUCTURE: FeeItem[] = [
  {
    program: "BS Computer Science (BS CS 4-Year)",
    admissionFee: 1500,
    tuitionFeePerTerm: 4000,
    librarySecurityFee: 1000,
    sportsITFee: 800,
    examFeePerTerm: 1200,
    totalFirstTerm: 8500,
    frequency: "Per Semester",
    notes: "Government subsidized fee rate. Subsequent semesters: Rs. 6,000 approx."
  },
  {
    program: "BS Science Programs (Chemistry / Botany / Zoology)",
    admissionFee: 1500,
    tuitionFeePerTerm: 3500,
    librarySecurityFee: 1000,
    sportsITFee: 600,
    examFeePerTerm: 1200,
    totalFirstTerm: 7800,
    frequency: "Per Semester",
    notes: "Includes laboratory equipment access fund."
  },
  {
    program: "BS Arts & Humanities (BS English / Economics)",
    admissionFee: 1500,
    tuitionFeePerTerm: 3000,
    librarySecurityFee: 1000,
    sportsITFee: 500,
    examFeePerTerm: 1000,
    totalFirstTerm: 7000,
    frequency: "Per Semester",
    notes: "Includes digital library access."
  },
  {
    program: "Intermediate HSSC (F.Sc Pre-Medical / Pre-Engineering)",
    admissionFee: 800,
    tuitionFeePerTerm: 1800,
    librarySecurityFee: 500,
    sportsITFee: 400,
    examFeePerTerm: 1000,
    totalFirstTerm: 4500,
    frequency: "Annual",
    notes: "Official Sindh Government standard intermediate fee schedule."
  },
  {
    program: "Intermediate HSSC (F.A / I.Com)",
    admissionFee: 800,
    tuitionFeePerTerm: 1500,
    librarySecurityFee: 500,
    sportsITFee: 400,
    examFeePerTerm: 800,
    totalFirstTerm: 4000,
    frequency: "Annual",
    notes: "Government subsidized fees."
  }
];

export const DEPARTMENTS: DepartmentStructure[] = [
  {
    id: "dept-cs",
    name: "Department of Computer Science & IT",
    hodTitle: "Head of Department (Computer Science)",
    hodMessage: "We aim to empower female students with cutting-edge IT, computational logic, and software development skills needed in modern digital economies.",
    sanctionedPosts: 8,
    subjectsOffered: ["Programming Fundamentals", "Database Systems", "Web Engineering", "Data Structures", "Cybersecurity Basics"]
  },
  {
    id: "dept-chem",
    name: "Department of Chemistry",
    hodTitle: "Head of Department (Chemistry)",
    hodMessage: "Our laboratory-focused teaching fosters analytical research and practical scientific discovery among young female scholars.",
    sanctionedPosts: 10,
    subjectsOffered: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Analytical Instrumentation"]
  },
  {
    id: "dept-bio",
    name: "Department of Botany & Zoology",
    hodTitle: "Head of Department (Biological Sciences)",
    hodMessage: "Focusing on ecological preservation, plant genetics, and biological diversity relevant to Sindh's agricultural landscape.",
    sanctionedPosts: 12,
    subjectsOffered: ["Plant Physiology", "Genetics", "Environmental Biology", "Animal Diversity", "Ecology"]
  },
  {
    id: "dept-eng",
    name: "Department of English Literature & Languages",
    hodTitle: "Head of Department (English)",
    hodMessage: "Developing high proficiency in English communication, critical literature analysis, and professional writing.",
    sanctionedPosts: 14,
    subjectsOffered: ["Functional English", "Classical Literature", "Linguistics", "Communication Skills"]
  },
  {
    id: "dept-arts",
    name: "Department of Social Sciences & Humanities",
    hodTitle: "Head of Department (Social Sciences)",
    hodMessage: "Nurturing civic awareness, economic understanding, and leadership qualities in our future women decision makers.",
    sanctionedPosts: 16,
    subjectsOffered: ["Economics", "Islamic Studies", "Pakistan Studies", "Political Science", "Sociology"]
  }
];

export const DOWNLOADS: DownloadItem[] = [
 /* {
    id: "dl-1",
    title: "Official BS Graduation Admission Form 2026-2027",
    category: "Admission Forms",
    size: "1.4 MB",
    fileFormat: "PDF",
    updatedDate: "August 01, 2026",
    description: "Standard application form for BS Computer Science, BS English, Chemistry, Botany, Zoology."
  },
  {
    id: "dl-2",
    title: "College Official Prospectus & Student Handbook 2026",
    category: "Prospectus",
    size: "4.8 MB",
    fileFormat: "PDF",
    updatedDate: "July 20, 2026",
    description: "Complete guide on rules, campus map, academic policies, fee schedules, and discipline."
  },
  {
    id: "dl-3",
    title: "National Bank Sindh Govt Fee Payment Challan",
    category: "Challan",
    size: "850 KB",
    fileFormat: "PDF",
    updatedDate: "August 02, 2026",
    description: "3-part bank deposit challan form for National Bank of Pakistan (NBP) branches."
  },
  {
    id: "dl-4",
    title: "Student Leave Application & Attendance Medical Form",
    category: "Certificates & NOC",
    size: "420 KB",
    fileFormat: "PDF",
    updatedDate: "June 15, 2026",
    description: "Formal leave request template for approval by Vice Principal / Principal."
  },
  {
    id: "dl-5",
    title: "No Objection Certificate (NOC) / Migration Request Form",
    category: "Certificates & NOC",
    size: "610 KB",
    fileFormat: "PDF",
    updatedDate: "May 10, 2026",
    description: "Application for inter-college migration or university transfer NOC."
  },
  {
    id: "dl-6",
    title: "College Anti-Harassment Policy & Code of Conduct",
    category: "Academic Policies",
    size: "1.1 MB",
    fileFormat: "PDF",
    updatedDate: "January 05, 2026",
    description: "Govt of Sindh regulatory compliance manual on campus safety and student rights."
  } */
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "g1",
    title: "College Main Academic Block & Green Lawns",
    category: "Campus & Gardens",
    imageUrl: "/images/main_academic_block.jpeg",
    date: "2026",
    caption: "Lush green gardens and grand architectural facade of Govt Girls Degree College Nawabshah."
  },
  {
    id: "g2",
    title: "Central Library & Quiet Reading Room",
    category: "Academics",
    imageUrl: "/images/central_library.jpg",
    date: "2026",
    caption: "Spacious central library providing quiet research facilities and e-reference access."
  },
  {
    id: "g3",
    title: "Physics Laboratory",
    category: "Labs & Tech",
    imageUrl: "/images/physics_lab.jpg",
    date: "2026",
    caption: "Physics practical laboratory equipped for mechanics, optics, and electronics experiments."
  },
  {
    id: "g3b",
    title: "Chemistry Laboratory",
    category: "Labs & Tech",
    imageUrl: "/images/chemistry_lab.jpg",
    date: "2026",
    caption: "Chemistry practical laboratory equipped with reagents and apparatus for hands-on learning."
  },
  {
    id: "g3c",
    title: "Zoology Laboratory",
    category: "Labs & Tech",
    imageUrl: "/images/zoology_lab.jpg",
    date: "2026",
    caption: "Zoology laboratory with specimens, models, and microscopy stations."
  },
  {
    id: "g3d",
    title: "Auditorium",
    category: "Auditorium",
    imageUrl: "/images/auditorium.jpg",
    date: "2026",
    caption: "500-seat multipurpose auditorium hosting convocations, seminars, and college events."
  },

];
