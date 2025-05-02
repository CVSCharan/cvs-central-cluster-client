"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/layout/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users as UsersIcon,
  Search,
  Filter,
  Clock,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  UserCog,
  Lock,
} from "lucide-react";

// Sample user data for the admin panel
const users = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Admin",
    status: "Active",
    avatar: "/avatars/alex.jpg",
    initials: "AJ",
    phone: "+1 (555) 123-4567",
    lastActive: "2 hours ago",
    joinDate: "Jan 15, 2023",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "Editor",
    status: "Active",
    avatar: "/avatars/sarah.jpg",
    initials: "SW",
    phone: "+1 (555) 234-5678",
    lastActive: "5 hours ago",
    joinDate: "Feb 3, 2023",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "Viewer",
    status: "Inactive",
    avatar: "/avatars/michael.jpg",
    initials: "MC",
    phone: "+1 (555) 345-6789",
    lastActive: "2 days ago",
    joinDate: "Mar 22, 2023",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Editor",
    status: "Active",
    avatar: "/avatars/emily.jpg",
    initials: "ED",
    phone: "+1 (555) 456-7890",
    lastActive: "1 day ago",
    joinDate: "Apr 10, 2023",
  },
  {
    id: 5,
    name: "James Wilson",
    email: "james.wilson@example.com",
    role: "Viewer",
    status: "Pending",
    avatar: "/avatars/james.jpg",
    initials: "JW",
    phone: "+1 (555) 567-8901",
    lastActive: "Never",
    joinDate: "May 5, 2023",
  },
  {
    id: 6,
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    role: "Admin",
    status: "Active",
    avatar: "/avatars/olivia.jpg",
    initials: "OM",
    phone: "+1 (555) 678-9012",
    lastActive: "3 hours ago",
    joinDate: "Jun 18, 2023",
  },
];

const DashboardUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<{
    field: string;
    direction: "asc" | "desc";
  }>({
    field: "name",
    direction: "asc",
  });

  // Filter users based on search term, role, and status
  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === "all" ||
        user.role.toLowerCase() === roleFilter.toLowerCase();
      const matchesStatus =
        statusFilter === "all" ||
        user.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      const fieldA = a[sortBy.field as keyof typeof a];
      const fieldB = b[sortBy.field as keyof typeof b];

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

  const statuses = [
    { name: "All Statuses", value: "all" },
    { name: "Active", value: "active" },
    { name: "Inactive", value: "inactive" },
    { name: "Pending", value: "pending" },
  ];

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

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Active
          </span>
        );
      case "inactive":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400">
            <XCircle className="h-3 w-3 mr-1" />
            Inactive
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
      default:
        return null;
    }
  };

  return (
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
                  Add New User
                </Link>
              </Button>
            </div>

            {/* Filters and Search */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-end gap-6">
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

          {/* Users Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>User List</CardTitle>
                    <CardDescription>
                      {filteredUsers.length} users found
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
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
                            onClick={() => handleSort("status")}
                          >
                            Status
                            <ArrowUpDown className="h-3 w-3" />
                          </button>
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                          <button
                            className="flex items-center gap-1 hover:text-foreground transition-colors"
                            onClick={() => handleSort("joinDate")}
                          >
                            Joined
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
                        filteredUsers.map((user) => (
                          <tr
                            key={user.id}
                            className="hover:bg-muted/50 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={user.avatar}
                                    alt={user.name}
                                  />
                                  <AvatarFallback>
                                    {user.initials}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{user.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {user.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <div className="flex items-center gap-1.5">
                                {getRoleIcon(user.role)}
                                <span>{user.role}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 hidden lg:table-cell">
                              {getStatusBadge(user.status)}
                            </td>
                            <td className="py-3 px-4 hidden sm:table-cell text-sm text-muted-foreground">
                              {user.joinDate}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  asChild
                                >
                                  <Link href={`/dashboard/users/${user.id}`}>
                                    <Eye className="h-4 w-4" />
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
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
                                  className="h-8 w-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
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
                            colSpan={5}
                            className="py-10 text-center text-muted-foreground"
                          >
                            <div className="flex flex-col items-center justify-center gap-2">
                              <XCircle className="h-8 w-8" />
                              <p>No users found</p>
                              <p className="text-xs">
                                Try adjusting your search or filters
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredUsers.length} of {users.length} users
                </div>
                <Button asChild variant="outline" size="sm" className="gap-1">
                  <Link href="/dashboard/users/new">
                    <UserPlus className="h-3.5 w-3.5" />
                    Add User
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Quick actions for user administration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    {
                      name: "Bulk Import",
                      icon: <UsersIcon className="h-5 w-5" />,
                      href: "/dashboard/users/import",
                      color: "bg-primary/10 text-primary",
                    },
                    {
                      name: "Role Management",
                      icon: <Shield className="h-5 w-5" />,
                      href: "/dashboard/users/roles",
                      color: "bg-blue-500/10 text-blue-500",
                    },
                    {
                      name: "Permissions",
                      icon: <Lock className="h-5 w-5" />,
                      href: "/dashboard/users/permissions",
                      color: "bg-purple-500/10 text-purple-500",
                    },
                    {
                      name: "User Settings",
                      icon: <UserCog className="h-5 w-5" />,
                      href: "/dashboard/users/settings",
                      color: "bg-amber-500/10 text-amber-500",
                    },
                  ].map((action, index) => (
                    <Link
                      key={index}
                      href={action.href}
                      className="flex flex-col items-center justify-center p-4 rounded-xl border bg-card hover:bg-accent/50 transition-colors text-center gap-2"
                    >
                      <div className={`rounded-full p-3 ${action.color}`}>
                        {action.icon}
                      </div>
                      <span className="text-sm font-medium">{action.name}</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DashboardUsersPage;
