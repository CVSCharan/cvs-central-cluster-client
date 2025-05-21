import { create } from "zustand";
import { Project } from "@/types/projects";

interface ProjectsState {
  // State for all projects
  projects: Project[];
  projectsLoading: boolean;
  projectsLoadingMore: boolean;
  projectsError: string | null;
  projectsCurrentPage: number;
  projectsTotalPages: number;
  projectsPageLimit: number;

  // State for active projects
  activeProjects: Project[];
  activeProjectsLoading: boolean;
  activeProjectsLoadingMore: boolean;
  activeProjectsError: string | null;
  activeProjectsCurrentPage: number;
  activeProjectsTotalPages: number;
  activeProjectsPageLimit: number;

  // State for featured projects
  featuredProjects: Project[];
  featuredProjectsLoading: boolean;
  featuredProjectsLoadingMore: boolean;
  featuredProjectsError: string | null;
  featuredProjectsCurrentPage: number;
  featuredProjectsTotalPages: number;
  featuredProjectsPageLimit: number;

  // Shared state
  currentProject: Project | null;
  loadingProject: boolean;
  projectError: string | null;
  apiUrl: string;

  // Actions
  fetchProjects: (page?: number, limit?: number) => Promise<void>;
  loadMoreProjects: () => Promise<void>;
  fetchActiveProjects: (page?: number, limit?: number) => Promise<void>;
  loadMoreActiveProjects: () => Promise<void>;
  fetchFeaturedProjects: (page?: number, limit?: number) => Promise<void>;
  loadMoreFeaturedProjects: () => Promise<void>;
  fetchProjectById: (id: string) => Promise<void>;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  // State for all projects
  projects: [],
  projectsLoading: false,
  projectsLoadingMore: false,
  projectsError: null,
  projectsCurrentPage: 1,
  projectsTotalPages: 1,
  projectsPageLimit: 6,

  // State for active projects
  activeProjects: [],
  activeProjectsLoading: false,
  activeProjectsLoadingMore: false,
  activeProjectsError: null,
  activeProjectsCurrentPage: 1,
  activeProjectsTotalPages: 1,
  activeProjectsPageLimit: 4,

  // State for featured projects
  featuredProjects: [],
  featuredProjectsLoading: false,
  featuredProjectsLoadingMore: false,
  featuredProjectsError: null,
  featuredProjectsCurrentPage: 1,
  featuredProjectsTotalPages: 1,
  featuredProjectsPageLimit: 4,

  // Shared state
  currentProject: null,
  loadingProject: false,
  projectError: null,
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",

  // Actions
  fetchProjects: async (page = 1, limit = 6) => {
    set({
      projectsLoading: true,
      projectsError: null,
      projectsPageLimit: limit,
    });

    try {
      const response = await fetch(
        `${get().apiUrl}/projects?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      // Ensure we're handling the response correctly
      const projectsList = Array.isArray(data.projects)
        ? data.projects
        : Array.isArray(data)
        ? data
        : [];

      set({
        projects: projectsList,
        projectsTotalPages: data.totalPages || 1,
        projectsCurrentPage: page,
        projectsLoading: false,
      });
    } catch (err) {
      console.error("Error fetching projects:", err);
      set({
        projectsError: "Failed to load projects. Please try again later.",
        projects: [],
        projectsLoading: false,
      });
    }
  },

  loadMoreProjects: async () => {
    const {
      projectsCurrentPage,
      projectsTotalPages,
      projectsPageLimit,
      projects,
    } = get();

    if (projectsCurrentPage >= projectsTotalPages) return;

    set({ projectsLoadingMore: true });
    try {
      const nextPage = projectsCurrentPage + 1;
      const response = await fetch(
        `${get().apiUrl}/projects?page=${nextPage}&limit=${projectsPageLimit}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch more projects");
      }

      const data = await response.json();

      // Ensure we're handling the response correctly
      const newProjects = Array.isArray(data.projects)
        ? data.projects
        : Array.isArray(data)
        ? data
        : [];

      // Properly append new projects to existing ones
      set({
        projects: [...projects, ...newProjects],
        projectsCurrentPage: nextPage,
        projectsLoadingMore: false,
      });
    } catch (err) {
      console.error("Error fetching more projects:", err);
      set({
        projectsError: "Failed to load more projects. Please try again.",
        projectsLoadingMore: false,
      });
    }
  },

