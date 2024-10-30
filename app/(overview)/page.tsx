import { signOut, auth } from '@/auth';
import Slider from '../ui/carrousel/Slider';
import { PowerIcon } from '@heroicons/react/24/outline';
import { getUser } from '@/app/lib/usertest'; // Assurez-vous que vous avez une fonction getUser appropriée

export default async function Page() {
  // Récupère la session de l'utilisateur
  const session = await auth();

  // Vérifie si l'utilisateur est authentifié
  let user = null;
  if (session && session.user && session.user.email) { // Ajout d'une vérification pour session
    user = await getUser(session.user.email); // Récupérer l'utilisateur uniquement si l'utilisateur est connecté
  }

  return (
    <main className="flex min-h-screen flex-col p-6">
      {/* Message de bienvenue personnalisé */}
      <p className="text-2xl flex flex-col justify-center ml-15">
        {user ? `Rebienvenue, ${user.prenom}` : 'Bienvenue chez Village Green'}
      </p>

      {/* Carrousel de produits */}
      <Slider />

      {/* Si l'utilisateur est connecté, afficher le bouton de déconnexion */}
      {user && (
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      )}
    </main>
  );
}
