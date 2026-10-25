export interface SkillItem {
  name: string;
  percentage: number;
  icon: string;
  category?: string;
  level?: string;
}

export interface MeasurableResult {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  orderNumber: string;
  title: string;
  category: 'web' | 'business' | 'dashboard' | 'fullstack' | 'saas' | string;
  tagline: string;
  summary: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  technologies: string[];
  role: string;
  status: 'Production Ready' | 'Active' | 'Completed' | 'In Development' | string;
  period: string;
  imageUrl?: string;
  screenshots?: string[];
  githubUrl?: string;
  liveUrl?: string;
  measurableResults?: MeasurableResult[];
  mockupType?: 'ecommerce' | 'taskmanager' | 'crypto' | 'dashboard' | 'business';
  caseStudy?: {
    challenge?: string;
    architectureSolution?: string;
    tradeoffs?: string;
    codeSnippet?: {
      language: string;
      code: string;
      caption: string;
    };
    results?: string[];
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  badge?: string;
  description: string;
  achievements: string[];
  stack: string[];
}

export interface TechSkillCategory {
  name: string;
  description: string;
  skills: {
    name: string;
    level: 'Advanced' | 'Expert' | 'Specialist';
    productionHighlight: string;
  }[];
}

export interface Article {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  content: string;
}

export interface FocusArea {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: 'globe' | 'briefcase' | 'layout-dashboard' | 'cpu' | string;
  technologies: string[];
}

export interface DeveloperProfile {
  name: string;
  title: string;
  headlineRole: string;
  specialty: string;
  bio: string;
  aboutDescription: string;
  location: string;
  timezone: string;
  email: string;
  phone: string;
  photoUrl?: string;
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  yearsExperience: number;
  focusAreas: FocusArea[];
}
