import { create } from "zustand";
import { Project } from "@/types/projects";

interface ProjectsState {
  // State
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
  apiUrl: string;

  // Actions
  fetchActiveProjects: (page?: number, limit?: number) => Promise<void>;
  loadMoreActiveProjects: () => Promise<void>;
  fetchFeaturedProjects: (page?: number, limit?: number) => Promise<void>;
  loadMoreFeaturedProjects: () => Promise<void>;
  fetchProjectById: (id: string) => Promise<void>;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  // State
  projects: [],
  loading: false,
  loadingMore: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  pageLimit: 4,
  currentProject: null,
  loadingProject: false,
  projectError: null,
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",

  // Actions
  fetchActiveProjects: async (page = 1, limit = 4) => {
    set({ loading: true, error: null, pageLimit: limit });

    try {
      const response = await fetch(
        `${get().apiUrl}/projects/active?page=${page}&limit=${limit}`
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
        totalPages: data.totalPages || 1,
        currentPage: page,
        loading: false,
      });
    } catch (err) {
      console.error("Error fetching projects:", err);
      set({
        error: "Failed to load projects. Please try again later.",
        projects: [],
        loading: false,
      });
    }
  },

  loadMoreActiveProjects: async () => {
    const { currentPage, totalPages, pageLimit, projects } = get();

    if (currentPage >= totalPages) return;

    set({ loadingMore: true });
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(
        `${get().apiUrl}/projects/active?page=${nextPage}&limit=${pageLimit}`
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
        currentPage: nextPage,
        loadingMore: false,
      });
    } catch (err) {
      console.error("Error fetching more projects:", err);
      set({
        error: "Failed to load more projects. Please try again.",
        loadingMore: false,
      });
    }
  },

  fetchFeaturedProjects: async (page = 1, limit = 4) => {
    set({ loading: true, error: null, pageLimit: limit });

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
        projects: projectsList,
        totalPages: data.totalPages || 1,
        currentPage: page,
        loading: false,
      });
    } catch (err) {
      console.error("Error fetching featured projects:", err);
      set({
        error: "Failed to load featured projects. Please try again later.",
        projects: [],
        loading: false,
      });
    }
  },

  loadMoreFeaturedProjects: async () => {
    const { currentPage, totalPages, pageLimit, projects } = get();

    if (currentPage >= totalPages) return;

    set({ loadingMore: true });
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(
        `${get().apiUrl}/projects/featured?page=${nextPage}&limit=${pageLimit}`
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
        projects: [...projects, ...newProjects],
        currentPage: nextPage,
        loadingMore: false,
      });
    } catch (err) {
      console.error("Error fetching more featured projects:", err);
      set({
        error: "Failed to load more featured projects. Please try again.",
        loadingMore: false,
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
