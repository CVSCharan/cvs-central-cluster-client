"use client";

import React from "react";
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
  BarChart3,
  Users,
  FileText,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Star,
  Clock,
  ChevronRight,
  Plus,
  FolderPlus,
  Settings,
  Bell,
} from "lucide-react";

// Sample data for the dashboard
const stats = [
  {
    title: "Total Projects",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: <FolderPlus className="h-4 w-4" />,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Total Users",
    value: "1,293",
    change: "+18%",
    trend: "up",
    icon: <Users className="h-4 w-4" />,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Blog Posts",
    value: "48",
    change: "+24%",
    trend: "up",
    icon: <FileText className="h-4 w-4" />,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Messages",
    value: "214",
    change: "-3%",
    trend: "down",
    icon: <MessageSquare className="h-4 w-4" />,
    color: "bg-amber-500/10 text-amber-500",
  },
];

const recentProjects = [
  {
    id: 1,
    name: "E-commerce Platform",
    category: "Web Development",
    date: "2 days ago",
    views: 1240,
    stars: 24,
  },
  {
    id: 2,
    name: "Mobile Banking App",
    category: "Mobile App",
    date: "1 week ago",
    views: 980,
    stars: 18,
  },
  {
    id: 3,
    name: "Healthcare Dashboard",
    category: "UI/UX Design",
    date: "2 weeks ago",
    views: 1560,
    stars: 32,
  },
];

const recentActivities = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "/avatars/alex.jpg",
      initials: "AJ",
    },
    action: "added a new project",
    target: "E-commerce Platform",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Sarah Williams",
      avatar: "/avatars/sarah.jpg",
      initials: "SW",
    },
    action: "commented on",
    target: "Mobile Banking App",
    time: "5 hours ago",
  },
  {
    id: 3,
    user: {
      name: "Michael Chen",
      avatar: "/avatars/michael.jpg",
      initials: "MC",
    },
    action: "updated the status of",
    target: "Healthcare Dashboard",
    time: "1 day ago",
  },
  {
    id: 4,
    user: {
      name: "Emily Davis",
      avatar: "/avatars/emily.jpg",
      initials: "ED",
    },
    action: "published a new blog post",
    target: "Design Trends 2023",
    time: "2 days ago",
  },
];

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavBar />

      <main className="flex-1 relative">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 z-0 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight mb-2">
              Welcome to your Dashboard
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              {`Here's what's happening with your projects today.`}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={`rounded-full p-2 ${stat.color}`}>
                      {stat.icon}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="flex items-center text-xs">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span
                      className={`${
                        stat.trend === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      vs last month
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Recent Projects</CardTitle>
                      <CardDescription>
                        Your latest project activity
                      </CardDescription>
                    </div>
                    <Button asChild variant="ghost" size="sm" className="gap-1">
                      <Link href="/dashboard/projects">
                        View all
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {recentProjects.map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex flex-col">
                          <Link
                            href={`/dashboard/projects/${project.id}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {project.name}
                          </Link>
                          <span className="text-xs text-muted-foreground">
                            {project.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{project.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 text-amber-500" />
                            <span>{project.stars}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {project.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full gap-1"
                  >
                    <Link href="/dashboard/projects/new">
                      <Plus className="h-3.5 w-3.5" />
                      Add New Project
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>
                        Latest actions from your team
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Bell className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={activity.user.avatar}
                            alt={activity.user.name}
                          />
                          <AvatarFallback>
                            {activity.user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">
                              {activity.user.name}
                            </span>{" "}
                            {activity.action}{" "}
                            <Link
                              href="#"
                              className="font-medium text-primary hover:underline"
                            >
                              {activity.target}
                            </Link>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Frequently used actions and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {[
                    {
                      name: "Add Project",
                      icon: <FolderPlus className="h-5 w-5" />,
                      href: "/dashboard/projects/new",
                      color: "bg-primary/10 text-primary",
                    },
                    {
                      name: "Manage Users",
                      icon: <Users className="h-5 w-5" />,
                      href: "/dashboard/users",
                      color: "bg-blue-500/10 text-blue-500",
                    },
                    {
                      name: "New Post",
                      icon: <FileText className="h-5 w-5" />,
                      href: "/dashboard/blog/new",
                      color: "bg-purple-500/10 text-purple-500",
                    },
                    {
                      name: "Messages",
                      icon: <MessageSquare className="h-5 w-5" />,
                      href: "/dashboard/messages",
                      color: "bg-amber-500/10 text-amber-500",
                    },
                    {
                      name: "Analytics",
                      icon: <BarChart3 className="h-5 w-5" />,
                      href: "/dashboard/analytics",
                      color: "bg-green-500/10 text-green-500",
                    },
                    {
                      name: "Settings",
                      icon: <Settings className="h-5 w-5" />,
                      href: "/dashboard/settings",
                      color: "bg-gray-500/10 text-gray-500 dark:text-gray-400",
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

          {/* Performance Chart Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Performance Overview</CardTitle>
                    <CardDescription>
                      Monthly traffic and engagement metrics
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Monthly
                    </Button>
                    <Button variant="ghost" size="sm">
                      Weekly
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center space-y-3">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">
                        Chart visualization will appear here
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Connect your analytics to see real data
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Connect Analytics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
