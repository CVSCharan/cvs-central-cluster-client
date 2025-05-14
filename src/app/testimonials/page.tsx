"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import { useTestimonialsStore } from "@/store/TestimonialsStore";
import HeroSection from "@/components/testimonials/Hero";
import CTASection from "@/components/testimonials/CTA";

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
  } = useTestimonialsStore();

  const limit = 4; // Number of testimonials per page
  const [isLoading, setIsLoading] = useState(true);

  // Fetch testimonials on component mount
  useEffect(() => {
    fetchTestimonials(1, limit);
    setIsLoading(false);
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
          >
            <HeroSection />

            <section className="pb-16 px-4 md:px-6">
              <div className="container mx-auto">
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
                            <span>Load More</span>
                          )}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>

            <CTASection />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default TestimonialsPage;
