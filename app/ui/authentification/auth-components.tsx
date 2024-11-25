"use client";

import { DoorOpenIcon } from "lucide-react";
import { handleSignIn, handleSignOut } from "./auth-actions";
import { Button } from "./button";

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form action={() => handleSignIn(provider)}>
      <Button {...props}>Se connecter</Button>
    </form>
  );
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={handleSignOut}
      className="flex items-center justify-center"
    >
      <Button variant="ghost" className="p-0 relative group" {...props}>
        <DoorOpenIcon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
        <span className="absolute left-full ml-2 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
          Se déconnecter
        </span>
      </Button>
    </form>
  );
}