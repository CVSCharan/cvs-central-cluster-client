import { User } from "./users";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  refreshUserData: () => Promise<void>;
  fetchUserProfile: (token: string) => Promise<void>;
  saveUserDataToCookies: (userData: LoginProps) => Promise<void>;
}

export interface LoginProps {
  success: true;
  token: string;
  user: User;
}
