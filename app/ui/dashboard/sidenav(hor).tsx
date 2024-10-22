import Link from 'next/link';
// import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon, UserIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function SidenavHor() {
  return (
    <div className="flex h-20 w-full items-center px-3 py-4 bg-white shadow-md">
      
      {/* Logo à gauche */}
      <Link
        className="flex h-20 items-center justify-start rounded-md p-4 bg-blue-600"
        href="/"
      >
        {/* <div className="text-white md:w-40">
          <AcmeLogo />
        </div> */}
      </Link>

      {/* Barre de recherche au centre */}
      <div className="flex grow justify-center">
        <input
          type="text"
          placeholder="Recherche..."
          className="w-full max-w-md rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Boutons à droite (Compte, Panier, Sign Out) */}
      <div className="flex items-center space-x-4">
        {/* Compte */}
        <Link href="/compte" className="flex items-center gap-2 p-2 text-sm font-medium text-gray-700 hover:text-blue-600">
          <UserIcon className="w-6" />
          <span className="hidden md:block">Compte</span>
        </Link>

        {/* Panier */}
        <Link href="/panier" className="flex items-center gap-2 p-2 text-sm font-medium text-gray-700 hover:text-blue-600">
          <ShoppingCartIcon className="w-6" />
          <span className="hidden md:block">Panier</span>
        </Link>

        {/* Bouton de déconnexion */}
        <form className="flex items-center">
          <button className="flex items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
