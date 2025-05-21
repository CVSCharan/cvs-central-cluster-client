"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/layout/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  ArrowUpDown,
  CheckCircle2,
  Loader2,
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
  }, []);

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

  const handleSort = (field: string) => {
    setSortBy((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

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

  // Determine status based on isAdmin
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

  return (
    <RequireAuth>
      <div className="flex min-h-screen flex-col bg-background">
        <NavBar />

        <main className="flex-1 relative">
          {/* Subtle background pattern for professional look */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
              backgroundSize: "60px 60px",
            }}
          ></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
            {/* Header Section with refined typography */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight mb-2">
                    Users
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Manage user accounts and permissions
                  </p>
                </div>
                <Button
                  asChild
                  className="rounded-md gap-2 bg-primary hover:bg-primary/90 text-white shadow-sm"
                >
                  <Link href="/dashboard/users/new">
                    <UserPlus className="h-4 w-4" />
                    New User
                  </Link>
                </Button>
              </div>

              {/* Filters and Search with refined styling */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Search with improved styling */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>

                {/* Role Filter with improved styling */}
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary appearance-none"
                  >
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stats with refined styling */}
                <div className="flex items-center justify-end gap-6 col-span-2">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-primary">
                      {users.length}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Total Users
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-primary">
                      {filteredUsers.length}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Filtered Results
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Users Table with professional styling */}
            <Card className="border-0 shadow-md rounded-lg overflow-hidden">
              <CardHeader className="pb-3 bg-muted/30 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-serif">
                      User List
                    </CardTitle>
                    <CardDescription>
                      {filteredUsers.length} users found
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
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
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50 border-b">
                        <tr>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                            <button
                              className="flex items-center gap-1 hover:text-foreground transition-colors"
                              onClick={() => handleSort("name")}
                            >
                              User
                              <ArrowUpDown className="h-3 w-3" />
                            </button>
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">
                            <button
                              className="flex items-center gap-1 hover:text-foreground transition-colors"
                              onClick={() => handleSort("role")}
                            >
                              Role
                              <ArrowUpDown className="h-3 w-3" />
                            </button>
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                            <button
                              className="flex items-center gap-1 hover:text-foreground transition-colors"
                              onClick={() => handleSort("isAdmin")}
                            >
                              Status
                              <ArrowUpDown className="h-3 w-3" />
                            </button>
                          </th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user, index) => (
                            <tr
                              key={index}
                              className="hover:bg-muted/30 transition-colors"
                            >
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-9 w-9 border border-muted shadow-sm">
                                    <AvatarImage
                                      src={user.picture}
                                      alt={user.name}
                                    />
                                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                      {getInitials(user.name)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">
                                      {user.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {user.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4 hidden md:table-cell">
                                <div className="flex items-center gap-1.5">
                                  {getRoleIcon(user.role)}
                                  <span className="font-medium text-sm">
                                    {user.role}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4 hidden lg:table-cell">
                                {getStatusBadge(user)}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-md hover:bg-primary/10 hover:text-primary"
                                    asChild
                                  >
                                    <Link href={`/dashboard/users/${user.id}`}>
                                      <Eye className="h-4 w-4" />
                                    </Link>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-md hover:bg-primary/10 hover:text-primary"
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
                                    size="icon"
                                    className="h-8 w-8 rounded-md text-destructive hover:text-destructive hover:bg-destructive/10"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={4}
                              className="py-12 text-center text-muted-foreground"
                            >
                              No users found. Try adjusting your search
                              criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
              {totalPages > 1 && (
                <div className="flex justify-center p-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadMoreUsers}
                    disabled={loadingMore || currentPage >= totalPages}
                    className="gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>Load More Users</>
                    )}
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>
    </RequireAuth>
  );
};

export default DashboardUsersPage;
