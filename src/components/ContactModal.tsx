import React, { useState, useEffect, useRef } from 'react';
import { DeveloperProfile } from '../types.ts';
import { X, Send, Check, Mail, Phone, AlertCircle, Loader2, Copy, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  profile: DeveloperProfile;
  onClose: () => void;
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, profile, onClose }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'Business Management System',
    message: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedDraft, setCopiedDraft] = useState(false);
  const lastSubmitTimeRef = useRef<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const projectOptions = [
    'Business Management System',
    'Modern Website / Web App',
    'Interactive Dashboard',
    'Custom Business Software',
    'Contract / Freelance Engineering',
    'Other Inquiry'
  ];

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Project Inquiry: ${formState.projectType} — ${formState.name.trim() || 'Client'}`
  )}&body=${encodeURIComponent(
    `Hi Ted,\n\nName: ${formState.name.trim() || '[Your Name]'}\nEmail: ${formState.email.trim() || '[Your Email]'}\nProject Type: ${formState.projectType}\n\nProject Scope & Requirements:\n${formState.message.trim() || '[Project details]'}\n\nBest regards,\n${formState.name.trim() || ''}`
  )}`;

  const handleCopyDraft = () => {
    const draftText = `To: ${profile.email}\nSubject: Project Inquiry: ${formState.projectType} — ${formState.name.trim() || 'Client'}\n\nHi Ted,\n\nName: ${formState.name.trim() || 'Client'}\nEmail: ${formState.email.trim() || 'Not specified'}\nProject Type: ${formState.projectType}\n\nProject Scope:\n${formState.message.trim() || 'Project inquiry'}`;
    navigator.clipboard.writeText(draftText);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Anti-spam honeypot verification
    if (honeypot.trim() !== '') {
      setStatus('success');
      return;
    }

    // 2. Rate-limiting check
    const now = Date.now();
    if (now - lastSubmitTimeRef.current < 20000) {
      setErrorMessage('Please wait a few seconds before submitting another inquiry.');
      setStatus('error');
      return;
    }

    // 3. Client-side input validation
    const trimmedName = formState.name.trim();
    const trimmedEmail = formState.email.trim();
    const trimmedMessage = formState.message.trim();

    if (trimmedName.length < 2) {
      setErrorMessage('Please provide your name (at least 2 characters).');
      setStatus('error');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setErrorMessage('Please provide a valid email address (e.g. name@domain.com).');
      setStatus('error');
      return;
    }

    if (trimmedMessage.length < 10) {
      setErrorMessage('Please include a brief overview of your project requirements (at least 10 characters).');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    // 4. Primary Form Gateway Pipeline
    const endpoint = 
      import.meta.env.VITE_CONTACT_ENDPOINT || 
      `https://formsubmit.co/ajax/${encodeURIComponent(profile.email)}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          projectType: formState.projectType,
          message: trimmedMessage,
          _subject: `New Project Inquiry from ${trimmedName} (${formState.projectType})`,
          _captcha: 'false',
          _template: 'table'
        })
      });

      lastSubmitTimeRef.current = Date.now();

      if (response.ok) {
        setStatus('success');
      } else {
        const errorData = await response.json().catch(() => ({}));
        const serverError = errorData.message || 'The form gateway encountered a temporary error.';
        setErrorMessage(`${serverError} You can also send your message directly via email below.`);
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network connection to the messaging gateway timed out. Please click below to send via your email client.');
      setStatus('error');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-8 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 id="contact-modal-title" className="text-sm font-bold text-slate-900 font-sans">
              Contact Ted Khalwale · Project Inquiry
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors rounded-lg bg-white border border-slate-200 cursor-pointer"
            aria-label="Close contact dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {status === 'success' ? (
            <div className="py-6 text-center space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Inquiry Dispatched Successfully!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formState.name}</strong>. Your project inquiry has been delivered directly to Ted Khalwale. A review will be conducted and a response sent to <strong className="text-indigo-600">{formState.email}</strong> shortly.
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormState({ name: '', email: '', projectType: 'Business Management System', message: '' });
                    onClose();
                  }}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-full shadow-sm cursor-pointer"
                >
                  Close Window
                </button>

                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormState({ name: '', email: '', projectType: 'Business Management System', message: '' });
                  }}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-full border border-slate-300 hover:bg-slate-50 cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              
              {/* Error Alert Box with Immediate Fallback Channels */}
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-2.5 animate-fade-in">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{errorMessage || 'Unable to deliver message through the gateway.'}</span>
                  </div>
                  <div className="pt-1 flex flex-wrap gap-2">
                    <a
                      href={mailtoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Email Client</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyDraft}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs transition-colors cursor-pointer"
                    >
                      {copiedDraft ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedDraft ? 'Draft Copied!' : 'Copy Draft'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Honeypot field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_hp">Leave this field empty</label>
                <input
                  type="text"
                  id="website_hp"
                  name="website_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact_name" className="block text-xs font-medium text-slate-700 mb-1.5">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact_name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    disabled={status === 'submitting'}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact_email" className="block text-xs font-medium text-slate-700 mb-1.5">
                    Your Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact_email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="alex@company.com"
                    disabled={status === 'submitting'}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact_type" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Project or Inquiry Type
                </label>
                <select
                  id="contact_type"
                  value={formState.projectType}
                  onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                  disabled={status === 'submitting'}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                >
                  {projectOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-white text-slate-900">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact_message" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Project Scope &amp; Goals <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="contact_message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Describe your business, key features required, and target deployment timeline..."
                  disabled={status === 'submitting'}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-indigo-600 shrink-0" />
                  <span>Direct inbox: <strong className="text-slate-800">{profile.email}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={status === 'submitting'}
                    className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-full shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          )}

          {/* Direct Channels Footer */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-mono">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-600" />
              <a href={`mailto:${profile.email}`} className="text-slate-700 hover:text-slate-950 transition-colors">
                {profile.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-600" />
              <a href={`tel:${profile.phone}`} className="text-slate-700 hover:text-slate-950 transition-colors">
                {profile.phone}
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
