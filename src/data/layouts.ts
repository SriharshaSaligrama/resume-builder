import { LayoutOption } from '../types/resume';

export const resumeLayouts: LayoutOption[] = [
  {
    id: 'single-column',
    name: 'Single Column',
    description: 'Traditional single-column layout with full-width sections',
    icon: '📄',
    features: ['Full-width content', 'Traditional flow', 'Easy to read', 'ATS-friendly'],
    bestFor: ['Traditional industries', 'Senior positions', 'Academic roles', 'Government jobs']
  },
  {
    id: 'two-column',
    name: 'Two Column',
    description: 'Balanced two-column layout with equal width sections',
    icon: '📰',
    features: ['Balanced columns', 'Space efficient', 'Modern look', 'Good for content-heavy resumes'],
    bestFor: ['Tech roles', 'Creative positions', 'Consulting', 'Project managers']
  },
  {
    id: 'sidebar-left',
    name: 'Left Sidebar',
    description: 'Narrow left sidebar for skills and contact, main content on right',
    icon: '📋',
    features: ['Prominent skills section', 'Clean separation', 'Modern design', 'Highlights expertise'],
    bestFor: ['Technical roles', 'Design positions', 'Freelancers', 'Specialists']
  },
  {
    id: 'sidebar-right',
    name: 'Right Sidebar',
    description: 'Main content on left, narrow right sidebar for additional info',
    icon: '📊',
    features: ['Content-focused', 'Professional look', 'Good for experience-heavy resumes', 'Clean layout'],
    bestFor: ['Management roles', 'Sales positions', 'Marketing', 'Business development']
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Dense layout that fits more content in less space',
    icon: '📑',
    features: ['Space efficient', 'Fits more content', 'Clean typography', 'Professional'],
    bestFor: ['Experienced professionals', 'Multiple roles', 'Extensive portfolios', 'Academic CVs']
  }
];