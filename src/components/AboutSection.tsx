import React from 'react';
import { DeveloperProfile } from '../types.ts';
import { Globe, Briefcase, LayoutDashboard, Cpu, User, ArrowUpRight } from 'lucide-react';

interface AboutSectionProps {
  profile: DeveloperProfile;
  onOpenResume: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile, onOpenResume }) => {
  const renderFocusIcon = (iconName: string, isDark: boolean) => {
    const iconClass = isDark ? "w-5 h-5 text-white" : "w-5 h-5 text-slate-800";
    switch (iconName) {
      case 'globe':
        return <Globe className={iconClass} />;
      case 'briefcase':
        return <Briefcase className={iconClass} />;
      case 'layout-dashboard':
        return <LayoutDashboard className={iconClass} />;
      case 'cpu':
      default:
        return <Cpu className={iconClass} />;
    }
  };

  return (
    <section id="about" className="py-20 border-b border-slate-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Pill, Heading, Narrative & Resume Button */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Pill: ABOUT ME */}
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-slate-700 bg-slate-100 border border-slate-200 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                <span>ABOUT TED KHALWALE</span>
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
              Engineering reliable, modern{' '}
              <span className="text-slate-900 relative inline-block">
                web software
                <span className="absolute bottom-1 left-0 right-0 h-2 bg-indigo-100 -z-10 rounded-sm" />
              </span>
            </h2>

            {/* Narrative description */}
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              {profile.aboutDescription}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 rounded-full border border-slate-300 hover:border-slate-400 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <span>View Full Curriculum Vitae</span>
                <User className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            <div className="pt-4 border-t border-slate-200 text-xs font-mono text-slate-600 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">Location:</span>
                <span className="text-slate-700">{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">Availability:</span>
                <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Open for new projects & contract roles
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: 4 Core Capability & Focus Cards (Matching Reference 1) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {profile.focusAreas.map((area, idx) => {
                // Card 2 is inverted dark (Reference 1 style) for striking visual rhythm
                const isDark = idx === 1;

                return (
                  <div 
                    key={area.id}
                    className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group ${
                      isDark
                        ? 'bg-slate-900 text-white border border-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-1'
                        : 'bg-white text-slate-900 border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] hover:border-slate-300 hover:-translate-y-1'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                          isDark 
                            ? 'bg-white/10 border border-white/15' 
                            : 'bg-slate-100 border border-slate-200'
                        }`}>
                          {renderFocusIcon(area.icon, isDark)}
                        </div>
                        <span className={`text-[11px] font-mono font-bold tracking-wider ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          0{idx + 1}
                        </span>
                      </div>

                      <div>
                        <h3 className={`text-base font-bold transition-colors ${
                          isDark ? 'text-white' : 'text-slate-900 group-hover:text-indigo-600'
                        }`}>
                          {area.title}
                        </h3>
                        <div className={`text-xs font-mono mt-1 ${
                          isDark ? 'text-indigo-300' : 'text-indigo-600'
                        }`}>
                          {area.subtitle}
                        </div>
                      </div>

                      <p className={`text-xs leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {area.description}
                      </p>
                    </div>

                    <div className={`pt-4 mt-5 flex flex-wrap gap-1.5 border-t ${
                      isDark ? 'border-white/10' : 'border-slate-100'
                    }`}>
                      {area.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                            isDark 
                              ? 'bg-white/10 text-slate-200 border border-white/10' 
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
