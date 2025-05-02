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
import {
  FileText,
  Search,
  Filter,
  Clock,
  Edit,
  Trash2,
  Eye,
  Plus,
  Calendar,
  ArrowUpDown,
  XCircle,
  FileUp,
  Settings,
  Tag,
  ChevronRight,
  CheckCircle2,
  BarChart,
  MessageSquare
} from "lucide-react";

// Sample blog post data for the admin panel
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React and TypeScript",
    excerpt:
      "A comprehensive guide to setting up a new project with React and TypeScript for better developer experience.",
    date: "April 3, 2025",
    readTime: "5 min read",
    category: "React",
    status: "Published",
    author: "Alex Johnson",
    views: 1240,
    comments: 8,
  },
  {
    id: 2,
    title: "Building Accessible Web Applications",
    excerpt:
      "Learn the principles of web accessibility and how to implement them in your projects for a better user experience.",
    date: "March 22, 2025",
    readTime: "8 min read",
    category: "Accessibility",
    status: "Published",
    author: "Sarah Williams",
    views: 980,
    comments: 5,
  },
  {
    id: 3,
    title: "Optimizing React Performance",
    excerpt:
      "Tips and tricks to improve the performance of your React applications and provide a smoother user experience.",
    date: "March 10, 2025",
    readTime: "6 min read",
    category: "Performance",
    status: "Draft",
    author: "Michael Chen",
    views: 0,
    comments: 0,
  },
  {
    id: 4,
    title: "Introduction to GraphQL",
    excerpt:
      "Understand the basics of GraphQL and how it differs from traditional REST APIs for data fetching.",
    date: "February 28, 2025",
    readTime: "7 min read",
    category: "GraphQL",
    status: "Published",
    author: "Emily Davis",
    views: 1560,
    comments: 12,
  },
  {
    id: 5,
    title: "Design Systems for Developers",
    excerpt:
      "How to create and implement a design system that improves consistency and development speed.",
    date: "February 14, 2025",
    readTime: "9 min read",
    category: "Design",
    status: "Scheduled",
    author: "James Wilson",
    views: 0,
    comments: 0,
  },
  {
    id: 6,
    title: "The Future of Web Development",
    excerpt:
      "Exploring upcoming trends and technologies that will shape the future of web development.",
    date: "January 30, 2025",
    readTime: "4 min read",
    category: "Trends",
    status: "Published",
    author: "Olivia Martinez",
    views: 2100,
    comments: 15,
  },
];

const DashboardBlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<{
    field: string;
    direction: "asc" | "desc";
  }>({
    field: "date",
    direction: "desc",
  });

  // Filter blog posts based on search term, category, and status
  const filteredPosts = blogPosts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ||
        post.category.toLowerCase() === categoryFilter.toLowerCase();

      const matchesStatus =
        statusFilter === "all" ||
        post.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesCategory && matchesStatus;
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

  const categories = [
    { name: "All Categories", value: "all" },
    { name: "React", value: "react" },
    { name: "Accessibility", value: "accessibility" },
    { name: "Performance", value: "performance" },
    { name: "GraphQL", value: "graphql" },
    { name: "Design", value: "design" },
    { name: "Trends", value: "trends" },
  ];

  const statuses = [
    { name: "All Statuses", value: "all" },
    { name: "Published", value: "published" },
    { name: "Draft", value: "draft" },
    { name: "Scheduled", value: "scheduled" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Published
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400">
            <Edit className="h-3 w-3 mr-1" />
            Draft
          </span>
        );
      case "scheduled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500">
            <Clock className="h-3 w-3 mr-1" />
            Scheduled
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
                  Blog Posts
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Manage and organize your blog content
                </p>
              </div>
              <Button asChild className="rounded-full gap-2">
                <Link href="/dashboard/blogs/new">
                  <Plus className="h-4 w-4" />
                  Create New Post
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
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.name}
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
                  <span className="text-2xl font-bold">{blogPosts.length}</span>
                  <span className="text-xs text-muted-foreground">
                    Total Posts
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold">
                    {filteredPosts.length}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Filtered Results
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Blog Posts Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Post List</CardTitle>
                    <CardDescription>
                      {filteredPosts.length} posts found
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
                            onClick={() => handleSort("title")}
                          >
                            Title
                            <ArrowUpDown className="h-3 w-3" />
                          </button>
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">
                          <button
                            className="flex items-center gap-1 hover:text-foreground transition-colors"
                            onClick={() => handleSort("category")}
                          >
                            Category
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
                            onClick={() => handleSort("date")}
                          >
                            Date
                            <ArrowUpDown className="h-3 w-3" />
                          </button>
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                          <tr
                            key={post.id}
                            className="hover:bg-muted/50 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                                  <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                  <div className="font-medium">{post.title}</div>
                                  <div className="text-xs text-muted-foreground line-clamp-1">
                                    {post.excerpt}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                {post.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 hidden lg:table-cell">
                              {getStatusBadge(post.status)}
                            </td>
                            <td className="py-3 px-4 hidden sm:table-cell">
                              <div className="flex flex-col">
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Calendar size={14} className="mr-1" />{" "}
                                  {post.date}
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                  <Clock size={14} className="mr-1" />{" "}
                                  {post.readTime}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  asChild
                                >
                                  <Link href={`/blog/${post.id}`} target="_blank">
                                    <Eye className="h-4 w-4" />
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  asChild
                                >
                                  <Link href={`/dashboard/blogs/${post.id}/edit`}>
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
                              <p>No blog posts found</p>
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
                  Showing {filteredPosts.length} of {blogPosts.length} posts
                </div>
                <Button asChild variant="outline" size="sm" className="gap-1">
                  <Link href="/dashboard/blogs/new">
                    <Plus className="h-3.5 w-3.5" />
                    New Post
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
                <CardTitle>Blog Management</CardTitle>
                <CardDescription>
                  Quick actions for blog administration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    {
                      name: "Categories",
                      icon: <Tag className="h-5 w-5" />,
                      href: "/dashboard/blogs/categories",
                      color: "bg-primary/10 text-primary",
                    },
                    {
                      name: "Import Posts",
                      icon: <FileUp className="h-5 w-5" />,
                      href: "/dashboard/blogs/import",
                      color: "bg-blue-500/10 text-blue-500",
                    },
                    {
                      name: "Analytics",
                      icon: <BarChart className="h-5 w-5" />,
                      href: "/dashboard/blogs/analytics",
                      color: "bg-purple-500/10 text-purple-500",
                    },
                    {
                      name: "Settings",
                      icon: <Settings className="h-5 w-5" />,
                      href: "/dashboard/blogs/settings",
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

          {/* Blog Post Grid View (Alternative View) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Grid View</h2>
              <Button variant="outline" size="sm">
                Toggle View
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.slice(0, 3).map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      Blog Post Image
                    </div>
                    <div className="absolute top-2 right-2">
                      {getStatusBadge(post.status)}
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" /> {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" /> {post.readTime}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        By {post.author}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Eye size={14} className="mr-1" /> {post.views} views
                      </div>
                      <div className="flex items-center">
                        <MessageSquare size={14} className="mr-1" />{" "}
                        {post.comments} comments
                      </div>
                    </div>
                    <Link
                      href={`/dashboard/blogs/${post.id}/edit`}
                      className="inline-flex items-center text-primary text-xs font-medium hover:underline"
                    >
                      Edit
                      <ChevronRight size={14} className="ml-1" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredPosts.length > 3 && (
              <div className="flex justify-center mt-6">
                <Button variant="outline" className="gap-1">
                  View All Posts
                  <ChevronRight size={16} />
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DashboardBlogsPage;
