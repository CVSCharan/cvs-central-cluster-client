"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/projects/Hero";
import FilteredProjectsSection from "@/components/projects/FilteredProjects";
import CTASection from "@/components/projects/CTA";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useProjectsStore } from "@/store/ProjectsStore";

const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const limit = 4; // Number of testimonials per page

  const {
    featuredProjects,
    fetchFeaturedProjects,
    featuredProjectsCurrentPage,
    featuredProjectsTotalPages,
    loadMoreFeaturedProjects,
    featuredProjectsLoadingMore,
  } = useProjectsStore();

  // Simulate loading state for smoother transitions
  useEffect(() => {
    fetchFeaturedProjects(1, limit);
    setIsLoading(false);
  }, []);

  const filteredProjects =
    filter === "all"
      ? featuredProjects
      : featuredProjects.filter((project) => project.category.includes(filter));

  const categories = [
    { name: "All", value: "all" },
    { name: "Full Stack", value: "full-stack" },
    { name: "Web", value: "web" },
    { name: "Mobile", value: "mobile" },
    { name: "Design", value: "design" },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Header />

      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center h-screen"
          >
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
            <HeroSection />

            {/* Projects Filter */}
            <FilteredProjectsSection
              categories={categories}
              setFilter={setFilter}
              filter={filter}
              filteredProjects={filteredProjects}
              currentPage={featuredProjectsCurrentPage}
              totalPages={featuredProjectsTotalPages}
              loadMoreFeaturedProjects={loadMoreFeaturedProjects}
              loadingMore={featuredProjectsLoadingMore}
            />

            {/* CTA Section */}
            <CTASection />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
};

export default ProjectsPage;
