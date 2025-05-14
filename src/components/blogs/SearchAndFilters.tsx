import React from "react";
import Link from "next/link";
import { Calendar, Clock, ChevronRight, Search } from "lucide-react";

const SearchAndFiltersSection = ({
  searchQuery,
  setSearchQuery,
  categories,
  filteredPosts,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: string[];
  filteredPosts: Array<{
    id: number;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
  }>;
}) => {
  return (
    <section className="pb-16 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSearchQuery(category === "All" ? "" : category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                (category === "All" && searchQuery === "") ||
                (category !== "All" &&
                  searchQuery.toLowerCase() === category.toLowerCase())
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="border rounded-xl overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  Blog Post Image
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                    {post.category}
                  </span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar size={14} className="mr-1" /> {post.date}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock size={14} className="mr-1" /> {post.readTime}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  Read More
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No articles found. Try a different search term.
            </p>
          </div>
        )}

        {/* <div className="flex justify-center">
      <button className="px-6 py-3 bg-muted hover:bg-muted/80 rounded-md text-foreground font-medium transition-colors">
        Load More
      </button>
    </div> */}
      </div>
    </section>
  );
};

export default SearchAndFiltersSection;
