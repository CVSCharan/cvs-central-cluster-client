import { ReactNode } from "react";

export interface Testimonial {
  _id: string;
  user: string;
  name: string;
  avatar?: string;
  content: string;
  rating: number;
  isApproved: boolean;
  position?: string;
  company?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TestimonialsContextType {
  // Shared state
  apiUrl: string;

  // For testimonials page (paginated)
  testimonials: Testimonial[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;

  // For testimonial section (recent)
  recentTestimonials: Testimonial[];
  recentLoading: boolean;
  recentError: string | null;

  // Methods
  fetchTestimonials: (page: number, limit: number) => Promise<void>;
  loadMoreTestimonials: () => Promise<void>;
  fetchRecentTestimonials: () => Promise<void>;
  resetTestimonials: () => void;
}

export interface TestimonialsProviderProps {
  children: ReactNode;
}
