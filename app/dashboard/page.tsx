"use client";
import React from "react";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import FullPageLoader from "@/components/FullPageLoader";
import styles from "./Dashboard.module.css";

export default function Dashboard(): React.ReactElement {
  // Initialize router and state variables
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Effect hook to handle authentication state changes
  useEffect((): (() => void) => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: User | null): void => {
        setUser(firebaseUser);
        setLoading(false);
        // Redirect to home if user is not authenticated
        if (!firebaseUser) {
          router.replace("/");
        }
      }
    );

    return (): void => unsubscribe();
  }, [router]);

  // Handle user logout
  const handleLogout = async (): Promise<void> => {
    await signOut(auth);
    router.push("/");
  };

  // Show loading state while checking authentication
  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <div className={styles.dashboardRoot}>
      <div className={styles.dashboardBox}>
        <Image
          src='/google.svg'
          alt='User'
          width={64}
          height={64}
          style={{ marginBottom: 24 }}
        />
        <h1 className={styles.dashboardTitle}>
          {user?.displayName ? `Welcome, ${user.displayName}!` : "Welcome!"}
        </h1>
        <p className={styles.dashboardDesc}>
          You have successfully signed in with Google.
          <br />
          This is your dashboard.
        </p>
        <button onClick={handleLogout} className={styles.dashboardLogoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
}
