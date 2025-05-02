"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center min-h-[80vh] overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 z-0"></div>

      {/* Content container */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-4xl flex flex-col items-center justify-center space-y-6 sm:space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3 sm:space-y-4 w-full"
          >
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
              <span className="block">CVS Central</span>
              <span className="block text-primary">Cluster</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-base sm:text-lg md:text-xl lg:text-2xl px-4 sm:px-0">
              Manages projects, testimonials, blogs, and more in one place.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center px-4 sm:px-0"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-medium transition-all hover:scale-105 w-full sm:w-auto"
            >
              <Link href="/projects">View Projects</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-medium transition-all hover:bg-primary/10 w-full sm:w-auto"
            >
              <Link href="/blog">Read Blog</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements - responsive positioning */}
      <div className="absolute -bottom-16 -left-16 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-primary/10 blur-3xl opacity-70 sm:opacity-100"></div>
      <div className="absolute -top-16 -right-16 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-accent/10 blur-3xl opacity-70 sm:opacity-100"></div>
    </section>
  );
};

export default HeroSection;
