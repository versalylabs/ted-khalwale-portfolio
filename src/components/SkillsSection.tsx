import React from 'react';
import { SkillItem } from '../types.ts';
import { masterSkills } from '../data/portfolioData.ts';

interface SkillsSectionProps {
  skills?: SkillItem[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills = masterSkills }) => {
  // Split list dynamically into two columns
  const midpoint = Math.ceil(skills.length / 2);
  const leftColumnSkills = skills.slice(0, midpoint);
  const rightColumnSkills = skills.slice(midpoint);

  const renderSkillIcon = (iconName: string, skillName: string) => {
    const key = (iconName || skillName).toLowerCase();
    if (key.includes('html')) {
      return (
        <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
          <span className="font-extrabold text-xs text-orange-600">5</span>
        </div>
      );
    }
    if (key.includes('css')) {
      return (
        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
          <span className="font-extrabold text-xs text-blue-600">3</span>
        </div>
      );
    }
    if (key.includes('js') || key.includes('javascript')) {
      return (
        <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
          <span className="font-extrabold text-[10px] text-amber-700 font-mono">JS</span>
        </div>
      );
    }
    if (key.includes('react')) {
      return (
        <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center shrink-0">
          <span className="text-cyan-600 text-sm">⚛</span>
        </div>
      );
    }
    if (key.includes('next')) {
      return (
        <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center shrink-0">
          <span className="font-bold text-xs text-slate-900 font-sans">N</span>
        </div>
      );
    }
    if (key.includes('node')) {
      return (
        <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
          <span className="font-bold text-[10px] text-emerald-600 font-mono">Node</span>
        </div>
      );
    }
    if (key.includes('tailwind')) {
      return (
        <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0">
          <span className="font-bold text-[11px] text-sky-600">≈</span>
        </div>
      );
    }
    if (key.includes('ts') || key.includes('typescript')) {
      return (
        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
          <span className="font-extrabold text-[10px] text-blue-600 font-mono">TS</span>
        </div>
      );
    }
    if (key.includes('git')) {
      return (
        <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
          <span className="font-bold text-xs text-orange-600">⎇</span>
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
        <span className="font-bold text-xs text-slate-700">{skillName.charAt(0)}</span>
      </div>
    );
  };

  return (
    <section id="skills" className="py-20 border-b border-slate-200/80 bg-[#fafafc]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-slate-700 bg-white border border-slate-200 shadow-sm mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
            <span>MY SKILLS</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Technologies I Master
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto">
            Tools, frameworks, and software stacks leveraged to deliver production-ready software systems.
          </p>
        </div>

        {/* 2-Column Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-5 max-w-5xl mx-auto">
          
          {/* Left Column */}
          <div className="space-y-4">
            {leftColumnSkills.map((skill) => (
              <div 
                key={skill.name} 
                className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:border-slate-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between text-sm mb-2.5">
                  <div className="flex items-center gap-3">
                    {renderSkillIcon(skill.icon, skill.name)}
                    <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                    {skill.percentage}%
                  </span>
                </div>

                {/* Progress Bar Track */}
                <div 
                  className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-[1px] border border-slate-200/60"
                  role="progressbar"
                  aria-valuenow={skill.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${skill.name} proficiency`}
                >
                  <div 
                    className="h-full rounded-full bg-slate-900 transition-all duration-1000"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightColumnSkills.map((skill) => (
              <div 
                key={skill.name} 
                className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:border-slate-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between text-sm mb-2.5">
                  <div className="flex items-center gap-3">
                    {renderSkillIcon(skill.icon, skill.name)}
                    <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                    {skill.percentage}%
                  </span>
                </div>

                {/* Progress Bar Track */}
                <div 
                  className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-[1px] border border-slate-200/60"
                  role="progressbar"
                  aria-valuenow={skill.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${skill.name} proficiency`}
                >
                  <div 
                    className="h-full rounded-full bg-slate-900 transition-all duration-1000"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