  fetchActiveProjects: async (page = 1, limit = 4) => {
    set({
      activeProjectsLoading: true,
      activeProjectsError: null,
      activeProjectsPageLimit: limit,
    });

    try {
      const response = await fetch(
        `${get().apiUrl}/projects/active?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch active projects");
      }

      const data = await response.json();
      // Ensure we're handling the response correctly
      const projectsList = Array.isArray(data.projects)
        ? data.projects
        : Array.isArray(data)
        ? data
        : [];

      set({
        activeProjects: projectsList,
        activeProjectsTotalPages: data.totalPages || 1,
        activeProjectsCurrentPage: page,
        activeProjectsLoading: false,
      });
    } catch (err) {
      console.error("Error fetching active projects:", err);
      set({
        activeProjectsError:
          "Failed to load active projects. Please try again later.",
        activeProjects: [],
        activeProjectsLoading: false,
      });
    }
  },

  loadMoreActiveProjects: async () => {
    const {
      activeProjectsCurrentPage,
      activeProjectsTotalPages,
      activeProjectsPageLimit,
      activeProjects,
    } = get();

    if (activeProjectsCurrentPage >= activeProjectsTotalPages) return;

    set({ activeProjectsLoadingMore: true });
    try {
      const nextPage = activeProjectsCurrentPage + 1;
      const response = await fetch(
        `${
          get().apiUrl
        }/projects/active?page=${nextPage}&limit=${activeProjectsPageLimit}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch more active projects");
      }

      const data = await response.json();

      // Ensure we're handling the response correctly
      const newProjects = Array.isArray(data.projects)
        ? data.projects
        : Array.isArray(data)
        ? data
        : [];

      // Properly append new projects to existing ones
      set({
        activeProjects: [...activeProjects, ...newProjects],
        activeProjectsCurrentPage: nextPage,
        activeProjectsLoadingMore: false,
      });
    } catch (err) {
      console.error("Error fetching more active projects:", err);
      set({
        activeProjectsError:
          "Failed to load more active projects. Please try again.",
        activeProjectsLoadingMore: false,
      });
    }
  },

  fetchFeaturedProjects: async (page = 1, limit = 4) => {
    set({
      featuredProjectsLoading: true,
      featuredProjectsError: null,
      featuredProjectsPageLimit: limit,
    });

    try {
      const response = await fetch(
        `${get().apiUrl}/projects/featured?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch featured projects");
      }

      const data = await response.json();
      // Ensure we're handling the response correctly
      const projectsList = Array.isArray(data.projects)
        ? data.projects
        : Array.isArray(data)
        ? data
        : [];

      set({
        featuredProjects: projectsList,
        featuredProjectsTotalPages: data.totalPages || 1,
        featuredProjectsCurrentPage: page,
        featuredProjectsLoading: false,
      });
    } catch (err) {
      console.error("Error fetching featured projects:", err);
      set({
        featuredProjectsError:
          "Failed to load featured projects. Please try again later.",
        featuredProjects: [],
        featuredProjectsLoading: false,
      });
    }
  },

  loadMoreFeaturedProjects: async () => {
    const {
      featuredProjectsCurrentPage,
      featuredProjectsTotalPages,
      featuredProjectsPageLimit,
      featuredProjects,
    } = get();

    if (featuredProjectsCurrentPage >= featuredProjectsTotalPages) return;

    set({ featuredProjectsLoadingMore: true });
    try {
      const nextPage = featuredProjectsCurrentPage + 1;
      const response = await fetch(
        `${
          get().apiUrl
        }/projects/featured?page=${nextPage}&limit=${featuredProjectsPageLimit}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch more featured projects");
      }

      const data = await response.json();

      // Ensure we're handling the response correctly
      const newProjects = Array.isArray(data.projects)
        ? data.projects
        : Array.isArray(data)
        ? data
        : [];

      // Properly append new projects to existing ones
      set({
        featuredProjects: [...featuredProjects, ...newProjects],
        featuredProjectsCurrentPage: nextPage,
        featuredProjectsLoadingMore: false,
      });
    } catch (err) {
      console.error("Error fetching more featured projects:", err);
      set({
        featuredProjectsError:
          "Failed to load more featured projects. Please try again.",
        featuredProjectsLoadingMore: false,
      });
    }
  },

  fetchProjectById: async (id: string) => {
    set({
      loadingProject: true,
      projectError: null,
      currentProject: null,
    });

    try {
      const response = await fetch(`${get().apiUrl}/projects/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch project details");
      }

      const data = await response.json();
      set({
        currentProject: data,
        loadingProject: false,
      });
    } catch (err) {
      console.error("Error fetching project details:", err);
      set({
        projectError: "Failed to load project details. Please try again later.",
        loadingProject: false,
      });
    }
  },
}));
