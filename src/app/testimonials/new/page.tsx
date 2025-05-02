"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AddTestimonialsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    rating: 5,
    position: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Simulate loading state for smoother transitions
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // For content field, limit to 500 characters
    if (name === "content" && value.length > 500) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (newRating: number) => {
    setFormData((prev) => ({ ...prev, rating: newRating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Make API call to submit the testimonial
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/testimonials/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit testimonial");
      }

      const data = await response.json();
      console.log(data); // Log the response data for debugging

      setSubmitStatus({
        success: true,
        message:
          "Your testimonial has been submitted for review. Thank you for your feedback!",
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        content: "",
        rating: 5,
        position: "",
        company: "",
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: `There was an error submitting your testimonial - ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              className="container mx-auto px-4 py-12 md:py-16 lg:py-24 flex flex-col justify-center"
            >
              <div className="max-w-2xl mx-auto w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-8 md:mb-12"
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-4">
                    Share Your Experience
                  </h1>
                  <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                    We value your feedback! Let others know about your
                    experience with our Platform.
                  </p>
                </motion.div>

                <div className="rounded-xl border border-border/40 shadow-sm overflow-hidden">
                  <div className="bg-card p-6 sm:p-8 md:p-10 rounded-[10px]">
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-5 sm:space-y-6"
                    >
                      <div className="space-y-2 sm:space-y-3">
                        <Label
                          htmlFor="name"
                          className="text-foreground text-sm font-medium block"
                        >
                          Your Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                          className="bg-background/50 border-input focus-visible:ring-2 focus-visible:ring-ring/70 text-foreground rounded-md h-10 sm:h-11 text-base w-full transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <Label
                          htmlFor="content"
                          className="text-foreground text-sm font-medium block"
                        >
                          Your Testimonial{" "}
                          <span className="text-xs text-muted-foreground ml-1">
                            (Max 500 characters)
                          </span>
                        </Label>
                        <Textarea
                          id="content"
                          name="content"
                          value={formData.content}
                          onChange={handleChange}
                          placeholder="Share your experience with our Platform..."
                          required
                          maxLength={500}
                          className="bg-background/50 border-input focus-visible:ring-2 focus-visible:ring-ring/70 text-foreground min-h-[120px] sm:min-h-[150px] w-full rounded-md resize-none text-base transition-all duration-200"
                        />
                        <div className="text-right text-xs text-muted-foreground">
                          {formData.content.length}/500 characters
                        </div>
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <Label className="text-foreground text-sm font-medium block">
                          Rating
                        </Label>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleRatingChange(star)}
                              className="focus:outline-none mr-2 cursor-pointer transition-transform hover:scale-110 active:scale-95"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={star <= formData.rating ? "#FFD700" : "#4B5563"}
                                className="w-6 h-6 sm:w-8 sm:h-8"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground">
                            {formData.rating} out of 5
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2 sm:space-y-3">
                          <Label
                            htmlFor="position"
                            className="text-foreground text-sm font-medium block"
                          >
                            Your Position
                          </Label>
                          <Input
                            id="position"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            placeholder="e.g. Software Engineer"
                            className="bg-background/50 border-input focus-visible:ring-2 focus-visible:ring-ring/70 text-foreground rounded-md h-10 sm:h-11 text-base transition-all duration-200"
                          />
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                          <Label
                            htmlFor="company"
                            className="text-foreground text-sm font-medium block"
                          >
                            Company
                          </Label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="e.g. Tech Innovations Inc."
                            className="bg-background/50 border-input focus-visible:ring-2 focus-visible:ring-ring/70 text-foreground rounded-md h-10 sm:h-11 text-base transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2.5 sm:py-3 rounded-md text-base shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden group"
                        >
                          <span className="relative z-10">
                            {isSubmitting ? (
                              <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                              </span>
                            ) : (
                              "Submit Testimonial"
                            )}
                          </span>
                          <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/10 to-primary/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                        </Button>
                      </div>
                      
                      {/* Success/Error message */}
                      {submitStatus && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4"
                        >
                          <Alert
                            className={`${
                              submitStatus.success
                                ? "bg-success/20 border-success/50 text-success-foreground"
                                : "bg-destructive/20 border-destructive/50 text-destructive-foreground"
                            } shadow-sm`}
                          >
                            <AlertDescription className="text-sm">
                              {submitStatus.message}
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      )}
                    </form>
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

export default AddTestimonialsPage;
