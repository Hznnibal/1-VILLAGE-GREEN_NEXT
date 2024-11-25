import { AdminButton } from "@/app/ADMIN/buttonadmin"
import { getUser } from "@/app/lib/getuser"
import { SignOut } from "@/app/ui/authentification/auth-components"
import { UserIcon } from "@heroicons/react/24/outline"
import { auth } from "auth"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Button } from "./button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "./dropdown-menu"


export default async function UserButton() {
  const session = await auth()

  let user = null;

  if (session && session.user && session.user.email) { // Ajout d'une vérification pour session
    user = await getUser(session.user.email); // Récupérer l'utilisateur uniquement si l'utilisateur est connecté
  }
  if (!session?.user) return <Link href="/auth/sign-in" className="flex items-center gap-2 p-2 text-sm font-extrabold text-blue-50 rounded-md hover:bg-gray-400">
    <UserIcon className="w-6" />
    <span className="hidden md:block">Compte</span>
  </Link>

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full">
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
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
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
