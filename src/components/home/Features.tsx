"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, MessageSquare, FileText } from "lucide-react";

// Define interface for FeatureCard props
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const FeatureCard = ({ title, description, icon, delay }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] h-full flex flex-col"
    >
      <div className="flex flex-col space-y-3 sm:space-y-4 h-full">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="rounded-full bg-primary/10 p-2 sm:p-3 text-primary w-fit">
            {icon}
          </div>
          <h3 className="text-lg sm:text-xl font-serif font-bold">{title}</h3>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base flex-grow">{description}</p>
      </div>
    </motion.div>
  );
};

// Define interface for feature items
interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const FeaturesSection = () => {
  const features: Feature[] = [
    {
      title: "Project Management",
      description:
        "Organize and showcase your projects with detailed information and images.",
      icon: <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />,
      delay: 0,
    },
    {
      title: "Testimonials",
      description:
        "Display feedback and testimonials from your clients and collaborators.",
      icon: <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />,
      delay: 0.1,
    },
    {
      title: "Blog",
      description:
        "Share your thoughts, insights, and expertise through blog posts.",
      icon: <FileText className="h-4 w-4 sm:h-5 sm:w-5" />,
      delay: 0.2,
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-muted/30 flex items-center justify-center">
      <div className="container px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 w-full"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight mb-3 sm:mb-4">
            Key Features
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-sm sm:text-base md:text-lg px-2">
            Everything you need to manage your professional presence online.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
