import React, { useEffect } from 'react';
import { DeveloperProfile, ExperienceItem, TechSkillCategory } from '../types.ts';
import { X, Printer, Mail, Globe, MapPin, Phone } from 'lucide-react';

interface ResumeModalProps {
  profile: DeveloperProfile;
  experience: ExperienceItem[];
  skills: TechSkillCategory[];
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ profile, experience, skills, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm print:static print:inset-auto print:bg-white print:p-0 print:overflow-visible"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col print:max-w-none print:max-h-none print:rounded-none print:border-none print:shadow-none print:my-0 print:bg-white print:overflow-visible"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200 bg-slate-50 print:hidden">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-700">
            <span id="resume-modal-title" className="font-semibold text-slate-900">{profile.name}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">Curriculum Vitae</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-full hover:bg-slate-50 transition-colors cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors rounded-lg bg-white border border-slate-200 cursor-pointer"
              aria-label="Close resume"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Canvas */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-white text-slate-900 print:p-0 print:m-0 print:overflow-visible">
          
          {/* Header */}
          <div className="border-b border-slate-300 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {profile.photoUrl && (
                <img 
                  src={profile.photoUrl} 
                  alt={profile.name} 
                  className="w-16 h-16 rounded-2xl object-cover object-top border border-slate-300 shadow-sm shrink-0" 
                />
              )}
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display">
                  {profile.name}
                </h1>
                <div className="text-base font-semibold text-indigo-700 mt-0.5">
                  {profile.title} · {profile.specialty}
                </div>
                <p className="text-xs text-slate-600 mt-2 max-w-xl leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            </div>

            <div className="text-xs font-mono text-slate-600 space-y-1 sm:text-right shrink-0">
              <div className="flex sm:justify-end items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
              </div>
              <div className="flex sm:justify-end items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex sm:justify-end items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{profile.location}</span>
              </div>
              <div className="flex sm:justify-end items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <a href={profile.github} target="_blank" rel="noreferrer" className="hover:underline">
                  {profile.github.replace('https://', '')}
                </a>
              </div>
            </div>
          </div>

          {/* Technical Competencies Matrix */}
          <div>
            <h2 className="text-xs uppercase font-bold tracking-widest text-slate-500 border-b border-slate-200 pb-1 mb-3">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <strong className="text-slate-800">Web & Frontend:</strong>
                <span className="text-slate-600 ml-1">React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS</span>
              </div>
              <div>
                <strong className="text-slate-800">Backend & Services:</strong>
                <span className="text-slate-600 ml-1">Node.js, Express, RESTful APIs, WebSockets, Middleware Architecture</span>
              </div>
              <div>
                <strong className="text-slate-800">Databases & Storage:</strong>
                <span className="text-slate-600 ml-1">PostgreSQL, Prisma ORM, SQL, Relational Schema Modeling</span>
              </div>
              <div>
                <strong className="text-slate-800">Tooling & Quality:</strong>
                <span className="text-slate-600 ml-1">Git, GitHub, Vercel, Docker, Responsive Design, Web Performance (Core Web Vitals)</span>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="text-xs uppercase font-bold tracking-widest text-slate-500 border-b border-slate-200 pb-1 mb-4">
              Work Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1.5 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div>
                      <span className="text-sm font-bold text-slate-900">{exp.role}</span>
                      <span className="text-slate-400 mx-1.5">·</span>
                      <span className="text-xs font-semibold text-indigo-700">{exp.company}</span>
                    </div>
                    <div className="text-slate-500 font-mono text-[11px]">
                      {exp.period} | {exp.location}
                    </div>
                  </div>

                  <p className="text-slate-700 leading-relaxed text-[11px]">
                    {exp.description}
                  </p>

                  <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700 text-[11px]">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="leading-relaxed">
                        {ach}
                      </li>
                    ))}
                  </ul>

                  <div className="text-[10px] font-mono text-slate-500 pt-0.5">
                    Stack: {exp.stack.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Service Offerings */}
          <div>
            <h2 className="text-xs uppercase font-bold tracking-widest text-slate-500 border-b border-slate-200 pb-1 mb-3">
              Core Service Offerings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                <div className="font-bold text-slate-900">Modern Websites & Web Applications</div>
                <p className="text-[11px] text-slate-600">Fast, accessible, mobile-first web platforms engineered with modern React and Next.js.</p>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                <div className="font-bold text-slate-900">Business Management Systems</div>
                <p className="text-[11px] text-slate-600">Centralized software for inventory management, order tracking, and point-of-sale invoicing.</p>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                <div className="font-bold text-slate-900">Interactive Dashboards & Analytics</div>
                <p className="text-[11px] text-slate-600">Operational visibility tools presenting real-time business metrics and exportable summaries.</p>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                <div className="font-bold text-slate-900">Custom Business Software & Integrations</div>
                <p className="text-[11px] text-slate-600">Bespoke tools, billing systems, client portals, and secure API integrations built to spec.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
