import React, { useState } from 'react';
import { DeveloperProfile } from '../types.ts';
import { ArrowUpRight, Github, Linkedin, Twitter, Instagram, Mail, Phone, Check, Copy, Lock, CheckCircle2 } from 'lucide-react';

interface FooterSectionProps {
  profile: DeveloperProfile;
  onOpenContact: () => void;
  onOpenAdmin?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ profile, onOpenContact, onOpenAdmin }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const principles = [
    "Clean, maintainable architecture with TypeScript & modern components",
    "Direct communication, transparent milestones & on-schedule delivery",
    "Mobile-first responsive design tested across phone, tablet & desktop",
    "High performance, strict security & accessible semantic code"
  ];

  return (
    <footer id="contact" className="pt-16 pb-12 bg-white text-slate-700 border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Contact Banner Card */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 sm:p-10 lg:p-12 shadow-2xl mb-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
            
            {/* Column 1: LET'S WORK TOGETHER */}
            <div className="lg:col-span-4 space-y-4">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-2" />
                LET'S WORK TOGETHER
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight font-display">
                Have a project or web system to build?
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                I'm open to discuss new web projects, business management systems, and contract development engagements. Let's build software that drives real results.
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-full shadow-md transition-all cursor-pointer"
                >
                  <span>Start a Conversation</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-900" />
                </button>
              </div>
            </div>

            {/* Column 2: Authentic Development Commitments & Principles */}
            <div className="lg:col-span-4 rounded-2xl bg-white/[0.04] border border-white/10 p-6 space-y-3.5">
              <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                  DEVELOPMENT PRINCIPLES
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>

              <div className="space-y-2.5 pt-1">
                {principles.map((principle, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{principle}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/[0.08] text-[11px] text-slate-400 font-mono">
                Dedicated to clean engineering, not short-lived shortcuts.
              </div>
            </div>

            {/* Column 3: FOLLOW ME & DIRECT CONTACT */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                CONNECT & VERIFIED CHANNELS
              </div>

              {/* Social Icon Buttons */}
              <div className="flex items-center gap-2.5">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all shadow-sm group"
                  aria-label="Ted Khalwale on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all shadow-sm group"
                  aria-label="Ted Khalwale on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all shadow-sm group"
                  aria-label="Ted Khalwale on X / Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>

                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all shadow-sm group"
                  aria-label="Ted Khalwale on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>

              {/* Contact direct entries */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-mono"
                  >
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{profile.email}</span>
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy Email"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                  <Phone className="w-3.5 h-3.5 text-indigo-400" />
                  <a href={`tel:${profile.phone}`} className="hover:text-white transition-colors">
                    {profile.phone}
                  </a>
                </div>

                <div className="text-[11px] text-slate-400 font-mono pt-1">
                  Location: {profile.location}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {profile.name} — Web Developer & Software Developer.
          </div>
          <div className="flex flex-wrap items-center gap-3 text-slate-500 font-mono text-[11px]">
            <span>Clean Code</span>
            <span>·</span>
            <span>Modern Web</span>
            <span>·</span>
            <span>Production Ready</span>
            {onOpenAdmin && (
              <>
                <span>·</span>
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Admin CMS Portal"
                >
                  <Lock className="w-3 h-3 text-slate-600" />
                  <span>Admin Login</span>
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
