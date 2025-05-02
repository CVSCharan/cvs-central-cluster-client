"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4 md:px-6 py-16 md:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-serif text-9xl font-bold text-primary mb-4">
                404
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Page Not Found
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
                Sorry, the page you are looking for doesn't exist or has been
                moved.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/">Return Home</Link>
                </Button>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="relative mt-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl -z-10"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-accent/5 blur-3xl -z-10"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
