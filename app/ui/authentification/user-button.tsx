import { AdminButton } from "@/app/ADMIN/buttonadmin"
import { getUser } from "@/app/lib/getuser"
import { auth } from "auth"
import Link from "next/link"
import { SignOut } from "./auth-components"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Button } from "./button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "./dropdown-menu"


export default async function UserButton() {
  const session = await auth()

  let user = null;

  if (session && session.user && session.user.email) { // Ajout d'une vérification pour session
    user = await getUser(session.user.email); // Récupérer l'utilisateur uniquement si l'utilisateur est connecté
  }
  if (!session?.user) return <div className="flex gap-4">
    <Link href="/auth/sign-in">
      <Button variant="outline" className="px-4 py-2">
        Se connecter
      </Button>
    </Link>
    <Link href="/auth/sign-up">
      <Button variant="default" className="px-4 py-2 bg-black border-b ">
        S'inscrire
      </Button>
    </Link>
  </div>
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full mr-5">
          <Avatar className="w-8 h-8">
            {session.user.image && (
              <AvatarImage
                src={session.user.image}
                alt={session.user.name ?? ""}
              />
            )}
            {/* <AvatarFallback>{session.user.image}</AvatarFallback> */}
            <AvatarFallback><img
              src="/user_img.png"
              alt="Default user avatar"
              className="w-8 h-8 object-cover"
            /></AvatarFallback>
          </Avatar>

        </Button>

      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-171717" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm text-slate-50 font-medium leading-none">
              {user ? user.nom : "Utilisateur"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        {user?.role === "ADMIN" && <AdminButton />}
        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
