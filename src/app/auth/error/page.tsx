"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Client component that safely uses useSearchParams
const AuthErrorContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  const [errorMessage, setErrorMessage] = useState<string>(
    "There was a problem authenticating your account."
  );
  const [redirectPath, setRedirectPath] = useState("/login");
  const [buttonText, setButtonText] = useState("Return to Login");
  const [redirectText, setRedirectText] = useState("login");

  // First effect: process the error message and set up derived state
  useEffect(() => {
    // Get error message from URL if it exists
    const error = searchParams.get("message") || searchParams.get("error");
    if (error) {
      const decodedError = decodeURIComponent(error);
      setErrorMessage(decodedError);

      // Update redirect path and button text based on error message
      const isNoAccountError = decodedError.includes("No account found");
      setRedirectPath(isNoAccountError ? "/register" : "/login");
      setButtonText(isNoAccountError ? "Register Now" : "Return to Login");
      setRedirectText(isNoAccountError ? "registration" : "login");
    }
  }, [searchParams]);

  // Second effect: handle the countdown and redirect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timer) clearInterval(timer);
          // Use setTimeout to avoid state updates during render
          setTimeout(() => {
            router.push(redirectPath);
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [router, redirectPath]);

  // Handle button click
  const handleButtonClick = () => {
    // Use setTimeout to avoid state updates during render
    setTimeout(() => {
      router.push(redirectPath);
    }, 0);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 relative">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 z-0 pointer-events-none"></div>

        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24 relative z-10 flex-grow flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full"
          >
            <div className="rounded-xl border border-border/40 shadow-sm overflow-hidden">
              <div className="bg-card p-6 sm:p-8 md:p-10 rounded-[10px] text-center">
                <div className="flex justify-center mb-6">
                  <XCircle className="h-20 w-20 text-destructive" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mb-4 text-destructive">
                  Authentication Failed
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground mb-6">
                  {errorMessage}
                </p>
                <div className="space-y-4">
                  <Button
                    onClick={handleButtonClick}
                    className="rounded-full px-6 py-2.5 font-medium"
                  >
                    {buttonText}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    Redirecting to {redirectText} in{" "}
                    <span className="font-medium text-foreground">
                      {countdown}
                    </span>{" "}
                    seconds...
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Loading fallback component
const LoadingFallback = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 relative">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 z-0 pointer-events-none"></div>

        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24 relative z-10 flex-grow flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Main page component with Suspense boundary
const AuthErrorPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthErrorContent />
    </Suspense>
  );
};

export default AuthErrorPage;
