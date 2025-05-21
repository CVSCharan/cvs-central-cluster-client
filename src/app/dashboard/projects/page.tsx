"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/projects";
import { Plus, Search, Filter } from "lucide-react";
import { useProjectsStore } from "@/store/ProjectsStore";
import ProjectsCards from "@/components/dashboard/ProjectsCards";
import RequireAuth from "@/components/auth/RequireAuth";

const DashboardProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState<{
    field: keyof Project;
    direction: "asc" | "desc";
  }>({
    field: "title",
    direction: "asc",
  });
  const { projects, fetchProjects } = useProjectsStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Filter projects based on search term and category
  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || project.category === categoryFilter;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const fieldA = a[sortBy.field as keyof typeof a];
      const fieldB = b[sortBy.field as keyof typeof b];

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortBy.direction === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }

      return 0;
    });

  const categories = [
    { name: "All", value: "all" },
    { name: "Full Stack", value: "full-stack" },
    { name: "Web", value: "web" },
    { name: "Mobile", value: "mobile" },
    { name: "Design", value: "design" },
  ];

  return (
    <RequireAuth>
      <div className="flex min-h-screen flex-col bg-background">
        <NavBar />

        <main className="flex-1 relative">
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 z-0 pointer-events-none"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight mb-2">
                    Projects
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Manage and organize your portfolio projects
                  </p>
                </div>
                <Button asChild className="rounded-full gap-2">
                  <Link href="/dashboard/projects/new">
                    <Plus className="h-4 w-4" />
                    New Project
                  </Link>
                </Button>
              </div>

              {/* Filters and Search */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stats */}
                <div className="lg:flex items-center justify-end gap-6 hidden">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">
                      {projects.length}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Total Projects
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">
                      {filteredProjects.length}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Filtered Results
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Projects Cards */}
            <ProjectsCards
              projects={projects}
              filteredProjects={filteredProjects}
            />
          </div>
        </main>
      </div>
    </RequireAuth>
  );
};

export default DashboardProjectsPage;
