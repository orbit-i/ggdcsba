import React, { useState } from 'react';
import { PageType } from './types';
import { DataProvider } from './context/DataContext';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { AcademicsPage } from './components/pages/AcademicsPage';
import { FeeStructurePage } from './components/pages/FeeStructurePage';
import { FacilitiesPage } from './components/pages/FacilitiesPage';
import { StaffDirectoryPage } from './components/pages/StaffDirectoryPage';
import { NotificationsPage } from './components/pages/NotificationsPage';
import { DownloadsPage } from './components/pages/DownloadsPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { GrievancePage } from './components/pages/GrievancePage';
import { ContactPage } from './components/pages/ContactPage';
import { SuperAdminDashboard } from './components/pages/SuperAdminDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'academics':
        return <AcademicsPage />;
      case 'fee-structure':
        return <FeeStructurePage onNavigate={setCurrentPage} />;
      case 'facilities':
        return <FacilitiesPage onNavigate={setCurrentPage} />;
      case 'staff':
        return <StaffDirectoryPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'downloads':
        return <DownloadsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'grievance':
        return <GrievancePage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <SuperAdminDashboard />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <DataProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased selection:bg-emerald-200 selection:text-emerald-900">
        {/* Header with Official Logo, Title, Phone Helplines & Marquee */}
        <Header onNavigate={setCurrentPage} />

        {/* Main Sticky Deep-Green Navigation Bar */}
        <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

        {/* Main Content Area */}
        <main className="flex-1">
          {renderPage()}
        </main>

        {/* Footer with E-Governance Compliance, Phone Numbers & Links */}
        <Footer onNavigate={setCurrentPage} />
      </div>
    </DataProvider>
  );
}
