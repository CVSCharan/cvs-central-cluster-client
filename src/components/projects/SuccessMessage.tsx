"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

interface SuccessMessageProps {
  onAddAnother: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ onAddAnother }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12 px-4"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
        <Check className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-serif font-bold mb-4">
        Project Added Successfully!
      </h2>
      <p className="text-muted-foreground mb-8">
        Your project has been added to your portfolio.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="outline">
          <Link href="/projects">View All Projects</Link>
        </Button>
        <Button onClick={onAddAnother}>
          Add Another Project
        </Button>
      </div>
    </motion.div>
  );
};