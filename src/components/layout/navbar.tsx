"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  LayoutDashboard,
  FolderPlus,
  Users,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
    },
    {
      name: "Projects",
      path: "/dashboard/projects",
      icon: <FolderPlus className="h-4 w-4 mr-2" />,
    },
    {
      name: "Users",
      path: "/dashboard/users",
      icon: <Users className="h-4 w-4 mr-2" />,
    },
    {
      name: "Blog Posts",
      path: "/dashboard/blogs",
      icon: <FileText className="h-4 w-4 mr-2" />,
    },
    {
      name: "Messages",
      path: "/dashboard/messages",
      icon: <MessageSquare className="h-4 w-4 mr-2" />,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Logo and Brand */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/dashboard"
            className="font-serif text-lg sm:text-xl font-bold tracking-tight hover:text-primary transition-colors"
          >
            <span className="text-primary">CVS</span> Panel
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center font-medium text-sm hover:text-primary transition-colors relative group ${
                  isActive(item.path) ? "text-primary" : ""
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <button className="relative rounded-md p-1.5 sm:p-2 hover:bg-accent/50 transition-colors">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
          </button>

          <ThemeToggle />

          {/* User Profile */}
          <div className="hidden md:flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
              AC
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden md:flex rounded-full hover:bg-destructive/10 hover:text-destructive"
            aria-label="Log out"
          >
            <Link href="/login">
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </Button>

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
          isMenuOpen ? "max-h-[400px] border-b" : "max-h-0"
        }`}
      >
        <nav className="container mx-auto flex flex-col space-y-3 sm:space-y-4 px-4 py-4 max-w-7xl">
          {/* User Profile for Mobile */}
          <div className="flex items-center gap-3 pb-3 border-b">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              AC
            </div>
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>

          {/* Navigation Items */}
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center py-1.5 sm:py-2 hover:text-primary transition-colors ${
                isActive(item.path) ? "text-primary font-medium" : ""
              }`}
              onClick={toggleMenu}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}

          {/* Logout Button */}
          <Link
            href="/login"
            className="flex items-center py-1.5 sm:py-2 text-destructive hover:text-destructive/80 transition-colors mt-2 border-t pt-4"
            onClick={toggleMenu}
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Log Out</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
