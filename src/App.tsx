import React, { useState, useEffect } from 'react';
import { 
  experienceData, 
  skillCategories
} from './data/portfolioData.ts';
import { DeveloperProfile, Project, Article, SkillItem } from './types.ts';
import { 
  loadStoredProfile, 
  loadStoredProjects, 
  loadStoredSkills, 
  loadStoredArticles,
  isAdminAuthenticated 
} from './services/adminStorage.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { SkillsSection } from './components/SkillsSection.tsx';
import { ProjectsGrid } from './components/ProjectsGrid.tsx';
import { ArticlesSection } from './components/ArticlesSection.tsx';
import { FooterSection } from './components/FooterSection.tsx';
import { LiquidBackground } from './components/LiquidBackground.tsx';
import { CreativeMarquee } from './components/CreativeMarquee.tsx';

// Code-split secondary views & modals for maximum initial load performance
const ProductsPage = React.lazy(() => import('./components/ProductsPage.tsx').then(m => ({ default: m.ProductsPage })));
const ProjectModal = React.lazy(() => import('./components/ProjectModal.tsx').then(m => ({ default: m.ProjectModal })));
const ArticleModal = React.lazy(() => import('./components/ArticleModal.tsx').then(m => ({ default: m.ArticleModal })));
const ResumeModal = React.lazy(() => import('./components/ResumeModal.tsx').then(m => ({ default: m.ResumeModal })));
const ContactModal = React.lazy(() => import('./components/ContactModal.tsx').then(m => ({ default: m.ContactModal })));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard.tsx').then(m => ({ default: m.AdminDashboard })));

export default function App() {
  // Live adjustable state with persistent browser storage
  const [profile, setProfile] = useState<DeveloperProfile>(() => loadStoredProfile());
  const [projects, setProjects] = useState<Project[]>(() => loadStoredProjects());
  const [articles, setArticles] = useState<Article[]>(() => loadStoredArticles());
  const [skills, setSkills] = useState<SkillItem[]>(() => loadStoredSkills());

  // Views & Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'products'>(() => {
    if (typeof window !== 'undefined' && window.location.hash.toLowerCase() === '#products') {
      return 'products';
    }
    return 'home';
  });

  const [activeSection, setActiveSection] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.hash.toLowerCase() === '#products') {
      return 'products';
    }
    return 'home';
  });

  // Modals & Panels
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  // Admin Dashboard State
  const [adminOpen, setAdminOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.location.hash.toLowerCase() === '#admin') {
      return true;
    }
    return false;
  });
  const [isAdminAuth, setIsAdminAuth] = useState<boolean>(() => isAdminAuthenticated());

  // Global hash change listener for seamless URL navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'admin') {
        setAdminOpen(true);
        return;
      }
      if (hash === 'products') {
        setCurrentView('products');
        setActiveSection('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash) {
        setCurrentView('home');
        setActiveSection(hash);
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else {
        setCurrentView('home');
        setActiveSection('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard shortcut: Ctrl+Shift+A or Cmd+Shift+A to toggle Admin Portal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Lock background scroll when any modal is open
  useEffect(() => {
    const anyModalOpen = Boolean(selectedProject || selectedArticle || resumeOpen || contactOpen || adminOpen);
    if (anyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject, selectedArticle, resumeOpen, contactOpen, adminOpen]);

  // Monitor scroll position to update active navbar section when on home view
  useEffect(() => {
    const handleScroll = () => {
      if (currentView !== 'home') return;
      const sections = ['home', 'about', 'skills', 'projects', 'blog', 'contact'];
      const scrollY = window.scrollY;

      // If scrolled near the bottom of the page, highlight 'contact'
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('contact');
        return;
      }

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 140;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'admin') {
      setAdminOpen(true);
      return;
    }

    if (sectionId === 'products') {
      setCurrentView('products');
      setActiveSection('products');
      window.location.hash = 'products';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentView === 'products') {
      setCurrentView('home');
      setActiveSection(sectionId);
      window.location.hash = sectionId === 'home' ? '' : sectionId;
      setTimeout(() => {
        if (sectionId !== 'home') {
          const element = document.getElementById(sectionId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 70);
      return;
    }

    // Default home view scroll navigation
    setActiveSection(sectionId);
    window.location.hash = sectionId === 'home' ? '' : sectionId;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fafafc] text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white overflow-x-hidden">
      {/* Interactive Liquid Caustic Aurora Background */}
      <LiquidBackground />

      {/* Primary Header */}
      <Navbar
        profile={profile}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenHireMe={() => setContactOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Sections: Home View or Products Catalog */}
      <main className="flex-1">
        {currentView === 'products' ? (
          <React.Suspense fallback={<div className="min-h-screen bg-[#fafafc]" />}>
            <ProductsPage
              projects={projects}
              onSelectProject={(p) => setSelectedProject(p)}
              onBackToHome={() => handleNavigate('home')}
              onOpenContact={() => setContactOpen(true)}
            />
          </React.Suspense>
        ) : (
          <>
            {/* Hero Section */}
            <Hero
              profile={profile}
              onViewWork={() => handleNavigate('projects')}
              onOpenResume={() => setResumeOpen(true)}
            />

            {/* Creative Infinite Marquee Ribbon Divider */}
            <CreativeMarquee />

            {/* About Me Section: Positioning & 4 Core Focus Areas */}
            <AboutSection
              profile={profile}
              onOpenResume={() => setResumeOpen(true)}
            />

            {/* My Skills: Mastered Technologies */}
            <SkillsSection skills={skills} />

            {/* Featured Projects: 01, 02, 03 */}
            <ProjectsGrid
              projects={projects}
              onSelectProject={(p) => setSelectedProject(p)}
              onExploreMore={() => handleNavigate('products')}
            />

            {/* Blog & Technical Insights */}
            <ArticlesSection
              articles={articles}
              onSelectArticle={(a) => setSelectedArticle(a)}
            />
          </>
        )}
      </main>

      {/* Footer & Direct Contact Channels */}
      <FooterSection
        profile={profile}
        onOpenContact={() => setContactOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Modals & Portals with Lazy Suspense */}
      <React.Suspense fallback={null}>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

        {selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}

        {resumeOpen && (
          <ResumeModal
            profile={profile}
            experience={experienceData}
            skills={skillCategories}
            onClose={() => setResumeOpen(false)}
          />
        )}

        {contactOpen && (
          <ContactModal
            isOpen={contactOpen}
            profile={profile}
            onClose={() => setContactOpen(false)}
          />
        )}

        {adminOpen && (
          <AdminDashboard
            isAuthenticated={isAdminAuth}
            onLoginSuccess={() => setIsAdminAuth(true)}
            onLogout={() => setIsAdminAuth(false)}
            onClose={() => {
              setAdminOpen(false);
              if (window.location.hash.toLowerCase() === '#admin') {
                window.location.hash = '';
              }
            }}
            profile={profile}
            setProfile={setProfile}
            projects={projects}
            setProjects={setProjects}
            skills={skills}
            setSkills={setSkills}
            articles={articles}
            setArticles={setArticles}
          />
        )}
      </React.Suspense>
    </div>
  );
}
