import { create } from "zustand";
import { User } from "@/types/users";
import { useAuthStore } from "./AuthStore"; // Import the hook version
import Cookies from "js-cookie";

interface UsersState {
  // State
  users: User[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  pageLimit: number;
  apiUrl: string;

  // Actions
  fetchUsers: (page?: number, limit?: number) => Promise<void>;
  loadMoreUsers: () => Promise<void>;
  clearError: () => void;
}

export const useUsersStore = create<UsersState>((set, get) => ({
  // State
  users: [],
  loading: false,
  loadingMore: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  pageLimit: 4,
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",

  // Actions
  fetchUsers: async (page = 1, limit = 4) => {
    set({ loading: true, error: null, pageLimit: limit });

    try {
      // Get token from cookies or auth store
      const token =
        Cookies.get("cvs_central_cluster_user_token") ||
        useAuthStore.getState().token;

      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `${get().apiUrl}/auth/admin/users?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include", // Match your auth store's approach
        }
      );

      if (response.status === 401) {
        // Handle unauthorized (token expired)
        useAuthStore.getState().logout();
        throw new Error("Session expired. Please login again.");
      }

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      const usersList = Array.isArray(data.users)
        ? data.users
        : Array.isArray(data)
        ? data
        : [];

      set({
        users: usersList,
        totalPages: data.totalPages || 1,
        currentPage: page,
        loading: false,
      });
    } catch (err: any) {
      console.error("Error fetching users:", err);
      set({
        error: err.message || "Failed to load users. Please try again later.",
        users: [],
        loading: false,
      });
      throw err; // Re-throw to allow components to handle
    }
  },

  loadMoreUsers: async () => {
    const { currentPage, totalPages, pageLimit, users } = get();

    if (currentPage >= totalPages) return;

    set({ loadingMore: true });
    try {
      // Get token from cookies or auth store
      const token =
        Cookies.get("cvs_central_cluster_user_token") ||
        useAuthStore.getState().token;

      if (!token) {
        throw new Error("Authentication required");
      }

      const nextPage = currentPage + 1;
      const response = await fetch(
        `${get().apiUrl}/auth/admin/users?page=${nextPage}&limit=${pageLimit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.status === 401) {
        // Handle unauthorized (token expired)
        useAuthStore.getState().logout();
        throw new Error("Session expired. Please login again.");
      }

      if (!response.ok) {
        throw new Error("Failed to fetch more users");
      }

      const data = await response.json();
      const newUsers = Array.isArray(data.users)
        ? data.users
        : Array.isArray(data)
        ? data
        : [];

      set({
        users: [...users, ...newUsers],
        currentPage: nextPage,
        loadingMore: false,
      });
    } catch (err: any) {
      console.error("Error fetching more users:", err);
      set({
        error: err.message || "Failed to load more users. Please try again.",
        loadingMore: false,
      });
      throw err; // Re-throw to allow components to handle
    }
  },

  clearError: () => set({ error: null }),
}));
