import { ReactNode } from "react";

export interface Category {
  name: string;
  value: string;
}

export interface Project {
  id: string; // Changed from number to string to match data/projects.ts
  title: string;
  description: string;
  fullDescription?: string; // Added as optional
  image: string;
  technologies: string[];
  features?: string[]; // Added as optional
  category: string | string[]; // Changed to match how it's used in the filter
  liveUrl?: string; // Added as optional, equivalent to demoUrl
  githubUrl?: string; // Added as optional, equivalent to codeUrl
  demoUrl?: string; // Made optional
  codeUrl?: string; // Made optional
}

export interface FilteredProjectsSectionProps {
  categories: Category[];
  setFilter: (value: string) => void;
  filter: string;
  filteredProjects: Project[];
}

export interface ProjectFormData {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
}

export interface FilteredProjectsSectionProps {
  categories: Category[];
  setFilter: (value: string) => void;
  filter: string;
  filteredProjects: Project[];
  currentPage: number;
  totalPages: number;
  loadMoreFeaturedProjects: () => Promise<void>;
  loadingMore: boolean;
}

export interface ProjectFormData {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
}

export interface ProjectsProviderProps {
  children: ReactNode;
}

export interface ProjectsContextType {
  apiUrl: string;
  // For testimonials page (paginated)
  projects: Project[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  pageLimit: number;
  currentProject: Project | null;
  loadingProject: boolean;
  projectError: string | null;

  // Methods
  fetchActiveProjects: (page: number, limit: number) => Promise<void>;
  loadMoreActiveProjects: () => Promise<void>;
  fetchProjectById: (id: string) => Promise<void>;
}
