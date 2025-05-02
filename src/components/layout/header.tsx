"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X, Github, MessageSquareIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Logo and Brand */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="font-serif text-lg sm:text-xl font-bold tracking-tight hover:text-primary transition-colors"
          >
            CVS
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-8">
            <Link
              href="/projects"
              className="font-medium text-sm lg:text-base hover:text-primary transition-colors relative group"
            >
              Projects
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/testimonials"
              className="font-medium text-sm lg:text-base hover:text-primary transition-colors relative group"
            >
              Testimonials
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/blog"
              className="font-medium text-sm lg:text-base hover:text-primary transition-colors relative group"
            >
              Blog
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />

          {/* GitHub Icon */}
          <Link
            href="https://github.com/CVSCharan"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-1.5 sm:p-2 hover:bg-accent/50 transition-colors hidden md:flex"
            aria-label="GitHub Profile"
          >
            <Github className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>

          {/* Contact Icon */}
          <Link
            href="/contact"
            className="rounded-md p-1.5 sm:p-2 hover:bg-accent/50 transition-colors hidden md:flex"
            aria-label="Contact Page"
          >
            <MessageSquareIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>

          {pathname !== "/login" && (
            <Button
              asChild
              className="hidden md:flex rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all hover:scale-105"
              variant="default"
            >
              <Link href="/login">Log In</Link>
            </Button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="flex md:hidden p-1.5 sm:p-2 rounded-md hover:bg-accent/50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 border-b" : "max-h-0"
        }`}
      >
        <nav className="container mx-auto flex flex-col space-y-3 sm:space-y-4 px-4 py-4 max-w-7xl">
          <Link
            href="/projects"
            className="font-medium py-1.5 sm:py-2 hover:text-primary transition-colors"
            onClick={toggleMenu}
          >
            Projects
          </Link>
          <Link
            href="/testimonials"
            className="font-medium py-1.5 sm:py-2 hover:text-primary transition-colors"
            onClick={toggleMenu}
          >
            Testimonials
          </Link>
          <Link
            href="/blog"
            className="font-medium py-1.5 sm:py-2 hover:text-primary transition-colors"
            onClick={toggleMenu}
          >
            Blog
          </Link>

          {/* Mobile Social Links */}
          <div className="flex items-center gap-4 py-1.5 sm:py-2">
            <Link
              href="https://github.com/CVSCharan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">GitHub</span>
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-2 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              <MessageSquareIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">Contact</span>
            </Link>
          </div>

          <Button
            asChild
            className="w-full justify-center rounded-full mt-1 sm:mt-2 py-1.5 sm:py-2 text-xs sm:text-sm"
            variant="default"
          >
            <Link href="/login" onClick={toggleMenu}>
              Log In
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
