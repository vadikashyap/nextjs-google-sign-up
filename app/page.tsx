"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import LoginWithGoogle from "@/components/LoginWithGoogle";
import FullPageLoader from "@/components/FullPageLoader";
import { useState } from "react";

export default function Home(): React.ReactElement {
  // Initialize router and loading state
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  // Effect hook to handle authentication state
  useEffect((): (() => void) => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user: User | null): void => {
      if (user) {
        // Redirect to dashboard if user is authenticated
        router.replace("/dashboard");
      } else {
        // Show login UI if user is not authenticated
        setLoading(false);
      }
    });
    // Cleanup subscription on component unmount
    return (): void => unsubscribe();
  }, [router]);

  // Show loading state while checking authentication
  if (loading) {
    return <FullPageLoader />;
  }

  return <LoginWithGoogle />;
}
