import { create } from 'zustand';
import { User } from '@/types/users';
import { LoginProps } from '@/types/auth';
import Cookies from 'js-cookie';

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  apiUrl: string;
  
  // Actions
  login: (credentials: LoginProps) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  fetchUserProfile: (authToken: string) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // State
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  
  // Actions
  login: async (credentials: LoginProps) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${get().apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Set token in cookie
      Cookies.set("cvs_central_cluster_user_token", data.token, {
        expires: 1, // 1 day
        sameSite: "Strict",
      });

      // Set user data in cookie
      Cookies.set(
        "cvs_central_cluster_user_data",
        JSON.stringify(data.user),
        {
          expires: 1, // 1 day
          sameSite: "Strict",
        }
      );

      set({
        token: data.token,
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err: any) {
      console.error("Login error:", err);
      set({
        error: err.message || "Login failed. Please try again.",
        isLoading: false,
      });
    }
  },
  
  register: async (userData: any) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${get().apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      set({ isLoading: false });
      return data;
    } catch (err: any) {
      console.error("Registration error:", err);
      set({
        error: err.message || "Registration failed. Please try again.",
        isLoading: false,
      });
      throw err;
    }
  },
  
  logout: () => {
    // Remove cookies
    Cookies.remove("cvs_central_cluster_user_token");
    Cookies.remove("cvs_central_cluster_user_data");
    
    // Reset state
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
  
  fetchUserProfile: async (authToken: string) => {
    try {
      const response = await fetch(`${get().apiUrl}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        set({ user: userData.user });

        // Save to cookies with longer expiration
        Cookies.set(
          "cvs_central_cluster_user_data",
          JSON.stringify(userData.user),
          {
            expires: 1, // 1 day
            sameSite: "Strict",
          }
        );
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      throw err;
    }
  },
  
  clearError: () => set({ error: null }),
}));

// Initialize auth state on app load
if (typeof window !== 'undefined') {
  const storedToken = Cookies.get("cvs_central_cluster_user_token");
  const storedUserData = Cookies.get("cvs_central_cluster_user_data");

  if (storedToken) {
    useAuthStore.setState({ token: storedToken });

    // If we have a token but no user data, fetch the user profile
    if (!storedUserData) {
      useAuthStore.getState().fetchUserProfile(storedToken)
        .then(() => {
          useAuthStore.setState({ isAuthenticated: true, isLoading: false });
        })
        .catch(() => {
          useAuthStore.setState({ isAuthenticated: false, isLoading: false });
          // Clear invalid token
          Cookies.remove("cvs_central_cluster_user_token");
        });
    } else {
      // If we have both token and user data, set them
      try {
        const userData = JSON.parse(storedUserData);
        useAuthStore.setState({ 
          user: userData, 
          isAuthenticated: true, 
          isLoading: false 
        });
      } catch (e) {
        console.error("Error parsing stored user data:", e);
        // If user data is corrupted, fetch it again
        useAuthStore.getState().fetchUserProfile(storedToken).catch(() => {
          Cookies.remove("cvs_central_cluster_user_token");
          Cookies.remove("cvs_central_cluster_user_data");
        });
        useAuthStore.setState({ isLoading: false });
      }
    }
  } else {
    // No token found
    useAuthStore.setState({ isAuthenticated: false, isLoading: false });
  }
}