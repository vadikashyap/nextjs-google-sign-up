"use client";

import React from "react";
import { signInWithPopup, UserCredential } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./login.module.css";

export default function LoginWithGoogle(): React.ReactElement {
  // Initialize router for navigation
  const router = useRouter();

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      // Sign in with Google popup
      const result: UserCredential = await signInWithPopup(auth, provider);
      // Get ID token for backend verification
      const idToken: string = await result.user.getIdToken();

      // Send token to backend API
      const response: Response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      // Handle response
      if (response.ok) {
        router.push("/dashboard");
      } else {
        console.error("Server authentication failed");
      }
    } catch (error: unknown) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className={styles["login-root"]}>
      <div className={styles["login-box"]}>
        <div className={styles["login-title"]}>Sign in with Google</div>
        <div className={styles["login-subtitle"]}>
          Please sign in to continue
        </div>
        <button className={styles["google-btn"]} onClick={handleGoogleLogin}>
          <span className={styles["google-icon"]}>
            <Image src='/google.svg' alt='Google logo' width={24} height={24} />
          </span>
          Sign in
        </button>
      </div>
    </div>
  );
}
