import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description: string;
  actionLink: string;
  actionLabel: string;
}

const PageHeader = ({
  title,
  description,
  actionLink,
  actionLabel,
}: PageHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight mb-2">
            {title}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {description}
          </p>
        </div>
        <Button asChild className="rounded-full gap-2">
          <Link href={actionLink}>
            <Plus className="h-4 w-4" />
            {actionLabel}
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default PageHeader;