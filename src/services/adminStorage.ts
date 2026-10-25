import { DeveloperProfile, Project, SkillItem, Article } from '../types.ts';
import { 
  defaultProfile, 
  featuredProjects, 
  masterSkills, 
  technicalArticles 
} from '../data/portfolioData.ts';

const PROFILE_KEY = 'tk_portfolio_profile_v1';
const PROJECTS_KEY = 'tk_portfolio_projects_v1';
const SKILLS_KEY = 'tk_portfolio_skills_v1';
const ARTICLES_KEY = 'tk_portfolio_articles_v1';
const ADMIN_AUTH_KEY = 'tk_admin_authenticated';
const ADMIN_PASS_KEY = 'tk_admin_passcode_hash';

// Default master administrator passcode for deployment
const DEFAULT_PASSCODE = 'teddyfaida1234.';

export const loadStoredProfile = (): DeveloperProfile => {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return defaultProfile;
    const parsed = JSON.parse(raw);
    if (!parsed.photoUrl || parsed.photoUrl === '/avatar.svg' || parsed.photoUrl === '/ted-khalwale.jpg') {
      parsed.photoUrl = defaultProfile.photoUrl;
    }
    return { ...defaultProfile, ...parsed };
  } catch {
    return defaultProfile;
  }
};

export const saveStoredProfile = (profile: DeveloperProfile): void => {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile to localStorage', e);
  }
};

export const loadStoredProjects = (): Project[] => {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) return featuredProjects;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : featuredProjects;
  } catch {
    return featuredProjects;
  }
};

export const saveStoredProjects = (projects: Project[]): void => {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save projects to localStorage', e);
  }
};

export const loadStoredSkills = (): SkillItem[] => {
  try {
    const raw = localStorage.getItem(SKILLS_KEY);
    if (!raw) return masterSkills;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : masterSkills;
  } catch {
    return masterSkills;
  }
};

export const saveStoredSkills = (skills: SkillItem[]): void => {
  try {
    localStorage.setItem(SKILLS_KEY, JSON.stringify(skills));
  } catch (e) {
    console.error('Failed to save skills to localStorage', e);
  }
};

export const loadStoredArticles = (): Article[] => {
  try {
    const raw = localStorage.getItem(ARTICLES_KEY);
    if (!raw) return technicalArticles;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : technicalArticles;
  } catch {
    return technicalArticles;
  }
};

export const saveStoredArticles = (articles: Article[]): void => {
  try {
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
  } catch (e) {
    console.error('Failed to save articles to localStorage', e);
  }
};

export const resetStoredData = (): void => {
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(PROJECTS_KEY);
  localStorage.removeItem(SKILLS_KEY);
  localStorage.removeItem(ARTICLES_KEY);
};

export const isAdminAuthenticated = (): boolean => {
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
};

export const setAdminAuthenticated = (val: boolean): void => {
  if (val) {
    sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
  } else {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  }
};

export const verifyAdminPasscode = (input: string): boolean => {
  const stored = localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_PASSCODE;
  return input === stored;
};

export const setCustomPasscode = (newPass: string): void => {
  localStorage.setItem(ADMIN_PASS_KEY, newPass);
};
