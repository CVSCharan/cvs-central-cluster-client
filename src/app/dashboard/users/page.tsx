"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Shield,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { useUsersStore } from "@/store/UsersStore";
import { User } from "@/types/users";
import RequireAuth from "@/components/auth/RequireAuth";

const DashboardUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState<{
    field: string;
    direction: "asc" | "desc";
  }>({
    field: "name",
    direction: "asc",
  });

  // Get users data from the store
  const {
    users,
    loading,
    loadingMore,
    error,
    currentPage,
    totalPages,
    fetchUsers,
    loadMoreUsers,
  } = useUsersStore();

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers(1, 10); // Fetch first page with 10 users per page
  }, [fetchUsers]);

  // Filter users based on search term and role
  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === "all" ||
        user.role.toLowerCase() === roleFilter.toLowerCase();

      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      const fieldA = a[sortBy.field as keyof User];
      const fieldB = b[sortBy.field as keyof User];

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortBy.direction === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }

      return 0;
    });

  const roles = [
    { name: "All Roles", value: "all" },
    { name: "Admin", value: "admin" },
    { name: "Editor", value: "editor" },
    { name: "Viewer", value: "viewer" },
  ];

  // Helper function to get user initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return <ShieldAlert className="h-4 w-4 text-red-500" />;
      case "editor":
        return <ShieldCheck className="h-4 w-4 text-blue-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  // Since we don't have status in the User interface, we'll determine it based on isAdmin
  const getUserStatus = (user: User) => {
    return user.isAdmin ? "Active" : "Viewer";
  };

  const getStatusBadge = (user: User) => {
    const status = getUserStatus(user);

    switch (status.toLowerCase()) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Active
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400">
            <Shield className="h-3 w-3 mr-1" />
            Viewer
          </span>
        );
    }
  };

  // Calculate page numbers to display for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // If we have 5 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);

      // Calculate start and end of middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        endPage = 4;
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push(-1); // -1 represents ellipsis
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push(-2); // -2 represents ellipsis
      }

      // Always include last page
      pages.push(totalPages);
    }

    return pages;
  };

  // Function to handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    fetchUsers(page);
  };

  return (
    <RequireAuth>
      <div className="flex min-h-screen flex-col bg-background">
        <NavBar />

        <main className="flex-1 relative">
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 z-0 pointer-events-none"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight mb-2">
                    Users
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Manage user accounts and permissions
                  </p>
                </div>
                <Button asChild className="rounded-full gap-2">
                  <Link href="/dashboard/users/new">
                    <UserPlus className="h-4 w-4" />
                    New User
                  </Link>
                </Button>
              </div>

              {/* Filters and Search */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                {/* Role Filter */}
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                  >
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stats */}
                <div className="lg:flex items-center justify-end gap-6 hidden">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">{users.length}</span>
                    <span className="text-xs text-muted-foreground">
                      Total Users
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">
                      {filteredUsers.length}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Filtered Results
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Users Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="space-y-8">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2 text-muted-foreground">
                      Loading users...
                    </span>
                  </div>
                ) : error ? (
                  <div className="text-center py-12 text-destructive">
                    <p>{error}</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => fetchUsers()}
                    >
                      Try Again
                    </Button>
                  </div>
                ) : filteredUsers.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                      {filteredUsers.map((user, index) => (
                        <motion.div
                          key={user.id || index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="border rounded-xl overflow-hidden group hover:shadow-lg transition-shadow bg-card"
                        >
                          <div className="p-6">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-12 w-12 border-2 border-primary/10">
                                <AvatarImage
                                  src={user.picture}
                                  alt={user.name}
                                />
                                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                  {getInitials(user.name)}
                                </AvatarFallback>
                              </Avatar>

                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                                    {user.name}
                                  </h3>
                                  <div className="flex items-center gap-1.5">
                                    {getRoleIcon(user.role)}
                                    <span className="text-sm text-muted-foreground">
                                      {user.role}
                                    </span>
                                  </div>
                                </div>

                                <p className="text-sm text-muted-foreground mt-1">
                                  {user.email}
                                </p>

                                <div className="flex items-center justify-between mt-4">
                                  <div>{getStatusBadge(user)}</div>

                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0 text-primary hover:text-primary/80 hover:bg-primary/10"
                                      asChild
                                    >
                                      <Link
                                        href={`/dashboard/users/${user.id}`}
                                      >
                                        <Eye className="h-4 w-4" />
                                      </Link>
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0 text-primary hover:text-primary/80 hover:bg-primary/10"
                                      asChild
                                    >
                                      <Link
                                        href={`/dashboard/users/${user.id}/edit`}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Link>
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between border-t pt-6 mt-8">
                        <div className="text-sm text-muted-foreground font-medium">
                          Page {currentPage} of {totalPages}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1 || loadingMore}
                            className="border-muted hover:bg-muted/80 cursor-pointer"
                          >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                          </Button>

                          <div className="hidden md:flex space-x-1">
                            {getPageNumbers().map((page, index) => (
                              <React.Fragment key={index}>
                                {page < 0 ? (
                                  <span className="px-2 flex items-center text-muted-foreground">
                                    ...
                                  </span>
                                ) : (
                                  <Button
                                    variant={
                                      page === currentPage
                                        ? "default"
                                        : "outline"
                                    }
                                    size="sm"
                                    onClick={() => handlePageChange(page)}
                                    disabled={loadingMore}
                                    className={`min-w-[2.5rem] ${
                                      page === currentPage
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                        : "border-muted hover:bg-muted/80"
                                    }`}
                                  >
                                    {page}
                                  </Button>
                                )}
                              </React.Fragment>
                            ))}
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages || loadingMore}
                            className="border-muted hover:bg-muted/80 cursor-pointer"
                          >
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {loadingMore && (
                      <div className="flex justify-center py-4">
                        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                      </div>
                    )}
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-12 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/20"
                  >
                    <div className="flex flex-col items-center justify-center gap-4 max-w-md mx-auto">
                      <AlertCircle className="h-10 w-10 text-muted-foreground" />
                      <h3 className="text-xl font-medium text-foreground">
                        No users found
                      </h3>
                      <p className="text-muted-foreground">
                        We couldn't find any users matching your criteria. Try
                        adjusting your search filters or add a new user.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </RequireAuth>
  );
};

export default DashboardUsersPage;
