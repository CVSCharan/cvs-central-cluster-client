"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import HeroSection from "@/components/blogs/Hero";
import SearchAndFiltersSection from "@/components/blogs/SearchAndFilters";
import NewsletterSection from "@/components/blogs/Newsletter";
import { Footer } from "@/components/layout/footer";

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React and TypeScript",
      excerpt:
        "A comprehensive guide to setting up a new project with React and TypeScript for better developer experience.",
      date: "April 3, 2025",
      readTime: "5 min read",
      category: "React",
      image: "",
    },
    {
      id: 2,
      title: "Building Accessible Web Applications",
      excerpt:
        "Learn the principles of web accessibility and how to implement them in your projects for a better user experience.",
      date: "March 22, 2025",
      readTime: "8 min read",
      category: "Accessibility",
      image: "",
    },
    {
      id: 3,
      title: "Optimizing React Performance",
      excerpt:
        "Tips and tricks to improve the performance of your React applications and provide a smoother user experience.",
      date: "March 10, 2025",
      readTime: "6 min read",
      category: "Performance",
      image: "",
    },
    {
      id: 4,
      title: "Introduction to GraphQL",
      excerpt:
        "Understand the basics of GraphQL and how it differs from traditional REST APIs for data fetching.",
      date: "February 28, 2025",
      readTime: "7 min read",
      category: "GraphQL",
      image: "",
    },
    {
      id: 5,
      title: "Design Systems for Developers",
      excerpt:
        "How to create and implement a design system that improves consistency and development speed.",
      date: "February 14, 2025",
      readTime: "9 min read",
      category: "Design",
      image: "",
    },
    {
      id: 6,
      title: "The Future of Web Development",
      excerpt:
        "Exploring upcoming trends and technologies that will shape the future of web development.",
      date: "January 30, 2025",
      readTime: "4 min read",
      category: "Trends",
      image: "",
    },
  ];

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    "All",
    "React",
    "Accessibility",
    "Performance",
    "GraphQL",
    "Design",
    "Trends",
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Search and Filter */}
      <SearchAndFiltersSection
        searchQuery={searchQuery}
        categories={categories}
        setSearchQuery={setSearchQuery}
        filteredPosts={filteredPosts}
      />

      {/* Newsletter Section */}
      <NewsletterSection />

      <Footer />
    </div>
  );
};

export default BlogPage;
