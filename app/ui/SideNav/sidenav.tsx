import { getUser } from "@/app/lib/getuser";
import NavLinks from '@/app/ui/SideNav/nav-links';
import VillageGreenLogo from '@/app/ui/village-logo';
import { auth } from "auth";
import Link from 'next/link';
import { SignOut } from "../authentification/auth-components";
import UserButton from '../authentification/user-button';

export default async function SideNav() {
  const session = await auth();
  let user = null;

  if (session && session.user && session.user.email) {
    user = await getUser(session.user.email);
  }

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex items-center justify-center rounded-md bg-slate-950 p-4 md:h-30 border-2 border-white hover:bg-slate-900"
        href="/"
      >
        <div className="text-white md:w-64">
          <VillageGreenLogo />
        </div>
      </Link>
      <div className="flex grow flex-col justify-between space-y-2 md:space-y-4">
        <div className="text-white text-xl font-semibold mt-3 text-center">
          Nos produits
        </div>
        <div className="my-1 h-[1px] w-[70%] bg-gray-300 mx-auto" />
        <NavLinks />
        <div className="my-4 h-[1px] w-full bg-gray-300" />

        <div className="flex items-center space-x-3">
          <UserButton />
          {user && (
            <div className="text-sm text-white">
              <span>{user.nom}</span> <span>{user.prenom}</span>
            </div>
          )}
          <SignOut />
        </div>
      </div>
    </div>
  );
}
