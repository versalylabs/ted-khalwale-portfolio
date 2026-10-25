import React, { useState } from 'react';
import { Project } from '../types.ts';
import { ArrowUpRight, ArrowRight, Layers } from 'lucide-react';

interface ProjectsGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onExploreMore?: () => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ 
  projects, 
  onSelectProject,
  onExploreMore 
}) => {
  const [activeDot, setActiveDot] = useState(0);

  // Home page showcases 3 projects per page with interactive pagination
  const pageSize = 3;
  const totalPages = Math.max(1, Math.ceil(projects.length / pageSize));
  const currentPage = Math.min(activeDot, totalPages - 1);
  const displayProjects = projects.slice(currentPage * pageSize, currentPage * pageSize + pageSize);

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'business':
        return 'Business System';
      case 'dashboard':
        return 'Dashboard';
      case 'saas':
        return 'SaaS Product';
      case 'web':
      default:
        return 'Web Application';
    }
  };

  return (
    <section id="projects" className="py-20 border-b border-slate-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-slate-700 bg-slate-100 border border-slate-200 shadow-sm mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
            <span>SELECTED WORKS</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Featured Projects & Systems
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            Real-world web applications, business management tools, and interactive dashboards engineered for reliability, speed, and real operational value.
          </p>
        </div>

        {/* 3-Column Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {displayProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer p-6 flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_25px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 relative"
            >
              <div>
                
                {/* Top Number, Status, & Category */}
                <div className="flex items-center justify-between mb-3 text-xs font-mono font-bold tracking-wider">
                  <span className="text-slate-500 group-hover:text-slate-900 transition-colors">
                    {project.orderNumber}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-emerald-700 font-mono px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                      {project.status || 'Active'}
                    </span>
                    <span className="text-[10px] text-slate-600 uppercase font-mono px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                      {getCategoryLabel(project.category)}
                    </span>
                  </div>
                </div>

                {/* Screenshot Preview Area */}
                <div className="mb-4">
                  {project.imageUrl && (
                    <div className="w-full h-44 rounded-xl overflow-hidden relative border border-slate-200 bg-slate-50 group-hover:border-slate-300 transition-all flex flex-col shadow-inner">
                      {/* Browser Mockup Window Bar */}
                      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-100/90 border-b border-slate-200 text-[10px] text-slate-500 font-mono">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-400" />
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                        <span className="text-[9px] text-slate-500 truncate max-w-[130px]">
                          {project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.app
                        </span>
                      </div>
                      
                      <div className="relative flex-1 overflow-hidden">
                        <img 
                          src={project.imageUrl} 
                          alt={`${project.title} interface preview`} 
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                          <span className="text-[10px] font-mono font-semibold text-white bg-slate-900/90 px-2.5 py-1 rounded-lg backdrop-blur-md shadow-md">
                            View Case Study ↗
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {project.title}
                </h3>

                {/* Role */}
                <div className="text-[11px] font-mono text-slate-500 mt-1">
                  Role: {project.role}
                </div>

                {/* Project Subtitle / Tagline */}
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                  {project.tagline}
                </p>

                {/* Technologies List */}
                <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-slate-100">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={tech} 
                      className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

              </div>

              {/* Card Footer: View Project ↗ */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-slate-500">
                  {project.period.split('·')[0].trim()}
                </span>
                <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              type="button"
              onClick={() => setActiveDot((prev) => (prev - 1 + totalPages) % totalPages)}
              className="px-3 py-1.5 text-xs font-mono text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer shadow-sm"
              aria-label="Previous projects page"
            >
              Prev
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveDot(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentPage === idx
                      ? 'w-7 bg-slate-900 shadow-sm'
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to projects page ${idx + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActiveDot((prev) => (prev + 1) % totalPages)}
              className="px-3 py-1.5 text-xs font-mono text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer shadow-sm"
              aria-label="Next projects page"
            >
              Next
            </button>
          </div>
        )}

        {/* Explore More Products & Works CTA Button */}
        {onExploreMore && (
          <div className="flex flex-col items-center justify-center mt-12 pt-4">
            <button
              onClick={onExploreMore}
              className="group inline-flex items-center gap-3.5 px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Layers className="w-4 h-4 text-slate-300" />
              <span className="text-sm font-semibold">Explore All Products & Projects</span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-slate-500 mt-2.5 font-mono">
              Browse full portfolio catalog, case studies & architecture highlights
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
