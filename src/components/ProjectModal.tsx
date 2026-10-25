import React, { useState, useEffect } from 'react';
import { Project } from '../types.ts';
import { 
  X, 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  Image as ImageIcon, 
  ZoomIn, 
  Code2, 
  Copy, 
  Check 
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activePreviewImage, setActivePreviewImage] = useState<string>('');
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (project?.imageUrl) {
      setActivePreviewImage(project.imageUrl);
    } else if (project?.screenshots && project.screenshots.length > 0) {
      setActivePreviewImage(project.screenshots[0]);
    } else {
      setActivePreviewImage('');
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomedImage) {
          setZoomedImage(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, zoomedImage]);

  if (!project) return null;

  const allImages = Array.from(
    new Set([project.imageUrl, ...(project.screenshots || [])].filter(Boolean) as string[])
  );

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase font-semibold text-slate-700 font-mono">
              Project #{project.orderNumber}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-mono text-emerald-700 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
              {project.status || 'Completed'}
            </span>
            <span className="hidden sm:inline-block text-slate-300">·</span>
            <span className="hidden sm:inline-block text-xs text-slate-500 font-mono">
              {project.role}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors rounded-lg bg-white border border-slate-200"
                title="View GitHub Repository"
                aria-label="View GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors rounded-lg bg-white border border-slate-200"
                title="Open Live Preview"
                aria-label="Open Live Preview"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors rounded-lg bg-white border border-slate-200 cursor-pointer"
              aria-label="Close project details"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 text-slate-700">
          
          {/* Title Area */}
          <div>
            <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              {project.title}
            </h2>
            <p className="text-base text-indigo-600 mt-1 font-medium leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Screenshot Showcase */}
          {allImages.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-slate-700" />
                  <span>Visual Interface Preview</span>
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {allImages.length} {allImages.length === 1 ? 'image' : 'images'} available
                </span>
              </div>

              {/* Main Screenshot Container */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden shadow-md">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b border-slate-200 text-xs text-slate-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[11px] text-slate-500 truncate max-w-xs font-mono">
                    {project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.app
                  </span>
                  <button
                    onClick={() => setZoomedImage(activePreviewImage || allImages[0])}
                    className="flex items-center gap-1 text-[11px] text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <ZoomIn className="w-3 h-3" />
                    <span className="hidden sm:inline">Enlarge</span>
                  </button>
                </div>

                <div 
                  onClick={() => setZoomedImage(activePreviewImage || allImages[0])}
                  className="relative max-h-[440px] bg-slate-100 flex items-center justify-center overflow-hidden cursor-zoom-in group/zoom"
                >
                  <img 
                    src={activePreviewImage || allImages[0]} 
                    alt={`${project.title} screenshot`}
                    className="w-full h-auto max-h-[440px] object-cover transition-transform duration-300 group-hover/zoom:scale-[1.01]"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover/zoom:opacity-100 transition-opacity bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-white flex items-center gap-1.5 shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5 text-white" />
                    <span>Click to view full size</span>
                  </div>
                </div>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {allImages.map((shot, sIdx) => (
                    <button 
                      key={sIdx}
                      type="button"
                      onClick={() => setActivePreviewImage(shot)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                        (activePreviewImage || allImages[0]) === shot
                          ? 'border-slate-900 ring-2 ring-slate-900/20 scale-105' 
                          : 'border-slate-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={shot} alt={`Preview ${sIdx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Measurable Results Chips */}
          {project.measurableResults && project.measurableResults.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              {project.measurableResults.map((m, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-[11px] font-mono text-slate-500">{m.label}</div>
                  <div className="text-xl font-bold text-slate-900 font-mono">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-widest font-mono">
                THE PROBLEM
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest font-mono">
                THE SOLUTION
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
                Key Features & Engineering Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.keyFeatures.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Code Architecture Highlight */}
          {project.caseStudy?.codeSnippet && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 font-mono flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-indigo-600" />
                  <span>Architecture Snippet: {project.caseStudy.codeSnippet.caption}</span>
                </span>
                <button
                  onClick={() => handleCopyCode(project.caseStudy!.codeSnippet!.code)}
                  className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 text-xs font-mono overflow-x-auto leading-relaxed">
                <code>{project.caseStudy.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Technologies Stack Tags */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest font-mono">
              Technologies Used
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.technologies.map((tech) => (
                <span 
                  key={tech}
                  className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-500">
            Role: <span className="text-slate-800 font-semibold">{project.role}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-full shadow-sm"
              >
                <span>Live Preview</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-full border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>

      {/* Fullscreen Zoom Lightbox */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[95vh]">
            <img 
              src={zoomedImage} 
              alt="Enlarged preview" 
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl border border-slate-800" 
            />
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute -top-10 right-0 text-white p-2 rounded-lg bg-slate-900 border border-slate-700"
              aria-label="Close zoom"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
