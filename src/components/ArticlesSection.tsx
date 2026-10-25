import React from 'react';
import { Article } from '../types.ts';
import { ArrowUpRight } from 'lucide-react';

interface ArticlesSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ articles, onSelectArticle }) => {
  return (
    <section id="blog" className="py-20 border-b border-slate-200/80 bg-[#fafafc]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-slate-700 bg-white border border-slate-200 shadow-sm mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
            <span>BLOG & ARTICLES</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Latest Technical Writing & Insights
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto">
            Deep dives into frontend engineering, modern web performance, and developer productivity.
          </p>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {articles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group cursor-pointer p-6 flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 relative"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <span className="text-indigo-600 font-semibold">{article.category}</span>
                  <span>·</span>
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                <span>Read Full Article</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
