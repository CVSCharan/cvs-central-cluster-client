"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { PageHeader } from "@/components/projects/PageHeader";
import { ProjectFormData } from "@/types/projects";

const AddNewProjectPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state for smoother transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmitProject = async (
    projectData: ProjectFormData
  ): Promise<void> => {
    // Here you would typically send the data to your API
    console.log("Submitting project:", projectData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavBar />

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
              <PageHeader
                title="New Project"
                description="Showcase your work by adding a new project to your portfolio."
              />

              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="p-0 bg-transparent shadow-none">
                    <ProjectForm onSubmit={handleSubmitProject} />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default AddNewProjectPage;
