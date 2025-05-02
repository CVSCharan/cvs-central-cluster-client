"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/projects/Hero";
import FilteredProjectsSection from "@/components/projects/FilteredProjects";
import CTASection from "@/components/projects/CTA";
import { projects } from "@/data/projects";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state for smoother transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category.includes(filter));

  const categories = [
    { name: "All", value: "all" },
    { name: "Web", value: "web" },
    { name: "Frontend", value: "frontend" },
    { name: "Backend", value: "backend" },
    { name: "Mobile", value: "mobile" },
    { name: "Design", value: "design" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1 relative">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 z-0 pointer-events-none"></div>
        
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
              />

              {/* CTA Section */}
              <CTASection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectsPage;
