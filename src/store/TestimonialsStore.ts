import { create } from "zustand";
import { Testimonial } from "@/types/testimonials";

interface TestimonialsState {
  // State
  testimonials: Testimonial[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  pageLimit: number;
  recentTestimonials: Testimonial[];
  recentLoading: boolean;
  recentError: string | null;
  apiUrl: string;

  // Actions
  fetchTestimonials: (page?: number, limit?: number) => Promise<void>;
  loadMoreTestimonials: () => Promise<void>;
  fetchRecentTestimonials: (limit?: number) => Promise<void>;
}

export const useTestimonialsStore = create<TestimonialsState>((set, get) => ({
  // State
  testimonials: [],
  loading: false,
  loadingMore: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  pageLimit: 4,
  recentTestimonials: [],
  recentLoading: false,
  recentError: null,
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",

  // Actions
  fetchTestimonials: async (page = 1, limit = 4) => {
    set({ loading: true, error: null, pageLimit: limit });

    try {
      const response = await fetch(
        `${get().apiUrl}/testimonials/approved?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }

      const data = await response.json();
      // Ensure we're handling the response correctly
      const testimonialsList = Array.isArray(data.testimonials)
        ? data.testimonials
        : Array.isArray(data)
        ? data
        : [];

      set({
        testimonials: testimonialsList,
        totalPages: data.totalPages || 1,
        currentPage: page,
        loading: false,
      });
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      set({
        error: "Failed to load testimonials. Please try again later.",
        testimonials: [],
        loading: false,
      });
    }
  },

  loadMoreTestimonials: async () => {
    const { currentPage, totalPages, pageLimit, testimonials } = get();

    if (currentPage >= totalPages) return;

    set({ loadingMore: true });
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(
        `${
          get().apiUrl
        }/testimonials/approved?page=${nextPage}&limit=${pageLimit}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch more testimonials");
      }

      const data = await response.json();

      // Ensure we're handling the response correctly
      const newTestimonials = Array.isArray(data.testimonials)
        ? data.testimonials
        : Array.isArray(data)
        ? data
        : [];

      // Properly append new testimonials to existing ones
      set({
        testimonials: [...testimonials, ...newTestimonials],
        currentPage: nextPage,
        loadingMore: false,
      });
    } catch (err) {
      console.error("Error fetching more testimonials:", err);
      set({
        error: "Failed to load more testimonials. Please try again.",
        loadingMore: false,
      });
    }
  },

  fetchRecentTestimonials: async (limit = 3) => {
    set({ recentLoading: true, recentError: null });

    try {
      const response = await fetch(
        `${get().apiUrl}/testimonials/recent?limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recent testimonials");
      }

      const data = await response.json();
      // Ensure we're handling the response correctly
      const recentList = Array.isArray(data.testimonials)
        ? data.testimonials
        : Array.isArray(data)
        ? data
        : [];

      set({
        recentTestimonials: recentList,
        recentLoading: false,
      });
    } catch (err) {
      console.error("Error fetching recent testimonials:", err);
      set({
        recentError: "Failed to load recent testimonials.",
        recentTestimonials: [],
        recentLoading: false,
      });
    }
  },
}));
