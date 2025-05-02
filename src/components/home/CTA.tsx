"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28 flex items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 z-0"></div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl rounded-xl sm:rounded-2xl border bg-card/80 backdrop-blur-sm p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center shadow-lg"
        >
          <div className="space-y-2 sm:space-y-3 w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
              Ready to get started?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl px-2">
              Explore the features and capabilities of CVS Central Cluster.
            </p>
          </div>
          <Button
            size="lg"
            asChild
            className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-medium transition-all hover:scale-105 mt-2 sm:mt-4 w-full sm:w-auto max-w-xs"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </motion.div>
      </div>

      {/* Decorative elements - responsive positioning */}
      <div className="absolute bottom-0 left-1/4 h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-primary/10 blur-xl sm:blur-2xl opacity-70 sm:opacity-100"></div>
      <div className="absolute top-1/3 right-1/4 h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-accent/10 blur-xl sm:blur-2xl opacity-70 sm:opacity-100"></div>
    </section>
  );
};

export default CTASection;
