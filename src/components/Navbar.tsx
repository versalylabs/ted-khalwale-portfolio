import React, { useState } from 'react';
import { DeveloperProfile } from '../types.ts';
import { Menu, X, ArrowUpRight, FileText, Lock } from 'lucide-react';

interface NavbarProps {
  profile: DeveloperProfile;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenHireMe: () => void;
  onOpenResume: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeSection,
  onNavigate,
  onOpenHireMe,
  onOpenResume,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Products', href: '#products' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    onNavigate(href.replace('#', ''));
    setMobileMenuOpen(false);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-all shadow-[0_2px_15px_rgba(15,23,42,0.03)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo: Ted Khalwale */}
        <a 
          href="#home" 
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#home');
          }}
          className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer min-w-0"
        >
          <div className="relative flex items-center justify-center font-mono font-bold text-xs text-white w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 shadow-sm shrink-0 transition-transform group-hover:scale-105">
            <span>&lt;/&gt;</span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 truncate">
              {profile.name}
            </span>
            <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium text-slate-600 bg-slate-100 border border-slate-200">
              Web Developer
            </span>
          </div>
          {profile.photoUrl && (
            <img 
              src={profile.photoUrl} 
              alt={profile.name} 
              className="w-7 h-7 rounded-full object-cover object-top border border-slate-300 shadow-sm ml-0.5 shrink-0 group-hover:scale-105 transition-transform" 
            />
          )}
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-600" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '') || (link.href === '#home' && activeSection === '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`relative py-1 transition-colors ${
                  isActive 
                    ? 'text-slate-950 font-semibold' 
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="hidden sm:inline-flex p-2 text-slate-500 hover:text-slate-900 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer"
              title="Admin CMS Portal"
              aria-label="Admin Portal Login"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenHireMe();
            }}
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-full shadow-sm transition-all hover:shadow cursor-pointer"
          >
            <span>Get In Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer rounded-xl border border-slate-200 bg-white"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Collapsible Mobile Navigation Drawer & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-16 z-30 bg-slate-900/40 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-40 md:hidden border-b border-slate-200 bg-white px-5 pt-3 pb-6 space-y-1.5 animate-fade-in shadow-xl">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '') || (link.href === '#home' && activeSection === '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-slate-950 font-semibold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />}
                </a>
              );
            })}
            <div className="pt-3 mt-2 border-t border-slate-200 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full inline-flex justify-center items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Curriculum Vitae</span>
              </button>

              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full inline-flex justify-center items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin CMS Login</span>
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
};
