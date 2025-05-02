"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  // Routes that should display the detailed footer
  const detailedFooterRoutes = ["/", "/about"];
  const showDetailedFooter = detailedFooterRoutes.includes(pathname);

  // Simple footer for other routes
  if (!showDetailedFooter) {
    return (
      <footer className="border-t py-4 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <div className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-0 text-center sm:text-left">
              © {new Date().getFullYear()} CVS Central Cluster
            </div>

            <div className="flex space-x-3 sm:space-x-4 justify-center">
              <a
                href="https://github.com/CVSCharan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={16} className="sm:size-[20px]" />
              </a>
              <a
                href="https://www.linkedin.com/in/charan-cvs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} className="sm:size-[20px]" />
              </a>
              <a
                href="mailto:cvstechsolutions@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={16} className="sm:size-[20px]" />
              </a>
            </div>

            <div className="text-xs sm:text-sm text-muted-foreground flex space-x-3 sm:space-x-4 justify-center">
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Detailed footer for main routes
  return (
    <footer className="border-t py-6 sm:py-8 md:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-primary mb-2 sm:mb-3">
              CVS Central Cluster
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-xs mx-auto sm:mx-0">
              Manages projects, testimonials, blogs, and more in one place.
            </p>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-foreground text-sm sm:text-base mb-2 sm:mb-3">
              Quick Links
            </h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-semibold text-foreground text-sm sm:text-base mb-2 sm:mb-3">
              Connect
            </h4>
            <div className="flex justify-center md:justify-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
              <a
                href="https://github.com/CVSCharan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={16} className="sm:size-[20px]" />
              </a>
              <a
                href="https://www.linkedin.com/in/charan-cvs/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} className="sm:size-[20px]" />
              </a>
              <a
                href="mailto:cvstechsolutions@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={16} className="sm:size-[20px]" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-3 sm:pt-4 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <div className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-0 text-center sm:text-left">
            © {new Date().getFullYear()} CVS Central Cluster. All rights
            reserved.
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-right">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="mx-2">|</span>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
