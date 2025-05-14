import { FilteredProjectsSectionProps } from "@/types/projects";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const FilteredProjectsSection = ({
  categories,
  setFilter,
  filter,
  filteredProjects,
  loadingMore,
  currentPage,
  totalPages,
  loadMoreFeaturedProjects,
}: FilteredProjectsSectionProps) => {
  return (
    <section className="pb-16 px-4 md:px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center flex-wrap gap-2 sm:gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setFilter(category.value)}
              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                filter === category.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
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
                    Project Image
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex space-x-4 mt-4">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-primary font-medium hover:underline transition-colors"
                  >
                    Live Demo
                    <ExternalLink size={16} className="ml-1" />
                  </a>
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-primary font-medium hover:underline transition-colors"
                  >
                    Code
                    <Github size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length > 0 && (
          <>
            {currentPage < totalPages && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => loadMoreFeaturedProjects()}
                  disabled={loadingMore}
                  className="px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all duration-200 flex items-center space-x-2 disabled:opacity-70 cursor-pointer"
                >
                  {loadingMore ? (
                    <>
                      <span className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <span>Load More</span>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-12 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/20"
          >
            <p className="text-muted-foreground">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FilteredProjectsSection;
