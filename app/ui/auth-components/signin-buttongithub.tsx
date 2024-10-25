"use client";

import { signIn } from "next-auth/react";

export function SignInButtonGithub() {
  const handleSignIn = async () => {
    await signIn("github", { callbackUrl: "/" });
  };

  return (
    <button onClick={handleSignIn}>
      Sign in with GitHub
    </button>
  );
}
