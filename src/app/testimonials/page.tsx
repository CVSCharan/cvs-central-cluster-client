"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";
import { useTestimonials } from "@/contexts/TestimonialsContext";

const TestimonialsPage = () => {
  // Use the shared context
  const {
    testimonials,
    loading,
    loadingMore,
    error,
    currentPage,
    totalPages,
    fetchTestimonials,
    loadMoreTestimonials,
    resetTestimonials,
  } = useTestimonials();

  const limit = 4; // Number of testimonials per page
  const [isLoading, setIsLoading] = useState(true);

  // Fetch testimonials on component mount
  useEffect(() => {
    fetchTestimonials(1, limit);

    // Simulate loading state for smoother transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    // Cleanup function to reset state when component unmounts
    return () => {
      resetTestimonials();
      clearTimeout(timer);
    };
  }, [limit]); // Add all dependencies

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={i < rating ? "#FFD700" : "#4B5563"}
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clipRule="evenodd"
        />
      </svg>
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 relative">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 z-0 pointer-events-none"></div>

        <AnimatePresence>
          {isLoading || loading ? (
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
              className="container mx-auto px-4 py-12 md:py-16 lg:py-24"
            >
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10 md:mb-16">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4">
                    What Our Users Say
                  </h1>
                  <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
                    Authentic Feedback from Real Users.
                  </p>
                </div>

                {error ? (
                  <div className="text-center py-10">
                    <p className="text-destructive text-lg">{error}</p>
                    <button
                      onClick={() => fetchTestimonials(1, limit)}
                      className="mt-4 px-6 py-2 bg-primary rounded-md hover:bg-primary/90 text-primary-foreground transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                ) : testimonials.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground text-lg">
                      No testimonials found.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {testimonials.map((testimonial, index) => (
                        <motion.div
                          key={testimonial._id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="rounded-xl border border-border/40 h-full overflow-hidden">
                            <div className="bg-card p-6 sm:p-8 flex flex-col h-full">
                              <div className="flex items-center mb-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 bg-muted flex-shrink-0">
                                  {testimonial.avatar ? (
                                    <Image
                                      src={testimonial.avatar}
                                      alt={testimonial.name}
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xl font-bold text-foreground bg-primary/10">
                                      {testimonial.name.charAt(0)}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-bold text-foreground text-lg">
                                    {testimonial.name}
                                  </h3>
                                  {testimonial.position &&
                                    testimonial.company && (
                                      <p className="text-sm text-muted-foreground">
                                        {testimonial.position} at{" "}
                                        {testimonial.company}
                                      </p>
                                    )}
                                </div>
                              </div>

                              <div className="flex mb-3">
                                {renderStars(testimonial.rating)}
                              </div>

                              <p className="text-muted-foreground text-base flex-grow">
                                &quot;{testimonial.content}&quot;
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {currentPage < totalPages && (
                      <div className="flex justify-center mt-10">
                        <button
                          onClick={() => loadMoreTestimonials()}
                          disabled={loadingMore}
                          className="px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all duration-200 flex items-center space-x-2 disabled:opacity-70"
                        >
                          {loadingMore ? (
                            <>
                              <span className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
                              <span>Loading...</span>
                            </>
                          ) : (
                            <span>Load More Testimonials</span>
                          )}
                        </button>
                      </div>
                    )}
                  </>
                )}

                <div className="mt-16">
                  <div className="rounded-xl bg-primary/5 border border-primary/20 overflow-hidden">
                    <div className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-between">
                      <div className="text-left mb-6 md:mb-0 md:mr-8">
                        <h3 className="text-2xl md:text-3xl font-serif font-bold tracking-tight mb-3">
                          Share Your Experience
                        </h3>
                        <p className="text-muted-foreground text-base md:text-lg max-w-xl">
                          Join our community of satisfied users. Your feedback
                          drives our innovation.
                        </p>
                      </div>
                      <Link
                        href="/testimonials/add"
                        className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 transform whitespace-nowrap"
                      >
                        Add Your Testimonial
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default TestimonialsPage;
