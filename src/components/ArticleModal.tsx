import React, { useEffect } from 'react';
import { Article } from '../types.ts';
import { X } from 'lucide-react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span className="text-indigo-600 font-semibold uppercase">{article.category}</span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors rounded-lg bg-white border border-slate-200 cursor-pointer"
            aria-label="Close article"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Article Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 text-slate-700">
          <h2 id="article-modal-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display leading-tight">
            {article.title}
          </h2>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-600 italic">
            {article.summary}
          </div>

          <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
            {article.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-lg font-bold text-slate-900 pt-4 pb-1 font-display">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
                return (
                  <div key={idx} className="pl-4 border-l-2 border-indigo-500 space-y-1.5 text-slate-800">
                    {paragraph.split('\n').map((line, lIdx) => (
                      <div key={lIdx} className="text-xs sm:text-sm">{line}</div>
                    ))}
                  </div>
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Authored by Ted Khalwale · Web & Software Developer</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Finished Reading
          </button>
        </div>
      </div>
    </div>
  );
};
