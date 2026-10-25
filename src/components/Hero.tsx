import React, { useState } from 'react';
import { DeveloperProfile } from '../types.ts';
import { ArrowUpRight, Download, Check, Copy, MapPin, Sparkles } from 'lucide-react';

interface HeroProps {
  profile: DeveloperProfile;
  onViewWork: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  profile, 
  onViewWork, 
  onOpenResume 
}) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const codeSnippet = `const developer = {
  name: "${profile.name}",
  role: "Web & Software Developer",
  focus: [
    "Modern Websites",
    "Business Management Systems",
    "Dashboards",
    "Custom Software"
  ],
  stack: ["React", "Next.js", "TypeScript", "Node.js"]
};`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const portraitSrc = profile.photoUrl || '/ted-khalwale-cutout.png';

  return (
    <section id="home" className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 bg-[#fafafc] border-b border-slate-200/80">
      
      {/* Subtle Ambient Background Accents */}
      <div 
        className="absolute top-10 right-10 w-48 h-48 opacity-[0.04] pointer-events-none hidden lg:block"
        style={{
          backgroundImage: `radial-gradient(#0f172a 1.5px, transparent 1.5px)`,
          backgroundSize: '16px 16px'
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill Tag */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-slate-700 bg-white border border-slate-200/90 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span>AVAILABLE FOR FREELANCE & FULL-TIME</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200">
                <MapPin className="w-3 h-3 text-slate-500" />
                <span>{profile.location}</span>
              </span>
            </div>

            {/* Clean Bold Editorial Display Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] font-display">
              I design & build <br />
              <span className="text-slate-900 relative inline-block">
                digital products
                <span className="absolute bottom-1.5 left-0 right-0 h-3 bg-indigo-100 -z-10 rounded-sm" />
              </span>{' '}
              <br />
              that drive business.
            </h1>

            {/* Subheading Narrative */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {profile.bio}
            </p>

            {/* Action Buttons: View Selected Works + View Resume */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onViewWork}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-full shadow-md shadow-slate-900/10 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>View Selected Works</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-full shadow-sm transition-all hover:border-slate-400 active:scale-[0.98] cursor-pointer"
              >
                <span>View Full CV</span>
                <Download className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Stats / Credentials Bar */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  {profile.yearsExperience}+
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  Years Experience
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  10+
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  Shipped Systems
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  100%
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  Delivery Rate
                </div>
              </div>
            </div>

            {/* Core Tooling Row */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span>CORE TECHNOLOGIES & TOOLING</span>
                <span className="h-[1px] flex-1 bg-slate-200" />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Git'].map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-slate-700 bg-white border border-slate-200 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Clean Editorial Framed Portrait with Floating Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">
            
            {/* Framed Arch / Pill Portrait Container */}
            <div className="relative w-[300px] min-[400px]:w-[340px] sm:w-[380px] md:w-[400px] h-[380px] min-[400px]:h-[440px] sm:h-[480px] rounded-[2.5rem] bg-gradient-to-b from-indigo-50/70 via-slate-100 to-slate-200/50 border border-slate-200 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08)] flex items-end justify-center overflow-hidden group">
              
              {/* Soft Ambient Inner Glow */}
              <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />

              {/* Portrait Image (Cutout) */}
              <img 
                src={portraitSrc} 
                alt={`Portrait of ${profile.name} - Web Developer`}
                className="relative z-10 w-full h-[95%] object-cover object-top filter contrast-[1.02] drop-shadow-[0_12px_24px_rgba(15,23,42,0.12)] transition-transform duration-500 group-hover:scale-[1.02]"
                loading="eager"
                fetchPriority="high"
                onError={(e) => {
                  // Fallback to raw if cutout fails
                  const target = e.currentTarget;
                  if (target.src.includes('cutout')) {
                    target.src = '/ted-khalwale.jpg';
                  }
                }}
              />

              {/* Bottom Subtle Gradient Fade */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-200/80 via-slate-200/30 to-transparent pointer-events-none z-10" />

              {/* Top Floating Badge: Sparkle Focus */}
              <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-3.5 py-2 shadow-md flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-semibold text-slate-800">
                  Full-Stack Engineering
                </span>
              </div>
            </div>

            {/* Bottom Floating Code Card */}
            <div 
              className="absolute -bottom-6 -right-2 sm:-right-4 z-20 w-[240px] sm:w-[270px] bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-200 group hover:border-slate-300 transition-all duration-300"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-slate-800">
                  <span className="text-indigo-600 font-bold">&lt;/&gt;</span>
                  <span>developer.config.ts</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="p-1 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                    title="Copy code snippet"
                    aria-label="Copy code snippet"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </div>

              {/* Syntax Highlighted Code Box */}
              <pre className="text-[10px] font-mono leading-relaxed text-slate-700 overflow-x-hidden">
                <code>
                  <span className="text-purple-600 font-semibold">const</span> <span className="text-blue-600">developer</span> = &#123;{'\n'}
                  {'  '}<span className="text-slate-500">name:</span> <span className="text-emerald-700">"{profile.name}"</span>,{'\n'}
                  {'  '}<span className="text-slate-500">role:</span> <span className="text-emerald-700">"Web & Software"</span>,{'\n'}
                  {'  '}<span className="text-slate-500">stack:</span> [<span className="text-emerald-700">"React"</span>, <span className="text-emerald-700">"Next.js"</span>]{'\n'}
                  &#125;;
                </code>
              </pre>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
