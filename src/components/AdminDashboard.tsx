import React, { useState } from 'react';
import { DeveloperProfile, Project, SkillItem, Article } from '../types.ts';
import { 
  verifyAdminPasscode, 
  setAdminAuthenticated, 
  saveStoredProfile, 
  saveStoredProjects, 
  saveStoredSkills, 
  saveStoredArticles, 
  resetStoredData,
  setCustomPasscode 
} from '../services/adminStorage.ts';
import { 
  Lock, 
  Unlock, 
  LogOut, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  ExternalLink, 
  ArrowLeft, 
  User, 
  Briefcase, 
  Layers, 
  BookOpen, 
  Settings, 
  Download, 
  Upload, 
  ShieldCheck,
  AlertCircle,
  Image as ImageIcon,
  Star,
  UploadCloud,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

interface AdminDashboardProps {
  isAuthenticated: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
  onClose: () => void;
  profile: DeveloperProfile;
  setProfile: React.Dispatch<React.SetStateAction<DeveloperProfile>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  skills: SkillItem[];
  setSkills: React.Dispatch<React.SetStateAction<SkillItem[]>>;
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isAuthenticated,
  onLoginSuccess,
  onLogout,
  onClose,
  profile,
  setProfile,
  projects,
  setProjects,
  skills,
  setSkills,
  articles,
  setArticles,
}) => {
  // Login Form State
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab & Mobile Collapsible Sidebar State
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'articles' | 'system'>('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Local Edit States
  const [editingProfile, setEditingProfile] = useState<DeveloperProfile>(profile);
  const [editingProjects, setEditingProjects] = useState<Project[]>(projects);
  const [editingSkills, setEditingSkills] = useState<SkillItem[]>(skills);
  const [editingArticles, setEditingArticles] = useState<Article[]>(articles);

  // Selected Project for Editing / Creating
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  // Passcode update state
  const [newPass, setNewPass] = useState('');
  const [passUpdated, setPassUpdated] = useState(false);

  // New Screenshot Input State
  const [newScreenshotUrl, setNewScreenshotUrl] = useState('');

  // Image Management Handlers
  const handleUploadCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || selectedProjectIndex === null) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        const updated = [...editingProjects];
        updated[selectedProjectIndex].imageUrl = dataUrl;
        setEditingProjects(updated);
        showToast('Featured cover image updated!');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleUploadScreenshots = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || selectedProjectIndex === null) return;

    const fileList = Array.from(files);
    let loadedCount = 0;
    const newUrls: string[] = [];

    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) newUrls.push(dataUrl);
        loadedCount++;
        if (loadedCount === fileList.length) {
          const updated = [...editingProjects];
          const cur = updated[selectedProjectIndex].screenshots || [];
          updated[selectedProjectIndex].screenshots = [...cur, ...newUrls];
          setEditingProjects(updated);
          showToast(`${newUrls.length} screenshot(s) added to gallery!`);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleAddScreenshotUrl = () => {
    if (!newScreenshotUrl.trim() || selectedProjectIndex === null) return;
    const updated = [...editingProjects];
    const cur = updated[selectedProjectIndex].screenshots || [];
    updated[selectedProjectIndex].screenshots = [...cur, newScreenshotUrl.trim()];
    setEditingProjects(updated);
    setNewScreenshotUrl('');
    showToast('Screenshot added to project gallery!');
  };

  const handleRemoveScreenshot = (sIdx: number) => {
    if (selectedProjectIndex === null) return;
    const updated = [...editingProjects];
    const cur = updated[selectedProjectIndex].screenshots || [];
    updated[selectedProjectIndex].screenshots = cur.filter((_, idx) => idx !== sIdx);
    setEditingProjects(updated);
    showToast('Screenshot removed.');
  };

  const handleSetScreenshotAsCover = (sIdx: number) => {
    if (selectedProjectIndex === null) return;
    const updated = [...editingProjects];
    const cur = updated[selectedProjectIndex].screenshots || [];
    const shot = cur[sIdx];
    if (shot) {
      updated[selectedProjectIndex].imageUrl = shot;
      setEditingProjects(updated);
      showToast('Set as main cover image for homepage & catalog!');
    }
  };

  const handleMoveScreenshot = (sIdx: number, direction: 'left' | 'right') => {
    if (selectedProjectIndex === null) return;
    const updated = [...editingProjects];
    const cur = [...(updated[selectedProjectIndex].screenshots || [])];
    const targetIdx = direction === 'left' ? sIdx - 1 : sIdx + 1;
    if (targetIdx < 0 || targetIdx >= cur.length) return;
    const temp = cur[sIdx];
    cur[sIdx] = cur[targetIdx];
    cur[targetIdx] = temp;
    updated[selectedProjectIndex].screenshots = cur;
    setEditingProjects(updated);
  };

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPasscode(passcode)) {
      setAdminAuthenticated(true);
      onLoginSuccess();
      setLoginError('');
      setPasscode('');
    } else {
      setLoginError('Invalid admin password. Access denied.');
    }
  };

  // --- SAVE ACTIONS ---
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editingProfile);
    saveStoredProfile(editingProfile);
    showToast('Profile adjustments saved and applied to live site!');
  };

  const handleSaveProjects = () => {
    setProjects(editingProjects);
    saveStoredProjects(editingProjects);
    showToast('Projects catalog updated on live site!');
    setSelectedProjectIndex(null);
    setIsAddingProject(false);
  };

  const handleSaveSkills = () => {
    setSkills(editingSkills);
    saveStoredSkills(editingSkills);
    showToast('Master skills proficiency updated on live site!');
  };

  const handleSaveArticles = () => {
    setArticles(editingArticles);
    saveStoredArticles(editingArticles);
    showToast('Technical articles published to live site!');
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all site adjustments to factory defaults?')) {
      resetStoredData();
      window.location.reload();
    }
  };

  const handleExportBackup = () => {
    const backupData = {
      profile: editingProfile,
      projects: editingProjects,
      skills: editingSkills,
      articles: editingArticles,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ted-khalwale-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Configuration backup JSON exported!');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile) {
          setEditingProfile(parsed.profile);
          setProfile(parsed.profile);
          saveStoredProfile(parsed.profile);
        }
        if (parsed.projects) {
          setEditingProjects(parsed.projects);
          setProjects(parsed.projects);
          saveStoredProjects(parsed.projects);
        }
        if (parsed.skills) {
          setEditingSkills(parsed.skills);
          setSkills(parsed.skills);
          saveStoredSkills(parsed.skills);
        }
        if (parsed.articles) {
          setEditingArticles(parsed.articles);
          setArticles(parsed.articles);
          saveStoredArticles(parsed.articles);
        }
        showToast('Backup restored successfully!');
      } catch {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.trim().length >= 4) {
      setCustomPasscode(newPass.trim());
      setPassUpdated(true);
      setNewPass('');
      setTimeout(() => setPassUpdated(false), 3000);
      showToast('Admin passcode updated successfully!');
    }
  };

  // --- LOGIN VIEW ---
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
        <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-2xl p-6 sm:p-8 space-y-6 text-slate-900">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </button>
            <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
              <Lock className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-2 text-center pt-2">
            <h1 className="text-2xl font-extrabold text-slate-900 font-display tracking-tight">
              Admin Control Center
            </h1>
            <p className="text-xs text-slate-600">
              Enter your admin credentials to modify live website content, projects, and bio settings.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin_pass" className="block text-xs font-medium text-slate-700 mb-1.5 font-mono">
                Admin Password
              </label>
              <input
                type="password"
                id="admin_pass"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Access</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- AUTHENTICATED DASHBOARD VIEW ---
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#070914] text-slate-200 overflow-hidden">
      
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-semibold shadow-2xl backdrop-blur-md animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="h-16 px-3 sm:px-8 border-b border-white/10 bg-[#090d1f] flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Mobile Sidebar Toggle Button */}
          <button
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg border border-white/10 bg-slate-900/80 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Toggle admin sidebar"
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 truncate">
              <span className="truncate">Admin Adjustments Panel</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="hidden sm:inline text-[10px] font-mono text-emerald-400 font-normal">LIVE SYNC</span>
            </div>
            <div className="hidden sm:block text-[11px] text-slate-400 font-mono truncate">
              Signed in as Ted Khalwale
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/10 bg-slate-900/80 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <span className="hidden sm:inline">Preview Live Site</span>
            <span className="sm:hidden">Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              setAdminAuthenticated(false);
              onLogout();
            }}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-rose-900/50 bg-rose-950/40 hover:bg-rose-900/60 text-xs text-rose-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Mobile Horizontal Quick-Tab Strip */}
      <div className="md:hidden flex items-center gap-1.5 px-3 py-2 border-b border-white/10 bg-[#060814] overflow-x-auto shrink-0">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'projects', label: `Projects (${editingProjects.length})`, icon: Briefcase },
          { id: 'skills', label: `Skills (${editingSkills.length})`, icon: Layers },
          { id: 'articles', label: `Articles (${editingArticles.length})`, icon: BookOpen },
          { id: 'system', label: 'System', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab);
                setSidebarOpen(false);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-purple-600/25 text-purple-200 border border-purple-500/40'
                  : 'text-slate-400 hover:text-slate-200 bg-white/[0.03]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Layout: Left Sidebar Navigation + Content Canvas */}
      <div className="flex-1 flex relative overflow-hidden">
        
        {/* Mobile Sidebar Backdrop Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/75 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Collapsible Sidebar Tabs */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-40 w-64 border-r border-white/10 bg-[#060814] p-4 flex flex-col justify-between shrink-0 overflow-y-auto transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="space-y-1">
            {/* Mobile Drawer Header */}
            <div className="flex md:hidden items-center justify-between pb-3 mb-2 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold">
                CMS Navigation
              </span>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5 cursor-pointer"
                aria-label="Close sidebar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                setActiveTab('profile');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span>Profile &amp; Contact</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('projects');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Briefcase className="w-4 h-4 shrink-0" />
              <span>Projects ({editingProjects.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('skills');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'skills'
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span>Master Skills ({editingSkills.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('articles');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'articles'
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Articles &amp; Blog ({editingArticles.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('system');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'system'
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span>Backup &amp; Security</span>
            </button>
          </div>

          {/* Quick Actions Footer */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <button
              onClick={handleExportBackup}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[11px] font-mono text-slate-300 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-purple-400" />
              <span>Export JSON Backup</span>
            </button>
            <div className="text-[10px] text-slate-500 font-mono text-center">
              Changes persist in browser
            </div>
          </div>
        </aside>

        {/* Tab Canvas Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 bg-[#070914] min-w-0">
          <div className="max-w-4xl mx-auto pb-16">

            {/* TAB 1: PROFILE & CONTACT */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-8 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white font-display">Personal Profile &amp; Contact Details</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Edit headline, titles, biography, and communication channels.</p>
                  </div>
                  <button
                    type="submit"
                    className="liquid-glass-button inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white shadow-lg cursor-pointer self-start sm:self-auto"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Profile Changes</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={editingProfile.name}
                      onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs sm:text-sm focus:border-purple-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Professional Title</label>
                    <input
                      type="text"
                      value={editingProfile.title}
                      onChange={(e) => setEditingProfile({ ...editingProfile, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs sm:text-sm focus:border-purple-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Headline Pill Text</label>
                    <input
                      type="text"
                      value={editingProfile.headlineRole}
                      onChange={(e) => setEditingProfile({ ...editingProfile, headlineRole: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs sm:text-sm focus:border-purple-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Specialty / Subtitle</label>
                    <input
                      type="text"
                      value={editingProfile.specialty}
                      onChange={(e) => setEditingProfile({ ...editingProfile, specialty: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs sm:text-sm focus:border-purple-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={editingProfile.email}
                      onChange={(e) => setEditingProfile({ ...editingProfile, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs sm:text-sm focus:border-purple-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Phone Number</label>
                    <input
                      type="text"
                      value={editingProfile.phone}
                      onChange={(e) => setEditingProfile({ ...editingProfile, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs sm:text-sm focus:border-purple-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Location</label>
                    <input
                      type="text"
                      value={editingProfile.location}
                      onChange={(e) => setEditingProfile({ ...editingProfile, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs sm:text-sm focus:border-purple-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Avatar / Photo URL</label>
                    <input
                      type="text"
                      value={editingProfile.photoUrl || ''}
                      onChange={(e) => setEditingProfile({ ...editingProfile, photoUrl: e.target.value })}
                      placeholder="/avatar.svg or https://..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs sm:text-sm focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Short Bio (Hero &amp; Meta)</label>
                    <textarea
                      rows={2}
                      value={editingProfile.bio}
                      onChange={(e) => setEditingProfile({ ...editingProfile, bio: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs sm:text-sm focus:border-purple-400 focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">About Section Full Description</label>
                    <textarea
                      rows={3}
                      value={editingProfile.aboutDescription}
                      onChange={(e) => setEditingProfile({ ...editingProfile, aboutDescription: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs sm:text-sm focus:border-purple-400 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-4">
                  <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-purple-300">Social Channel URLs</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">GitHub URL</label>
                      <input
                        type="url"
                        value={editingProfile.github}
                        onChange={(e) => setEditingProfile({ ...editingProfile, github: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/15 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">LinkedIn URL</label>
                      <input
                        type="url"
                        value={editingProfile.linkedin}
                        onChange={(e) => setEditingProfile({ ...editingProfile, linkedin: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/15 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">X / Twitter URL</label>
                      <input
                        type="url"
                        value={editingProfile.twitter}
                        onChange={(e) => setEditingProfile({ ...editingProfile, twitter: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/15 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Instagram URL</label>
                      <input
                        type="url"
                        value={editingProfile.instagram}
                        onChange={(e) => setEditingProfile({ ...editingProfile, instagram: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/15 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}

            {/* TAB 2: PROJECTS MANAGER */}
            {activeTab === 'projects' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white font-display">Showcased Projects &amp; Products</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Manage portfolio works, case studies, technologies, and metrics.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => {
                        const newProj: Project = {
                          id: `project-${Date.now()}`,
                          orderNumber: `0${editingProjects.length + 1}`,
                          title: "New Custom System",
                          category: "business",
                          role: "Full-Stack Developer",
                          status: "Production Ready",
                          tagline: "Custom business software solution",
                          period: "2025 · Custom System",
                          summary: "Overview of the project...",
                          problem: "The client operational bottleneck...",
                          solution: "The engineered software solution...",
                          keyFeatures: ["Feature 1", "Feature 2"],
                          technologies: ["React", "TypeScript", "Node.js"],
                          imageUrl: "/projects/retailflow.svg",
                          screenshots: ["/projects/retailflow.svg"]
                        };
                        setEditingProjects([...editingProjects, newProj]);
                        setSelectedProjectIndex(editingProjects.length);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Project</span>
                    </button>
                    <button
                      onClick={handleSaveProjects}
                      className="liquid-glass-button inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-md cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Publish Changes</span>
                    </button>
                  </div>
                </div>

                {/* Project List */}
                <div className="grid grid-cols-1 gap-3">
                  {editingProjects.map((project, idx) => (
                    <div 
                      key={project.id}
                      className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        selectedProjectIndex === idx
                          ? 'border-purple-400/80 bg-purple-950/20'
                          : 'border-white/10 bg-slate-900/60 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title} 
                          className="w-16 h-12 object-cover rounded-lg border border-white/10 shrink-0 bg-slate-950" 
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-purple-400 font-bold">{project.orderNumber}</span>
                            <span className="text-sm font-bold text-white">{project.title}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                              {project.category}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 mt-1 max-w-lg truncate">
                            {project.tagline}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setSelectedProjectIndex(selectedProjectIndex === idx ? null : idx)}
                          className="p-2 text-slate-300 hover:text-white rounded-lg bg-white/5 border border-white/10 cursor-pointer"
                          title="Edit Project"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${project.title}"?`)) {
                              const updated = editingProjects.filter((_, pIdx) => pIdx !== idx);
                              setEditingProjects(updated);
                              if (selectedProjectIndex === idx) setSelectedProjectIndex(null);
                            }
                          }}
                          className="p-2 text-rose-400 hover:text-rose-300 rounded-lg bg-rose-950/30 border border-rose-900/50 cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Edit Drawer for Selected Project */}
                {selectedProjectIndex !== null && editingProjects[selectedProjectIndex] && (
                  <div className="p-6 rounded-2xl border border-purple-500/40 bg-[#0c1024] space-y-5 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-purple-400" />
                        <span>Editing: {editingProjects[selectedProjectIndex].title}</span>
                      </h3>
                      <button
                        onClick={() => setSelectedProjectIndex(null)}
                        className="text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
                      >
                        Done Editing
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Title</label>
                        <input
                          type="text"
                          value={editingProjects[selectedProjectIndex].title}
                          onChange={(e) => {
                            const updated = [...editingProjects];
                            updated[selectedProjectIndex].title = e.target.value;
                            setEditingProjects(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/15 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Tagline</label>
                        <input
                          type="text"
                          value={editingProjects[selectedProjectIndex].tagline}
                          onChange={(e) => {
                            const updated = [...editingProjects];
                            updated[selectedProjectIndex].tagline = e.target.value;
                            setEditingProjects(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/15 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
                        <select
                          value={editingProjects[selectedProjectIndex].category}
                          onChange={(e) => {
                            const updated = [...editingProjects];
                            updated[selectedProjectIndex].category = e.target.value as Project['category'];
                            setEditingProjects(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/15 text-white text-xs"
                        >
                          <option value="business">business (Business System)</option>
                          <option value="dashboard">dashboard (Dashboard)</option>
                          <option value="saas">saas (SaaS Application)</option>
                          <option value="web">web (Web Application)</option>
                        </select>
                      </div>
                    </div>

                    {/* SECTION: FEATURED COVER IMAGE (HOMEPAGE & CATALOG) */}
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
                        <div>
                          <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Featured Main Cover (Homepage &amp; Catalog View)</span>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Primary display card image on the homepage and products showcase.
                          </p>
                        </div>
                        {editingProjects[selectedProjectIndex].imageUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...editingProjects];
                              updated[selectedProjectIndex].imageUrl = '';
                              setEditingProjects(updated);
                              showToast('Cover image removed');
                            }}
                            className="text-[11px] text-rose-400 hover:text-rose-300 font-mono flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove Cover</span>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* Cover Image Thumbnail Preview */}
                        <div className="md:col-span-4 flex flex-col items-center">
                          <div className="relative w-full h-28 rounded-xl overflow-hidden bg-slate-950 border border-white/10 flex items-center justify-center group shadow-inner">
                            {editingProjects[selectedProjectIndex].imageUrl ? (
                              <img
                                src={editingProjects[selectedProjectIndex].imageUrl}
                                alt="Main Cover Preview"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <div className="text-center p-3 text-slate-500 font-mono text-[11px]">
                                <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-40" />
                                <span>No Cover Set</span>
                              </div>
                            )}
                            <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[9px] font-mono text-purple-300 border border-purple-500/30">
                              COVER
                            </div>
                          </div>
                        </div>

                        {/* Controls: URL Input, Upload from Device, Quick Presets */}
                        <div className="md:col-span-8 space-y-2.5">
                          <div>
                            <label className="block text-[11px] font-mono text-slate-400 mb-1">
                              Cover Image URL
                            </label>
                            <input
                              type="text"
                              value={editingProjects[selectedProjectIndex].imageUrl}
                              onChange={(e) => {
                                const updated = [...editingProjects];
                                updated[selectedProjectIndex].imageUrl = e.target.value;
                                setEditingProjects(updated);
                              }}
                              placeholder="/projects/retailflow.svg or https://..."
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/15 text-white text-xs font-mono focus:border-purple-400 focus:outline-none"
                            />
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            {/* Upload from Computer/Phone */}
                            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 text-purple-200 text-xs font-semibold transition-colors cursor-pointer shadow-sm">
                              <UploadCloud className="w-3.5 h-3.5" />
                              <span>Upload Cover from Device</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleUploadCoverImage}
                                className="hidden"
                              />
                            </label>

                            {/* Preset Buttons */}
                            <span className="text-[10px] text-slate-500 font-mono">Presets:</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...editingProjects];
                                updated[selectedProjectIndex].imageUrl = '/projects/retailflow.svg';
                                setEditingProjects(updated);
                              }}
                              className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 cursor-pointer"
                            >
                              RetailFlow POS
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...editingProjects];
                                updated[selectedProjectIndex].imageUrl = '/projects/procurecore.svg';
                                setEditingProjects(updated);
                              }}
                              className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 cursor-pointer"
                            >
                              ProcureCore ERP
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...editingProjects];
                                updated[selectedProjectIndex].imageUrl = '/projects/hospitality.svg';
                                setEditingProjects(updated);
                              }}
                              className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 cursor-pointer"
                            >
                              Hospitality PMS
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECTION: SCREENSHOTS GALLERY (PRODUCT MODAL & DETAIL INFORMATION PAGES) */}
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
                        <div>
                          <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                            <span>
                              Screenshots Gallery &amp; Product Page Views ({ (editingProjects[selectedProjectIndex].screenshots || []).length })
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Full-fidelity UI screenshots displayed inside the project modal and product information page.
                          </p>
                        </div>

                        {/* Upload Multiple Screenshots Button */}
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/40 hover:bg-indigo-600/60 border border-indigo-500/50 text-indigo-200 text-xs font-semibold transition-colors cursor-pointer shadow-sm">
                          <UploadCloud className="w-3.5 h-3.5" />
                          <span>Upload Screenshots</span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleUploadScreenshots}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Add by URL toolbar */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newScreenshotUrl}
                          onChange={(e) => setNewScreenshotUrl(e.target.value)}
                          placeholder="Paste image URL (e.g. /projects/procurecore.svg or https://...)"
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-white/15 text-white text-xs font-mono focus:border-purple-400 focus:outline-none"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddScreenshotUrl();
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleAddScreenshotUrl}
                          className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add URL</span>
                        </button>
                      </div>

                      {/* Screenshots Visual Grid */}
                      {(editingProjects[selectedProjectIndex].screenshots || []).length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
                          {(editingProjects[selectedProjectIndex].screenshots || []).map((shotUrl, sIdx) => {
                            const isCurrentCover = editingProjects[selectedProjectIndex].imageUrl === shotUrl;
                            return (
                              <div
                                key={sIdx}
                                className="group relative rounded-xl overflow-hidden bg-slate-950 border border-white/10 hover:border-purple-400/60 transition-all flex flex-col justify-between"
                              >
                                {/* Thumbnail Image */}
                                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                                  <img
                                    src={shotUrl}
                                    alt={`Screenshot ${sIdx + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                  />
                                  <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[9px] font-mono text-slate-300">
                                    #{sIdx + 1}
                                  </div>
                                  {isCurrentCover && (
                                    <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/50 text-[9px] font-mono text-emerald-300 flex items-center gap-1">
                                      <Star className="w-2.5 h-2.5 fill-emerald-300" />
                                      <span>Cover</span>
                                    </div>
                                  )}
                                </div>

                                {/* Thumbnail Action Controls */}
                                <div className="p-1.5 bg-[#0a0d1e] border-t border-white/10 flex items-center justify-between text-xs">
                                  {/* Reorder Buttons */}
                                  <div className="flex items-center gap-0.5">
                                    <button
                                      type="button"
                                      disabled={sIdx === 0}
                                      onClick={() => handleMoveScreenshot(sIdx, 'left')}
                                      className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                      title="Move Left in Gallery"
                                    >
                                      <ChevronLeft className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      disabled={sIdx === (editingProjects[selectedProjectIndex].screenshots || []).length - 1}
                                      onClick={() => handleMoveScreenshot(sIdx, 'right')}
                                      className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                      title="Move Right in Gallery"
                                    >
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                  </div>

                                  <div className="flex items-center gap-1">
                                    {/* Set as Main Cover Button */}
                                    {!isCurrentCover && (
                                      <button
                                        type="button"
                                        onClick={() => handleSetScreenshotAsCover(sIdx)}
                                        className="p-1 text-slate-400 hover:text-emerald-300 transition-colors cursor-pointer"
                                        title="Promote to Main Featured Cover"
                                      >
                                        <Star className="w-3.5 h-3.5" />
                                      </button>
                                    )}

                                    {/* Delete Screenshot Button */}
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveScreenshot(sIdx)}
                                      className="p-1 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                                      title="Delete Screenshot"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl border border-dashed border-white/15 bg-white/[0.02] text-center text-xs text-slate-400 space-y-1 font-mono">
                          <ImageIcon className="w-6 h-6 mx-auto text-slate-500 opacity-60" />
                          <div>No gallery screenshots added yet for this project.</div>
                          <div className="text-[11px] text-slate-500">
                            Upload PNG/JPG screenshots above or paste direct URLs to display multiple UI views in the case study modal.
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Technologies (Comma-separated)</label>
                      <input
                        type="text"
                        value={editingProjects[selectedProjectIndex].technologies.join(', ')}
                        onChange={(e) => {
                          const updated = [...editingProjects];
                          updated[selectedProjectIndex].technologies = e.target.value.split(',').map((t) => t.trim());
                          setEditingProjects(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/15 text-white text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Problem Description</label>
                        <textarea
                          rows={3}
                          value={editingProjects[selectedProjectIndex].problem}
                          onChange={(e) => {
                            const updated = [...editingProjects];
                            updated[selectedProjectIndex].problem = e.target.value;
                            setEditingProjects(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/15 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Architecture Solution</label>
                        <textarea
                          rows={3}
                          value={editingProjects[selectedProjectIndex].solution}
                          onChange={(e) => {
                            const updated = [...editingProjects];
                            updated[selectedProjectIndex].solution = e.target.value;
                            setEditingProjects(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/15 text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: MASTER SKILLS */}
            {activeTab === 'skills' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white font-display">Technical Skills &amp; Proficiencies</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Adjust proficiency percentages, add tools, or re-order skills.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => {
                        const newSkill: SkillItem = {
                          name: "New Technology",
                          percentage: 85,
                          icon: "code"
                        };
                        setEditingSkills([...editingSkills, newSkill]);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Skill</span>
                    </button>
                    <button
                      onClick={handleSaveSkills}
                      className="liquid-glass-button inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-md cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Proficiencies</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {editingSkills.map((skill, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => {
                            const updated = [...editingSkills];
                            updated[idx].name = e.target.value;
                            setEditingSkills(updated);
                          }}
                          className="font-bold text-white text-sm bg-transparent border-b border-transparent hover:border-white/20 focus:border-purple-400 focus:outline-none min-w-0 flex-1"
                        />
                        <button
                          onClick={() => {
                            const updated = editingSkills.filter((_, sIdx) => sIdx !== idx);
                            setEditingSkills(updated);
                          }}
                          className="text-slate-500 hover:text-rose-400 transition-colors p-1 cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono text-slate-400">
                          <span>Proficiency</span>
                          <span className="text-purple-300 font-bold">{skill.percentage}%</span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="100"
                          value={skill.percentage}
                          onChange={(e) => {
                            const updated = [...editingSkills];
                            updated[idx].percentage = Number(e.target.value);
                            setEditingSkills(updated);
                          }}
                          className="w-full accent-purple-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: ARTICLES & BLOG */}
            {activeTab === 'articles' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white font-display">Technical Articles &amp; Insights</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Author and update your engineering thought pieces.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => {
                        const newArt: Article = {
                          id: `article-${Date.now()}`,
                          title: "New Engineering Insight",
                          date: "2025",
                          readTime: "4 min read",
                          category: "Architecture",
                          summary: "Summary of engineering insights...",
                          content: "Detailed markdown content..."
                        };
                        setEditingArticles([...editingArticles, newArt]);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Write Article</span>
                    </button>
                    <button
                      onClick={handleSaveArticles}
                      className="liquid-glass-button inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-md cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Articles</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {editingArticles.map((art, idx) => (
                    <div key={art.id} className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-white/10 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2 min-w-0">
                          <input
                            type="text"
                            value={art.title}
                            onChange={(e) => {
                              const updated = [...editingArticles];
                              updated[idx].title = e.target.value;
                              setEditingArticles(updated);
                            }}
                            className="font-bold text-white text-base bg-transparent border-b border-white/10 w-full focus:border-purple-400 focus:outline-none pb-1"
                          />
                          <div className="flex flex-wrap gap-3 sm:gap-4">
                            <input
                              type="text"
                              value={art.category}
                              onChange={(e) => {
                                const updated = [...editingArticles];
                                updated[idx].category = e.target.value;
                                setEditingArticles(updated);
                              }}
                              className="text-xs font-mono text-purple-400 bg-transparent border-b border-white/10 w-36"
                              placeholder="Category"
                            />
                            <input
                              type="text"
                              value={art.readTime}
                              onChange={(e) => {
                                const updated = [...editingArticles];
                                updated[idx].readTime = e.target.value;
                                setEditingArticles(updated);
                              }}
                              className="text-xs font-mono text-slate-400 bg-transparent border-b border-white/10 w-28"
                              placeholder="Read time"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${art.title}"?`)) {
                              setEditingArticles(editingArticles.filter((_, aIdx) => aIdx !== idx));
                            }
                          }}
                          className="text-slate-500 hover:text-rose-400 transition-colors p-1.5 cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Summary</label>
                        <textarea
                          rows={2}
                          value={art.summary}
                          onChange={(e) => {
                            const updated = [...editingArticles];
                            updated[idx].summary = e.target.value;
                            setEditingArticles(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/15 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Markdown Content</label>
                        <textarea
                          rows={6}
                          value={art.content}
                          onChange={(e) => {
                            const updated = [...editingArticles];
                            updated[idx].content = e.target.value;
                            setEditingArticles(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/15 text-white text-xs font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: BACKUP & SECURITY */}
            {activeTab === 'system' && (
              <div className="space-y-8 animate-fade-in">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="text-xl font-bold text-white font-display">System Backup &amp; Admin Security</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Manage data snapshots, export code-ready JSON, or update your passcode.</p>
                </div>

                {/* Change Passcode */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                    <Lock className="w-4 h-4 text-purple-400" />
                    <span>Change Admin Passcode</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Set a new personal passcode for logging into this admin panel.
                  </p>
                  <form onSubmit={handleChangePasscode} className="flex flex-col sm:flex-row gap-3 max-w-md">
                    <input
                      type="password"
                      placeholder="Enter new passcode (min 4 characters)"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-purple-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="liquid-glass-button px-4 py-2.5 rounded-xl text-xs font-semibold text-white cursor-pointer"
                    >
                      Update
                    </button>
                  </form>
                  {passUpdated && (
                    <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>Passcode updated successfully!</span>
                    </div>
                  )}
                </div>

                {/* Backup & Restore */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                    <Download className="w-4 h-4 text-indigo-400" />
                    <span>Data Backup &amp; Migration</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Download an offline JSON file containing all customized text, projects, and skills. You can import it on another computer or after clearing your browser cache.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleExportBackup}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download JSON Snapshot</span>
                    </button>

                    <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-white/15 transition-colors cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>Import JSON Snapshot</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportBackup}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Reset to Defaults */}
                <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/50 space-y-4">
                  <h3 className="text-sm font-bold text-rose-300 font-mono flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-rose-400" />
                    <span>Reset to Defaults</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Clears all localStorage adjustments and returns the portfolio to the original built-in state.
                  </p>
                  <button
                    onClick={handleResetToDefaults}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-900/80 hover:bg-rose-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All Adjustments</span>
                  </button>
                </div>

              </div>
            )}

          </div>
        </main>

      </div>

    </div>
  );
};
