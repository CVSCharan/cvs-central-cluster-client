"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/AuthStore";
import { Loader2 } from "lucide-react";

interface RequireAuthProps {
  children: ReactNode;
  redirectTo?: string;
}

const RequireAuth = ({ 
  children, 
  redirectTo = "/login" 
}: RequireAuthProps) => {
  const router = useRouter();
  const { isAuthenticated, isLoading, token } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      // If still loading, wait for auth state to be determined
      if (isLoading) return;
      
      // If not authenticated and not loading, redirect to login
      if (!isAuthenticated && !token) {
        router.push(redirectTo);
      } else {
        // Auth check complete, render children
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, isLoading, router, redirectTo, token]);

  // Show loading state while checking authentication
  if (isLoading || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};

export default RequireAuth;