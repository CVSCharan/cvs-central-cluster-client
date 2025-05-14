"use client";

import React, { createContext, useContext, useState } from "react";
import {
  Project,
  ProjectsContextType,
  ProjectsProviderProps,
} from "@/types/projects";

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};

export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  // Shared state
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

  // For testimonials page (paginated)
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageLimit, setPageLimit] = useState(4); // Store the limit used for initial fetch

  // For project details
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loadingProject, setLoadingProject] = useState(false);
  const [projectError, setProjectError] = useState<string | null>(null);

  // Fetch paginated testimonials
  const fetchActiveProjects = async (page: number = 1, limit: number = 4) => {
    setLoading(true);
    setError(null);
    setPageLimit(limit); // Store the limit for future use

    try {
      const response = await fetch(
        `${apiUrl}/projects/active?page=${page}&limit=${limit}`
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

      setProjects(projectsList);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects. Please try again later.");
      // Set empty array to prevent errors
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // Load more testimonials (pagination)
  const loadMoreActiveProjects = async () => {
    if (currentPage >= totalPages) return;

    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(
        `${apiUrl}/projects/active?page=${nextPage}&limit=${pageLimit}`
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

      // Properly append new testimonials to existing ones
      setProjects((prev) => [...prev, ...newProjects]);
      setCurrentPage(nextPage);
    } catch (err) {
      console.error("Error fetching more projects:", err);
      setError("Failed to load more projects. Please try again.");
    } finally {
      setLoadingMore(false);
    }
  };

  // Fetch project by ID
  const fetchProjectById = async (id: string) => {
    setLoadingProject(true);
    setProjectError(null);
    setCurrentProject(null);

    try {
      const response = await fetch(`${apiUrl}/projects/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch project details");
      }

      const data = await response.json();
      setCurrentProject(data);
    } catch (err) {
      console.error("Error fetching project details:", err);
      setProjectError(
        "Failed to load project details. Please try again later."
      );
    } finally {
      setLoadingProject(false);
    }
  };

  const value = React.useMemo(
    () => ({
      projects,
      loading,
      loadingMore,
      error,
      currentPage,
      totalPages,
      currentProject,
      loadingProject,
      projectError,
      fetchActiveProjects,
      loadMoreActiveProjects,
      fetchProjectById,
    }),
    [
      projects,
      loadingMore,
      currentPage,
      totalPages,
      currentProject,
      loadingProject,
      projectError,
    ]
  );

  return (
    <ProjectsContext.Provider value={{ ...value, apiUrl, pageLimit }}>
      {children}
    </ProjectsContext.Provider>
  );
};
