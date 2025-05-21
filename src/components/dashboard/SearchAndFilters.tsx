import React from "react";
import { Search, Filter } from "lucide-react";

interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  categories: { name: string; value: string }[];
  totalCount: number;
  filteredCount: number;
}

const SearchAndFilters = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  categories,
  totalCount,
  filteredCount,
}: SearchAndFiltersProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      {/* Category Filter */}
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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

      {/* Stats */}
      <div className="lg:flex items-center justify-end gap-6 hidden">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{totalCount}</span>
          <span className="text-xs text-muted-foreground">Total Projects</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{filteredCount}</span>
          <span className="text-xs text-muted-foreground">Filtered Results</span>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;