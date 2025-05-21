import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/projects";
import {
  FolderOpen,
  Edit,
  Trash2,
  Eye,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { useProjectsStore } from "@/store/ProjectsStore";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectsTableProps {
  projects: Project[];
  filteredProjects: Project[];
}

const ProjectsCards = ({ projects, filteredProjects }: ProjectsTableProps) => {
  // Get pagination state and methods from the store
  const {
    projectsCurrentPage,
    projectsTotalPages,
    projectsLoadingMore,
    fetchProjects,
  } = useProjectsStore();

  // Function to handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > projectsTotalPages) return;
    fetchProjects(page);
  };

  // Calculate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (projectsTotalPages <= maxVisiblePages) {
      // If we have 5 or fewer pages, show all
      for (let i = 1; i <= projectsTotalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);

      // Calculate start and end of middle pages
      let startPage = Math.max(2, projectsCurrentPage - 1);
      let endPage = Math.min(projectsTotalPages - 1, projectsCurrentPage + 1);

      // Adjust if we're near the beginning
      if (projectsCurrentPage <= 3) {
        endPage = 4;
      }

      // Adjust if we're near the end
      if (projectsCurrentPage >= projectsTotalPages - 2) {
        startPage = projectsTotalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push(-1); // -1 represents ellipsis
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < projectsTotalPages - 1) {
        pages.push(-2); // -2 represents ellipsis
      }

      // Always include last page
      pages.push(projectsTotalPages);
    }

    return pages;
  };

  return (
    <div className="space-y-8">
      {filteredProjects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>

          {/* Pagination Controls */}
          {projectsTotalPages > 1 && (
            <div className="flex items-center justify-between border-t pt-6 mt-8">
              <div className="text-sm text-muted-foreground font-medium">
                Page {projectsCurrentPage} of {projectsTotalPages}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(projectsCurrentPage - 1)}
                  disabled={projectsCurrentPage === 1 || projectsLoadingMore}
                  className="border-muted hover:bg-muted/80 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                </Button>

                <div className="hidden md:flex space-x-1">
                  {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                      {page < 0 ? (
                        <span className="px-2 flex items-center text-muted-foreground">
                          ...
                        </span>
                      ) : (
                        <Button
                          variant={
                            page === projectsCurrentPage ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          disabled={projectsLoadingMore}
                          className={`min-w-[2.5rem] ${
                            page === projectsCurrentPage
                              ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                              : "border-muted hover:bg-muted/80 cursor-pointer"
                          }`}
                        >
                          {page}
                        </Button>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(projectsCurrentPage + 1)}
                  disabled={
                    projectsCurrentPage === projectsTotalPages ||
                    projectsLoadingMore
                  }
                  className="border-muted hover:bg-muted/80 cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {projectsLoadingMore && (
            <div className="flex justify-center py-4">
              <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          )}
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="border rounded-xl overflow-hidden group hover:shadow-lg transition-shadow"
  >
    <div className="aspect-video bg-muted relative">
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <FolderOpen className="h-16 w-16 opacity-30" />
        </div>
      )}
      <div className="absolute top-3 left-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {project.category}
        </span>
      </div>
    </div>

    <div className="p-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.slice(0, 3).map((tech, index) => (
          <span
            key={index}
            className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 3 && (
          <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
            +{project.technologies.length - 3}
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <p className="text-muted-foreground mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex space-x-4 mt-6">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-primary font-medium hover:underline transition-colors"
            title="Live Demo"
          >
            <ExternalLink size={18} className="ml-1" />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-primary font-medium hover:underline transition-colors"
            title="Source Code"
          >
            <Github size={18} className="ml-1" />
          </a>
        )}
        <div className="flex-grow"></div>
        <Link
          href={`/dashboard/projects/${project.id}`}
          className="inline-flex items-center text-primary font-medium hover:underline transition-colors"
          title="View Details"
        >
          <Eye size={18} className="ml-1" />
        </Link>
        <Link
          href={`/dashboard/projects/${project.id}/edit`}
          className="inline-flex items-center text-primary font-medium hover:underline transition-colors"
          title="Edit Project"
        >
          <Edit size={18} className="ml-1" />
        </Link>
        <button
          className="inline-flex items-center text-red-500 font-medium hover:underline transition-colors cursor-pointer"
          title="Delete Project"
        >
          <Trash2 size={18} className="ml-1" />
        </button>
      </div>
    </div>
  </motion.div>
);

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    className="text-center py-12 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/20"
  >
    <div className="flex flex-col items-center justify-center gap-4 max-w-md mx-auto">
      <AlertCircle className="h-10 w-10 text-muted-foreground" />
      <h3 className="text-xl font-medium text-foreground">No projects found</h3>
      <p className="text-muted-foreground">
        We couldn't find any projects matching your criteria. Try adjusting your
        search filters or create a new project.
      </p>
    </div>
  </motion.div>
);

export default ProjectsCards;
