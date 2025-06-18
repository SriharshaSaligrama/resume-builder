export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  portfolio: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa?: string;
  location: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Resume {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  skills: Skill[];
}

export type TemplateId = 'modern-blue' | 'elegant-purple' | 'professional-green' | 'creative-orange' | 'minimal-gray';

export type FontFamily = 'inter' | 'roboto' | 'open-sans' | 'lato' | 'source-sans' | 'poppins' | 'nunito' | 'work-sans';

export interface ResumeTemplate {
  id: TemplateId;
  name: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  preview: string;
}

export interface FontOption {
  id: FontFamily;
  name: string;
  description: string;
  fontFamily: string;
  category: 'modern' | 'classic' | 'elegant';
}