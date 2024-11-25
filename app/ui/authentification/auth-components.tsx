import { signIn, signOut } from "auth"
import { DoorOpenIcon } from "lucide-react"
import { Button } from "./button"

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider, { redirectTo: '/' })
      }}
    >
      <Button {...props}>Se connecter</Button>
    </form>
  )
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
      className="flex items-center justify-center"
    >
      <Button variant="ghost" className=" p-0 relative group" {...props}>
        {/* Icône porte rouge ouverte */}
        <DoorOpenIcon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
        {/* Texte "Se déconnecter" au survol */}
        <span className="absolute left-full ml-2 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
          Se déconnecter
        </span>
      </Button>
    </form>
  );
}