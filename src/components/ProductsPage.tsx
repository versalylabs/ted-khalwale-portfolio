import React, { useState, useMemo } from 'react';
import { Project } from '../types.ts';
import { 
  ArrowLeft, 
  Search, 
  Sparkles, 
  ArrowUpRight, 
  Github, 
  ExternalLink, 
  Filter, 
  X, 
  Rocket, 
  Compass
} from 'lucide-react';

interface ProductsPageProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onBackToHome: () => void;
  onOpenContact: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  projects,
  onSelectProject,
  onBackToHome,
  onOpenContact,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'business', label: 'Business Systems' },
    { id: 'dashboard', label: 'Dashboards' },
    { id: 'web', label: 'Web Applications & Sites' },
    { id: 'saas', label: 'SaaS & Workflows' },
  ];

  // Filter projects by search query and category
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = 
        selectedCategory === 'all' || project.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch = 
        project.title.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.problem.toLowerCase().includes(query) ||
        project.solution.toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const getCategoryBadgeLabel = (cat: string) => {
    switch (cat) {
      case 'business':
        return 'Business System';
      case 'dashboard':
        return 'Dashboard';
      case 'saas':
        return 'SaaS Product';
      case 'web':
      default:
        return 'Web App';
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 animate-fade-in bg-[#fafafc]">
      
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all shadow-sm group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-500 hidden sm:inline-block">
            Showing <span className="text-slate-900 font-bold">{filteredProjects.length}</span> of {projects.length} Works
          </span>
          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>Discuss a Project</span>
          </button>
        </div>
      </div>

      {/* Page Header */}
      <div className="mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>PROJECT CATALOG & ARCHITECTURE HIGHLIGHTS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] font-display">
          Shipped Projects & Systems
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
          Explore the various web applications, business management tools, and interactive dashboards engineered by Ted Khalwale. Each project is designed to resolve real business bottlenecks, streamline daily operations, and provide clear user experiences.
        </p>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 font-bold text-xs">
              01
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 font-mono">{projects.length} Works</div>
              <div className="text-[10px] text-slate-500">Featured Catalog</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 font-bold text-xs">
              02
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 font-mono">Full-Stack</div>
              <div className="text-[10px] text-slate-500">React · Next · Node</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 font-bold text-xs">
              03
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 font-mono">Sub-Second</div>
              <div className="text-[10px] text-slate-500">Fast Page Loads</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 font-bold text-xs">
              04
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 font-mono">Custom Built</div>
              <div className="text-[10px] text-slate-500">Zero Template Bloat</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 mb-10 border border-slate-200 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by keyword, technology, or feature..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-slate-400 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 cursor-pointer"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Active Results Count */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-700" />
            <span>Category:</span>
            <span className="text-slate-900 font-semibold uppercase">{selectedCategory}</span>
          </div>

        </div>

        {/* Category Pills Strip */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = cat.id === 'all' 
              ? projects.length 
              : projects.filter(p => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-white text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer p-6 flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_25px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 relative"
            >
              <div>
                
                {/* Card Top: Order Number & Category */}
                <div className="flex items-center justify-between mb-3 text-xs font-mono font-bold tracking-wider">
                  <span className="text-slate-500 group-hover:text-slate-900 transition-colors">
                    {project.orderNumber}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-emerald-700 font-mono px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                      {project.status || 'Active'}
                    </span>
                    <span className="text-[10px] text-slate-600 uppercase font-mono px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                      {getCategoryBadgeLabel(project.category)}
                    </span>
                  </div>
                </div>

                {/* Screenshot Area */}
                <div className="mb-4">
                  {project.imageUrl && (
                    <div className="w-full h-44 rounded-xl overflow-hidden relative border border-slate-200 bg-slate-50 group-hover:border-slate-300 transition-all flex flex-col shadow-inner">
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
                          alt={`${project.title} screenshot`} 
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

                {/* Title */}
                <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-sans">
                  {project.title}
                </h2>

                {/* Role */}
                <div className="text-[11px] font-mono text-slate-500 mt-1">
                  Role: {project.role}
                </div>

                {/* Tagline */}
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                  {project.tagline}
                </p>

                {/* Measurable Results Chips */}
                {project.measurableResults && project.measurableResults.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100">
                    {project.measurableResults.slice(0, 2).map((m, idx) => (
                      <span key={idx} className="text-[10px] font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        <span className="text-slate-900 font-semibold">{m.value}</span> {m.label}
                      </span>
                    ))}
                  </div>
                )}

                {/* Technologies List */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span 
                      key={tech} 
                      className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 text-slate-400 hover:text-slate-800 transition-colors"
                      title="View GitHub repository"
                      aria-label="View GitHub repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 text-slate-400 hover:text-slate-800 transition-colors"
                      title="Visit live deployment"
                      aria-label="Visit live deployment"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl p-12 text-center max-w-xl mx-auto border border-slate-200 space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No projects found</h3>
          <p className="text-xs sm:text-sm text-slate-600">
            No projects match the query "{searchQuery || selectedCategory}". Try searching another keyword or reset the category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer"
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Bottom CTA Banner */}
      <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center mx-auto border border-white/15">
            <Rocket className="w-5 h-5" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Need a custom business system or modern website?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            From greenfield architecture to scaling operational workflows, Ted Khalwale delivers clean, resilient software tailored to your goals.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 shadow-xl cursor-pointer"
            >
              <span>Start a Conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-300 hover:text-white border border-white/20 hover:border-white/40 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
